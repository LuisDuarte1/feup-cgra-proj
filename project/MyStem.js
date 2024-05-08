import { CGFobject } from '../../lib/CGF.js';
import { MyCylinder } from './primitives/MyCylinder.js';

export class MyStem extends CGFobject {
    constructor(scene, numCylinders) {
        super(scene);
        //this.numCylinders = numCylinders;
        this.numCylinders = 10;
        this.cylinders = [];
        for (let i = 0; i < this.numCylinders; i++) {
            let height = Math.random() * (5 - 1) + 1; 
            this.cylinders.push(new MyCylinder(scene, 40, 5)); 
            this.cylinders[i].height = height; 
        }
    }

    display() {
        
        for (let i = 0; i < 1; i++) {
            this.scene.pushMatrix(); 
            const height = this.cylinders
                .slice(0,i)
                .map(element => element.height).reduce((acc, val) => acc + val, 0);
            this.scene.translate(0, height, 0); 
            this.scene.rotate(-Math.PI / 2, 1, 0, 0); 
            this.scene.scale(1, 1, this.cylinders[i].height);
            this.scene.scale(0.05, 0.05, 1);
            this.cylinders[i].display();
            this.scene.popMatrix(); 
        }
    }
}
