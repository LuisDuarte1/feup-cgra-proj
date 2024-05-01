import { CGFobject } from '../../lib/CGF.js';
import { MyCylinder } from './primitives/MyCylinder.js';

export class MyStem extends CGFobject {
    constructor(scene, numCylinders) {
        super(scene);
        this.numCylinders = numCylinders;
        this.cylinders = []; // Array to store the cylinders
        for (let i = 0; i < this.numCylinders; i++) {
            // Generate random radius and height for each cylinder
            let height = Math.random() * (1.5 - 0.5) + 0.5; // Random height between 0.5 and 1.5
            this.cylinders.push(new MyCylinder(scene, 20,5)); // Create cylinders and add to the array
            this.cylinders[i].height = height; // Set the height of the cylinder
        }
    }

    display() {
        // Display each cylinder in the array
        for (let i = 0; i < 1; i++) {
            this.scene.pushMatrix(); // Save the current transformation matrix
            const height = this.cylinders
                .slice(0,i)
                .map(element => element.height).reduce((acc, val) => acc + val, 0);
            this.scene.translate(0, height, 0); // Translate each cylinder vertically
            this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Rotate the cylinder to be vertical (along the y-axis
            this.scene.scale(1, 1, this.cylinders[i].height); // Scale the cylinder to the desired height
            this.cylinders[i].display();
            this.scene.popMatrix(); // Restore the transformation matrix
        }
    }
}
