import {CGFobject} from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';

export class MyCorolla extends CGFobject {
    constructor(scene, corollaRadius, numPetals, petalAngle, maxAngle, minAngle, innerPetalColor, outerPetalColor, receptacleRadius, receptacleColor) {
        super(scene);
        this.corollaRadius = corollaRadius;
        this.receptacleRadius = receptacleRadius;
        this.numPetals = numPetals
        this.petalAngle = petalAngle;
        this.petal = new MyPetal(scene, petalAngle, corollaRadius - receptacleRadius);
        this.receptacle = new MyReceptacle(scene, receptacleRadius);
        this.innerPetalColor = innerPetalColor;
        this.outerPetalColor = outerPetalColor;
        this.receptacleColor = receptacleColor;
        this.maxAngle = maxAngle;
        this.minAngle = minAngle;
        this.generateAngles();
    }

    generateAngles(){
        this.angles = [];
        for (let i = 0; i < this.numPetals; i++) {
            this.angles.push(Math.random() * (this.maxAngle - this.minAngle) + this.minAngle);
        }
    }

    display() {

        let angle = 2 * Math.PI / this.numPetals;

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.receptacleColor.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.numPetals; i++) {
            
            // inner layer
            this.scene.pushMatrix();
            this.scene.rotate(angle * i, 0, 0, 1);
            this.scene.translate(0, this.receptacle.height - 0.2, 0);
            this.innerPetalColor.apply();
            this.petal.display();
            this.scene.popMatrix();

            // outer layer
            this.scene.pushMatrix();
            this.scene.rotate(angle * (i + 0.5), 0, 0, 1);
            this.scene.translate(0, this.receptacle.height - 0.4, 0);
            this.outerPetalColor.apply();
            this.petal.display();
            this.scene.popMatrix();
        }
    }
}