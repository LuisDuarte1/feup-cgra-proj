import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';

export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.petal = new MyPetal(scene, Math.PI/4.0);
        this.stem = new MyStem(scene, 20);
        this.receptacle = new MyReceptacle(scene, 40, 20);
        this.receptacleHeight = this.receptacle.height;
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
        /*
        this.scene.pushMatrix(); 
        this.blueTriangleMaterial.apply();
        this.stem.display();
        this.scene.popMatrix(); 
        */
        this.scene.pushMatrix();
        this.greenTriangleMaterial.apply();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.receptacle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.blueTriangleMaterial.apply();
        this.scene.translate(0, this.receptacleHeight*2, 0);
        this.petal.display();
    
        
    }
}