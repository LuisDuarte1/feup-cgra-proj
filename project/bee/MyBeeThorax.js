import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';
import { MyBeeLegs } from './MyBeeLegs.js';
import { MyBeeWing } from './MyBeeWing.js';
import { setColorRGB } from "../utils.js";

export class MyBeeThorax extends CGFobject {
    constructor(scene, frontWingAngle, backWingAngle) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 0.8, 0.8, false);
        this.frontLegs = new MyBeeLegs(scene, Math.PI/6);
        this.middleLegs = new MyBeeLegs(scene, Math.PI/8);
        this.backLegs = new MyBeeLegs(scene, Math.PI/6, true);
        this.frontWing = new MyBeeWing(scene, frontWingAngle);
        this.backWing = new MyBeeWing(scene, backWingAngle);
        this.initMaterials();
    }

    initMaterials() {
        this.beeThoraxTex = new CGFtexture(this.scene, "images/beeFur.png");
        this.beeThoraxAppearance = new CGFappearance(this.scene);
        setColorRGB(this.beeThoraxAppearance, 214, 171, 0);
        this.beeThoraxAppearance.setAmbient(1, 1, 1, 1);
        this.beeThoraxAppearance.setTexture(this.beeThoraxTex);
        this.beeThoraxAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.brownAppearance = new CGFappearance(this.scene);
        setColorRGB(this.brownAppearance, 8, 7, 7);
    }

    display(hasPolen=false) {

        // thorax
        this.scene.pushMatrix();
        this.scene.scale(0.45, 0.3, 0.3);
        this.beeThoraxAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // front legs 
        this.scene.pushMatrix();
        this.scene.translate(-0.25, 0.1, 0);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.55);
        this.frontLegs.display(hasPolen);
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.25, 0.1, 0);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.55);
        this.brownAppearance.apply();
        this.frontLegs.display(hasPolen);
        this.scene.popMatrix();


        // middle legs
        this.scene.pushMatrix();
        this.scene.translate(0, -0.1, 0.1);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.46, 0.46, 0.46);
        this.middleLegs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.1, -0.1);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.46, 0.46, 0.46);
        this.middleLegs.display();
        this.scene.popMatrix();
        

        // back legs
        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.1, 0.1);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.brownAppearance.apply();
        this.backLegs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.1, -0.1);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.brownAppearance.apply();
        this.backLegs.display();
        this.scene.popMatrix();

        // wings

        this.scene.pushMatrix();
        this.scene.translate(-0.14, 0.15, 0.16);
        this.frontWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.14, 0.15, -0.16);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.frontWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.14, 0.11, 0.15);
        this.scene.scale(0.8, 0.8, 0.8)
        this.backWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.14, 0.11, -0.15);
        this.scene.scale(0.8, 0.8, 0.8)
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.backWing.display();
        this.scene.popMatrix();

    }
}