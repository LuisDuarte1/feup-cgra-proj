import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyBeeWing extends CGFobject {
	constructor(scene) {		
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 1, 1, false);
        this.initMaterials();
	}

    initMaterials() {
        this.wingTex = new CGFappearance(this.scene);
        this.wingTex.setAmbient(1, 1, 1, 0.09);
        this.wingTex.setDiffuse(1, 1, 1, 0);
        this.wingTex.setSpecular(1, 1, 1, 0);
        this.wingTex.setEmission(0.1, 0.1, 0.1, 0.1);
    }
    display(){
        this.scene.pushMatrix();   
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.001, 0.2); 
        this.wingTex.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
