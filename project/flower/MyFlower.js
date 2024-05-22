import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyCorolla } from './MyCorolla.js';

export class MyFlower extends CGFobject {
    /**
     * Constructor for the flower
     * @param {*} scene 
     * @param {*} numCylinders 
     * @param {*} height 
     * @param {*} radius 
     * @param {*} stemAppearance 
     * @param {*} leafAppearance 
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
    constructor(scene, numCylinders, height, radius, stemAppearance, leafAppearance, corollaRadius, numPetals, petalAngle, maxAngle, minAngle, innerPetalColor, outerPetalColor, receptacleRadius, receptacleColor) {
        super(scene);
        this.height = height;
        let maxHeight = height/3;
        let minHeight = height/5;
        this.stem = new MyStem(scene, numCylinders, this.height, maxHeight, minHeight, radius, stemAppearance, leafAppearance);
        this.corolla = new MyCorolla(scene, corollaRadius, numPetals, petalAngle, maxAngle, minAngle, innerPetalColor, outerPetalColor, receptacleRadius, receptacleColor);
    }
    display() {
        this.scene.pushMatrix()
        this.scene.translate(0, this.height, 0)
        this.scene.scale(0.6, 0.6, 0.6)
        this.scene.rotate(-Math.PI/6, 1, 0, 0)
        this.corolla.display()
        this.scene.popMatrix()
        this.scene.pushMatrix()
        this.scene.rotate(Math.PI/2, 0, 1, 0)
        this.stem.display()
        this.scene.popMatrix()
    }
}