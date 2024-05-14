import {CGFobject} from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';

export class MyCorolla extends CGFobject {
    constructor(scene) {
        super(scene);
        this.petal = new MyPetal(scene, Math.PI/4, 1);
        this.receptacle = new MyReceptacle(scene);
        this.numPetals = 8;
    }

    display() {

        let angle = 2 * Math.PI / this.numPetals;

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.receptacle.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.numPetals; i++) {
            
            // inner layer
            this.scene.pushMatrix();
            this.scene.rotate(angle * i, 0, 0, 1);
            this.scene.translate(0, this.receptacle.height - 0.2, 0);
            this.petal.display();
            this.scene.popMatrix();

            // outer layer
            this.scene.pushMatrix();
            this.scene.rotate(angle * (i + 0.5), 0, 0, 1);
            this.scene.translate(0, this.receptacle.height - 0.4, 0);
            this.petal.display();
            this.scene.popMatrix();
        }
    }
}