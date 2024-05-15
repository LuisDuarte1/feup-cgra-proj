import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyCorolla } from './MyCorolla.js';

export class MyFlower extends CGFobject {
    constructor(scene, numCylinders, height, maxHeight, minHeight, radius, stemAppearance, leafAppearance) {
        super(scene);
        this.numCylinders = numCylinders;
        this.height = height;
        this.maxHeight = maxHeight;
        this.minHeight = minHeight;
        this.radius = radius;
        this.stemAppearance = stemAppearance;
        this.leafAppearance = leafAppearance;
        this.stem = new MyStem(scene, this.numCylinders, this.height, this.maxHeight, this.minHeight, this.radius, this.stemAppearance, this.leafAppearance);
        this.corolla = new MyCorolla(scene);
        this.initMaterials();
    }
    initMaterials() {
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, this.height, 0);
        this.scene.scale(0.8, 0.8, 0.8);
        if (this.numCylinders % 2) this.scene.rotate(Math.PI + Math.PI/6, 1, 0, 0);
        else this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.corolla.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();
    }
}