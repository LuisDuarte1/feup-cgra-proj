import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyReceptacle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.receptacle = new MySphere(scene, 40, 20, false, 0.5, 0.5); 
        this.height = this.receptacle.verticalRadius * 2;
    }
    display() {
        this.scene.pushMatrix(); 
        this.scene.scale(1, this.height/2, 1);
        this.receptacle.display(); 
        this.scene.popMatrix(); 
    }
}
