import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyBeeAntennae extends CGFobject {
	constructor(scene) {		
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 0.8, 0.8, false);
	}

    display(){

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/5, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(0.08, 0.6, 0.08);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.97, 0);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.08, 0.6, 0.08);
        this.scene.translate(0, 0.76, 0);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}
