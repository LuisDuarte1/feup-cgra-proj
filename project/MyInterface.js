import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
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
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'flowerVisibility').name('Flower')

        this.gui.add(this.scene, 'rockVisibility').name('Rock')
        this.gui.add(this.scene, 'rockSetVisibility').name('RockSet')
        this.gui.add(this.scene, 'rockPyramidVisibility').name('Rock Pyramid')

        return true;
    }
}