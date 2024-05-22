import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyPolen extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 20);
        this.initMaterials();
    }

    initMaterials(){
        this.polenAppearance = new CGFappearance(this.scene);
        this.polenAppearance.setAmbient(0.9, 0.9, 0.9, 1);
        this.polenAppearance.setShininess(10.0);
        this.polenAppearance.loadTexture('images/polen.png');
    }
    display() {
        this.scene.pushMatrix();
        this.polenAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix(); 
    }
}
