import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';
import { MyBeeLegs } from './MyBeeLegs.js';

export class MyBeeThorax extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 0.8, 0.8, false);
        this.beeLegs = new MyBeeLegs(scene);
       // this.initMaterials();
    }

    /*initMaterials() {
        this.beeToraxTex = new CGFtexture(this.scene, "images/beeTorax.png");
        this.beeToraxAppearance = new CGFappearance(this.scene);
        this.beeToraxAppearance.setTexture(this.beeToraxTex);
        this.beeToraxAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }*/

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.7, 0.5, 0.5);
       // this.beeToraxAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.beeLegs.display();
        this.scene.popMatrix();
        
    }
}