import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.blueTriangle = new MyTriangleBig(scene);
        this.orangeTriangle = new MyTriangleBig(scene);
		this.pinkTriangle = new MyTriangleSmall(scene);
		this.redTriangle = new MyTriangle(scene);
		this.purpleTriangle = new MyTriangle(scene);
		this.yellowParallelogram = new MyParallelogram(scene);
		this.greenDiamond = new MyDiamond(scene);
		this.initMaterials();
	}

	initMaterials() {
        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial.setAmbient(0.1, 0.1, 0.3, 1);
        this.blueTriangleMaterial.setDiffuse(0.2, 0.2, 0.8, 1);
        this.blueTriangleMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.blueTriangleMaterial.setShininess(10.0);

        this.orangeTriangleMaterial = new CGFappearance(this.scene);
        this.orangeTriangleMaterial.setAmbient(0.7, 0.3, 0.0, 1);
        this.orangeTriangleMaterial.setDiffuse(1.0, 0.3, 0.0, 1);
        this.orangeTriangleMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.orangeTriangleMaterial.setShininess(10.0);

        this.redTriangleMaterial = new CGFappearance(this.scene);
        this.redTriangleMaterial.setAmbient(0.7, 0.0, 0.0, 1.0);
        this.redTriangleMaterial.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.redTriangleMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.redTriangleMaterial.setShininess(10.0);

        this.pinkTriangleMaterial = new CGFappearance(this.scene);
        this.pinkTriangleMaterial.setAmbient(1, 0.54, 0.84, 1);
        this.pinkTriangleMaterial.setDiffuse(0.97, 0.71, 0.88, 1);
        this.pinkTriangleMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.pinkTriangleMaterial.setShininess(10.0);

        this.purpleTriangleMaterial = new CGFappearance(this.scene);
        this.purpleTriangleMaterial.setAmbient(0.5, 0.37, 0.85, 1);
        this.purpleTriangleMaterial.setDiffuse(0.4, 0.31, 0.65, 1);
        this.purpleTriangleMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.purpleTriangleMaterial.setShininess(8.0);

        this.yellowParallelogramMaterial = new CGFappearance(this.scene);
        this.yellowParallelogramMaterial.setAmbient(0.7, 0.6, 0.0, 1);
        this.yellowParallelogramMaterial.setDiffuse(1.0, 0.8, 0.0, 1);
        this.yellowParallelogramMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.yellowParallelogramMaterial.setShininess(10.0);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-2,0,0);
        this.scene.rotate(3*Math.PI/2, 0, 0, 1);
        this.blueTriangleMaterial.apply();
        this.blueTriangle.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.scale(0.75,0.75,1);    
        this.scene.translate(1,1,0);
        this.scene.rotate(3*Math.PI/2, 0,0,1);
        this.redTriangleMaterial.apply();
        this.redTriangle.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.scale(1.5,1.5,1);
        this.scene.translate(0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.pinkTriangleMaterial.apply();
        this.pinkTriangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.scale(0.75,0.75,1);    
        this.scene.translate(3,3,0);
        this.purpleTriangleMaterial.apply();
        this.purpleTriangle.display();
        
        this.scene.popMatrix();
		this.scene.pushMatrix();
		
        this.scene.scale(-1.06,1.06,1);
        this.scene.rotate(135*Math.PI/180, 0, 0, 1);
        this.yellowParallelogramMaterial.apply();
		this.yellowParallelogram.display();

		this.scene.popMatrix();
		this.scene.pushMatrix();

        this.scene.translate(0.75,2.25,0);
        this.scene.rotate(Math.PI/4, 0,0,1);
        this.scene.scale(1.06,1.06,1);
        this.scene.customMaterial.apply();
        this.greenDiamond.display();

		this.scene.popMatrix();
		this.scene.pushMatrix();
		
		this.scene.translate(3.5,0,0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.orangeTriangleMaterial.apply();
		this.orangeTriangle.display();
		
		this.scene.popMatrix();
    }
}
