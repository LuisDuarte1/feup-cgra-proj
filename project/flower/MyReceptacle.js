import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.receptacle = new MySphere(scene, 40, 20, false, radius, radius); 
    }
    display() {
        this.scene.pushMatrix(); 
        this.scene.scale(1, 0.5, 1);
        this.receptacle.display(); 
        this.scene.popMatrix(); 
    }
}
