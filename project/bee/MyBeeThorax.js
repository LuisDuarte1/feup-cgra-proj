import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';
import { MyBeeLegs } from './MyBeeLegs.js';
import { setColorRGB } from "../utils.js";

export class MyBeeThorax extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 0.8, 0.8, false);
        this.frontLegs = new MyBeeLegs(scene, -Math.PI / 4);
        this.middleLegs = new MyBeeLegs(scene, -Math.PI / 8, true);
        this.backLegs = new MyBeeLegs(scene, Math.PI/6, true);
        this.initMaterials();
    }

    initMaterials() {
        this.beeThoraxTex = new CGFtexture(this.scene, "images/beeThorax.png");
        this.beeThoraxAppearance = new CGFappearance(this.scene);
        this.beeThoraxAppearance.setAmbient(1, 1, 1, 1);
        this.beeThoraxAppearance.setTexture(this.beeThoraxTex);
        this.beeThoraxAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.brownAppearance = new CGFappearance(this.scene);
        setColorRGB(this.brownAppearance, 29, 19, 15);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.6, 0.4, 0.4);
        this.beeThoraxAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.1, 0);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.brownAppearance.apply();
        this.frontLegs.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.1, 0);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.brownAppearance.apply();
        this.frontLegs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.02, 0.05, 0);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 0.6);
        this.brownAppearance.apply();
        this.middleLegs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.02, 0.05, 0);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 0.6);
        this.brownAppearance.apply();
        this.middleLegs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.25, 0, 0);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 0.6);
        this.brownAppearance.apply();
        this.backLegs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.25, 0, 0);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 0.6);
        this.brownAppearance.apply();
        this.backLegs.display();
        this.scene.popMatrix();

    }
}