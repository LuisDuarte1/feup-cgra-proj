import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyPolen extends CGFobject {
    static polenAppearance = null;
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 10, 10);
        this.initMaterials();
    }

    initMaterials(){
        if(MyPolen.polenAppearance != null) return
        MyPolen.polenAppearance = new CGFappearance(this.scene);
        MyPolen.polenAppearance.setAmbient(0.9, 0.9, 0.9, 1);
        MyPolen.polenAppearance.setShininess(10.0);
        MyPolen.polenAppearance.loadTexture('images/polen.png');
    }
    display() {
        this.scene.pushMatrix();
        MyPolen.polenAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix(); 
    }
}
