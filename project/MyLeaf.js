import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { setColorRGB } from "./utils.js";
import { MyTriangle } from './primitives/MyTriangle.js';
import { MyCylinder } from './primitives/MyCylinder.js';

export class MyLeaf extends CGFobject {
    constructor(scene, leafColor) {
        super(scene);
        this.triangle = new MyTriangle(scene);
        this.cylinder = new MyCylinder(scene, 40, 1);
        this.leafColor = leafColor;
        this.initMaterials();
    }

    initMaterials() {
        this.leafStem = new CGFappearance(this.scene);
        setColorRGB(this.leafStem, 67,107,2);
        this.leafStem.setShininess(10.0);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.008, 0.5, 0.008);
        this.leafStem.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5); 
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(0, -1.1, 0);
        this.leafColor.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, 1.1, 0);
        this.scene.scale(1, 0.5, 1);
        this.scene.rotate(Math.PI/5, 1, 0, 0);
        this.leafColor.apply();
        this.triangle.display();
        this.scene.popMatrix();

    }
}