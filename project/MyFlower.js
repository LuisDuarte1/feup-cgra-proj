import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyCorolla } from './MyCorolla.js';

export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.stem = new MyStem(scene);
        this.corolla = new MyCorolla(scene);
        this.initMaterials();
    }
    initMaterials() {
        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial.setAmbient(0.1, 0.1, 0.3, 1);
        this.blueTriangleMaterial.setDiffuse(0.2, 0.2, 0.8, 1);
        this.blueTriangleMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.blueTriangleMaterial.setShininess(10.0);

        this.greenTriangleMaterial = new CGFappearance(this.scene);
        this.greenTriangleMaterial.setAmbient(0.1, 0.3, 0.1, 1);
        this.greenTriangleMaterial.setDiffuse(0.2, 0.8, 0.2, 1);
        this.greenTriangleMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.greenTriangleMaterial.setShininess(10.0);
    }
    display() {
        this.scene.pushMatrix();
        this.greenTriangleMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.blueTriangleMaterial.apply();
        let stemHeight = this.stem.cylinders[0].height;
        this.scene.translate(0, stemHeight, 0);
        this.corolla.display();
        this.scene.popMatrix();
    }
}