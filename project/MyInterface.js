import {CGFinterface, dat, CGFcameraAxisID} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
        this.activeKeys = {};
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');


        this.cameraAngle = [0, 0];
        this.cameraZoom = 0;
        var beeAudio = new Audio('sounds/bee.mp3');
        beeAudio.loop = true;
        beeAudio.volume = 0.7;
        beeAudio.play();
    
        var ambientAudio = new Audio('sounds/background.mp3');
        ambientAudio.loop = true;
        ambientAudio.volume = 0.9;
        ambientAudio.play();
        
        this.initKeys();
        return true;
    }

    initKeys(){
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
    isKeyReleased(keyCode) {
        return !this.activeKeys[keyCode] || false;
    }

    processMouse(){
        if (this.activeCamera) {
			var displacement = vec2.subtract(vec2.create(), this.mouse, this.prevMouse);
 
			if (this.mouseButtons[0]) { // pressing Left
				if(this.altKey) { // alternative rotation, centered on camera position. might be buggy
					this.activeCamera.rotate(this.activeCamera.getRight(), -displacement[1] * Math.PI / 180.0);
					this.activeCamera.rotate(vec3.fromValues(0, 1, 0), -displacement[0] * Math.PI / 180.0);
				}
				else if (this.ctrlKey) { // same as pressing middle
					this.cameraZoom += displacement[1] * 0.05
                    this.cameraZoom = Math.min(this.cameraZoom, 4.5)
                    this.cameraZoom = Math.max(this.cameraZoom, -3)
                    this.activeCamera.zoom(this.cameraZoom);
				}
				else {
                    this.cameraAngle[0] += displacement[1] * Math.PI / 180.0;
                    this.cameraAngle[1] += -displacement[0] * Math.PI / 180.0;
					this.updateCameraAngle();
				}
			} else if (this.mouseButtons[2]) { // pressing Right
				this.activeCamera.pan([-displacement[0] * 0.05, displacement[1] * 0.05, 0]);
			}
		}
    }

    processWheel(event){
        if(this.activeCamera)
            this.cameraZoom += -event.deltaY * 0.005
            this.cameraZoom = Math.min(this.cameraZoom, 4.5)
            this.cameraZoom = Math.max(this.cameraZoom, -3)
            this.activeCamera.zoom(this.cameraZoom);
    }

    updateCameraAngle() {
        this.activeCamera.orbit(CGFcameraAxisID.X, this.cameraAngle[0]);
        this.activeCamera.orbit(CGFcameraAxisID.Y, this.cameraAngle[1]);
        this.activeCamera.zoom(this.cameraZoom);
    }
}