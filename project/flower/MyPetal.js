import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyTriangle } from '../primitives/MyTriangle.js';

export class MyPetal extends CGFobject {
    constructor(scene, petalAngle, petalHeight) {
        super(scene);
        this.triangle = new MyTriangle(scene);
        this.petalAngle = petalAngle;
        this.height = petalHeight;
    }
    display() {
   
        // upper petal
        this.scene.pushMatrix();
        this.scene.translate(0, this.height/2, 0);
        this.scene.rotate(this.petalAngle, 1, 0, 0);
        this.scene.scale(1, this.height/2, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // lower petal
        this.scene.pushMatrix();
        this.scene.translate(0, this.height/2, 0);
        this.scene.scale(1, this.height/2, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

    }
}