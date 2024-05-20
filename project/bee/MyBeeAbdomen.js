import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyBeeAbdomen extends CGFobject {
	constructor(scene) {		
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 1, 1, false);
        this.initMaterials();
	}

    initMaterials() {
        this.abdomenTex = new CGFappearance(this.scene);
        this.abdomenTex.loadTexture('images/beeAbdomen.png');
        this.abdomenTex.setAmbient(0.6, 0.6, 0.6, 1.0);
    }
    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.7,0.4);
        this.abdomenTex.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
