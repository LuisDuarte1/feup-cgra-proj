import { CGFobject} from '../../lib/CGF.js';
import { MyCylinder } from '../primitives/MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';

export class MyStem extends CGFobject {
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
    
        this.generateHeights(this.numCylinders, this.height, this.maxHeight, this.minHeight);
        this.generateDisalignments(this.numCylinders);
        this.generateCylinders(this.numCylinders, 10, 1);
    }

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

    generateDisalignments(numCylinders){
        this.disalignments = [];
        let x = 0;
        let z = 0;

        for (let i = 0; i < numCylinders; i++){
            let randomAngle = Math.random() * 2 * Math.PI;
            console.log(randomAngle);
            let x_ = Math.cos(randomAngle);
            let z_ = Math.sin(randomAngle);
            x_ = Math.round(x_ * 100) / 100;
            z_ = Math.round(z_ * 100) / 100;
            x += x_;
            z += z_;
            this.disalignments.push([x_, 1, z_]);
        }
    }

    generateCylinders(numCylinders, slices, stacks){
        this.cylinders = [];
        for (let i = 0; i < numCylinders; i++){
            let cylinder = new MyCylinder(this.scene, slices, stacks, this.disalignments[i]);
            this.cylinders.push(cylinder);
        }
    }

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
                if (i % 2) this.scene.rotate(Math.PI, 0, 1, 0)
                this.flag = (this.flag + 1) % 2;
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
