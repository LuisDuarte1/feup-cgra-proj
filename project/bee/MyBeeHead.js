import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';
import { MyTriangle } from '../primitives/MyTriangle.js';
import { MyBeeAntennae } from './MyBeeAntennae.js';
import { setColorRGB } from "../utils.js";

export class MyBeeHead extends CGFobject {
	constructor(scene) {		
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 0.8, 0.8, false);
        this.triangle = new MyTriangle(scene);
        this.antennae = new MyBeeAntennae(scene);
        this.initMaterials();
	}

    initMaterials() {
        this.beeHeadTex = new CGFtexture(this.scene, "images/beeFur.png");
        this.beeHeadAppearance = new CGFappearance(this.scene);
        setColorRGB(this.beeHeadAppearance, 214, 171, 0);
        this.beeHeadAppearance.setAmbient(0.6, 0.6, 0.6, 0.7);
        this.beeHeadAppearance.setTexture(this.beeHeadTex);
        this.beeHeadAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeTex = new CGFtexture(this.scene, "images/beeEyes.png");
        this.eyeAppearance = new CGFappearance(this.scene);
        setColorRGB(this.eyeAppearance, 28, 28, 28);
        this.eyeAppearance.setTexture(this.eyeTex);
        this.eyeAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.brownAppearance = new CGFappearance(this.scene);
        setColorRGB(this.brownAppearance, 8, 7, 7);
    }
    display(){

        // head
        this.scene.pushMatrix();
        this.scene.scale(0.55, 0.68, 0.55);
        this.beeHeadAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        // left eye
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.4, 0.3)
        this.scene.translate(-1, -0.03, 0.6)
        this.eyeAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // right eye
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.4, 0.3)
        this.scene.translate(1, -0.03, 0.6)
        this.eyeAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // mouth
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.2, 0.3)
        this.scene.translate(0, -2.2, 0.8)
        this.brownAppearance.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // left antennae
        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0.3, 0.15);
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.rotate(-Math.PI/10, 0, 1, 0);
        this.brownAppearance.apply();
        this.antennae.display();
        this.scene.popMatrix();

        // right antennae
        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.3, 0.15);
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.rotate(Math.PI/10, 0, 1, 0);
        this.brownAppearance.apply();
        this.antennae.display();
        this.scene.popMatrix();
    }
}
