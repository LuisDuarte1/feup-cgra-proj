import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.receptacle = new MySphere(scene, 40, 20, false, radius, radius); 
        this.height = this.receptacle.verticalRadius * 2;
    }
    display() {
        this.scene.pushMatrix(); 
        this.scene.scale(1, this.height/2, 1);
        this.receptacle.display(); 
        this.scene.popMatrix(); 
    }
}
