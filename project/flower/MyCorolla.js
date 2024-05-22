import {CGFobject} from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';

export class MyCorolla extends CGFobject {
    /**
     * Constructor for the corolla of a flower
     * @param {*} scene 
     * @param {*} corollaRadius 
     * @param {*} numPetals 
     * @param {*} petalAngle 
     * @param {*} maxAngle 
     * @param {*} minAngle 
     * @param {*} innerPetalColor 
     * @param {*} outerPetalColor 
     * @param {*} receptacleRadius 
     * @param {*} receptacleColor 
     */
    constructor(scene, corollaRadius, numPetals, petalAngle, maxAngle, minAngle, innerPetalColor, outerPetalColor, receptacleRadius, receptacleColor) {
        super(scene);
        this.corollaRadius = corollaRadius;
        this.receptacleRadius = receptacleRadius;
        this.numPetals = numPetals
        this.petalAngle = petalAngle;
        this.innerPetal = new MyPetal(scene, petalAngle, corollaRadius - receptacleRadius);
        this.outerPetal = new MyPetal(scene, Math.PI/9, corollaRadius - receptacleRadius);
        this.receptacle = new MyReceptacle(scene, receptacleRadius);
        this.innerPetalColor = innerPetalColor;
        this.outerPetalColor = outerPetalColor;
        this.receptacleColor = receptacleColor;
        this.maxAngle = maxAngle;
        this.minAngle = minAngle;
        let petalRadius = corollaRadius - receptacleRadius;
        this.width = 2 * Math.PI * petalRadius / numPetals;
        this.generateAngles();
    }
    /**
     * Function to generate random angles for the petals, within the specified range, so that they are not all the same
     */
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
            this.scene.translate(0, this.receptacleRadius - 0.1, 0);
            this.scene.scale(this.width, 1, this.width)
            this.scene.rotate(this.angles[i], 1, 0, 0);
            this.innerPetalColor.apply();
            this.innerPetal.display();
            this.scene.popMatrix();

            // outer layer
            this.scene.pushMatrix();
            this.scene.rotate(angle * (i + 0.5), 0, 0, 1);
            this.scene.translate(0, this.receptacleRadius - 0.15, 0.04);
            if (i % 2) this.scene.translate(0, 0, 0.05);
            this.scene.scale(this.width, 1, this.width)
            this.scene.translate(0, 0, -0.1);
            this.outerPetalColor.apply();
            this.outerPetal.display();
            this.scene.popMatrix();
        }
    }
}