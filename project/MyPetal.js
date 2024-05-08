import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyTriangle } from './primitives/MyTriangle.js';

export class MyPetal extends CGFobject {
    constructor(scene, petalAngle, petalHeight) {
        super(scene);
        this.triangle = new MyTriangle(scene);
        this.petalAngle = petalAngle;
        this.height = petalHeight;
        this.initMaterial();
    }

    initMaterial(){
        this.yellowParallelogramMaterial = new CGFappearance(this.scene);
        this.yellowParallelogramMaterial.setAmbient(0.7, 0.6, 0.0, 1);
        this.yellowParallelogramMaterial.setDiffuse(1.0, 0.8, 0.0, 1);
        this.yellowParallelogramMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.yellowParallelogramMaterial.setShininess(10.0);
    }
    display() {
   
        // upper petal
        this.scene.pushMatrix();
        this.scene.rotate(this.petalAngle, 1, 0, 0);
        this.scene.scale(1, this.height/2, 1);
        this.yellowParallelogramMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // lower petal
        this.scene.pushMatrix();
        this.scene.scale(1, this.height/2, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.yellowParallelogramMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

    }
}