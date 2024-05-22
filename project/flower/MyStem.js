import { CGFobject} from '../../lib/CGF.js';
import { MyCylinder } from '../primitives/MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';

export class MyStem extends CGFobject {
    /**
     * Constructor for the stem of a flower
     * @param {*} scene 
     * @param {*} numCylinders 
     * @param {*} height 
     * @param {*} maxHeight 
     * @param {*} minHeight 
     * @param {*} radius 
     * @param {*} stemColor 
     * @param {*} leafColor 
     */
    constructor(scene, numCylinders, height, maxHeight, minHeight, radius, stemColor, leafColor) {
        super(scene);
        this.numCylinders = numCylinders;
        this.height = height;
        this.maxHeight = maxHeight;
        this.minHeight = minHeight;
        this.radius = radius;
        this.stemColor = stemColor;
        this.leafColor = leafColor;
        this.leaf = new MyLeaf(scene, this.leafColor);
        this.flag = Math.round(Math.random());
        this.currPosition = [0, 0, 0];
    
        this.generateHeights(this.numCylinders, this.height, this.maxHeight, this.minHeight);
        this.generateDisalignments(this.numCylinders);
        this.generateCylinders(this.numCylinders, 10, 1);
    }
    /**
     * This function generates random cylinder heights within a specified range for a stem, stores them in an array in descending order for bottom-up construction.
     * @param {*} numCylinders 
     * @param {*} height 
     * @param {*} maxHeight 
     * @param {*} minHeight 
     */
    generateHeights(numCylinders, height, maxHeight, minHeight) {
        this.heights = [];
        let currMax = height;
        for (let i = 0; i < numCylinders - 1; i++){
            let randomHeight = Math.random() * (maxHeight - minHeight) + minHeight;
            randomHeight = Math.min(currMax, randomHeight);
            currMax -= randomHeight;
            this.heights.push(randomHeight);
        }
        this.heights.push(currMax);
        this.heights = this.heights.sort().reverse();
    }
    /**
     * Generatwes an array of disalignment vectors for each cylinder in the stem.
     * Each disalignment vector is a 3D vector [x_, 1, z_] where x_ and z_ are 
     * the cosine and sine of a random angle, respectively, rounded to two decimal places.
     * The vectors are accumulated in the x and z directions to create a cumulative disalignment effect.
     *
     * @param {number} numCylinders - The number of cylinders in the stem.
     */
    generateDisalignments(numCylinders){
        this.disalignments = [];
        let x = 0;
        let z = 0;

        for (let i = 0; i < numCylinders - 1; i++){
            let randomAngle = Math.random() * 2 * Math.PI;
            let x_ = Math.cos(randomAngle);
            let z_ = Math.sin(randomAngle);
            x_ = Math.round(x_ * 100) / 100;
            z_ = Math.round(z_ * 100) / 100;
            x += x_;
            z += z_;
            this.disalignments.push([x_, 1, z_]);            
        }
        let angles = [Math.PI/10, Math.PI/9, Math.PI/8, Math.PI/7, Math.PI/6];
        let randomAngle = angles[Math.floor(Math.random() * angles.length)];
        this.angle = randomAngle;
        let x_ = Math.cos(randomAngle);
        let z_ = Math.sin(randomAngle);
        x += x_;
        z += z_;
        this.disalignments.push([x_, 1, z_]);
        this.finalPosition = [x * this.radius - 0.05, this.height, z * this.radius]
    }

    /**
     * Generates an array of cylinder objects for the stem.
     * Each cylinder is created with the given number of slices and stacks, and a disalignment vector.
     *
     * @param {number} numCylinders - The number of cylinders to generate.
     * @param {number} slices - The number of slices for each cylinder.
     * @param {number} stacks - The number of stacks for each cylinder.
     */
    generateCylinders(numCylinders, slices, stacks){
        this.cylinders = [];
        for (let i = 0; i < numCylinders; i++){
            if(i < numCylinders - 1){
                let cylinder = new MyCylinder(this.scene, slices, stacks, this.disalignments[i]);
                this.cylinders.push(cylinder);
            }
            else {
                let cylinder = new MyCylinder(this.scene, slices, stacks, this.disalignments[i], true);
                this.cylinders.push(cylinder);
            }
        }
    }
    /**
     * Displays the stem of the flower, with the leafs on the first 3 cylinders.
     */
    display() {
        let currPosition = [0, 0, 0];
        let count = 0;
        for (let i = 0; i < this.numCylinders; i++) {
            this.scene.pushMatrix();
            this.scene.scale(this.radius, 1, this.radius);
            this.scene.translate(...currPosition);
            if (i > 0 && (this.heights[i] > this.minHeight) && count < 3) {
                this.scene.pushMatrix();
                this.scene.scale( 1 / this.radius * 0.6, 1 / this.radius * 0.02, 1 / this.radius * 0.8);
                this.scene.translate(this.radius - 0.04, 0, 0)
                if (i % 2) this.scene.rotate(Math.PI/2, 0, 1, 0)
                else this.scene.rotate(-Math.PI/2, 0, 1, 0)
                this.scene.rotate(Math.PI/4, 1, 0, 0)
                this.leafColor.apply();
                this.leaf.display();
                count += 1;
                this.scene.popMatrix();
            }
            this.scene.pushMatrix();
            this.scene.scale(1, this.heights[i], 1);
            this.stemColor.apply();
            this.cylinders[i].display();
            currPosition = [currPosition[0] + this.disalignments[i][0], currPosition[1] + this.heights[i], currPosition[2] + this.disalignments[i][2]];
            this.scene.popMatrix();            
            this.scene.popMatrix();
        }
    }
}
