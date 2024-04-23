import {CGFobject} from '../../lib/CGF.js';
import { MyTriangle } from './primitives/MyTriangle.js';

export class MyPetal extends CGFobject {
    constructor(scene, petalAngle) {
        super(scene);
        this.upperPetal = new MyTriangle(scene);
        this.lowerPetal = new MyTriangle(scene);
        this.petalAngle = petalAngle;
        this.initBuffers();
    }

	initBuffers() {
	}

    display() {
        this.scene.pushMatrix();
        this.upperPetal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(-this.petalAngle, 1, 0, 0);
        this.lowerPetal.display();
        this.scene.popMatrix();
        

    }
}