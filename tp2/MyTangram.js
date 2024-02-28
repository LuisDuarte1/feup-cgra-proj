import { CGFobject } from '../lib/CGF.js';
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
		this.initBuffers();
	}

	initBuffers() {
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-2,0,0);
        this.scene.rotate(3*Math.PI/2, 0, 0, 1);
        this.blueTriangle.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.scale(0.75,0.75,1);    
        this.scene.translate(1,1,0);
        this.scene.rotate(3*Math.PI/2, 0,0,1);
        this.redTriangle.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.scale(1.5,1.5,1);
        this.scene.translate(0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.pinkTriangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.scale(0.75,0.75,1);    
        this.scene.translate(3,3,0);
        this.purpleTriangle.display();
        
        this.scene.popMatrix();
		this.scene.pushMatrix();
		
        this.scene.scale(-1.06,1.06,1);
        this.scene.rotate(135*Math.PI/180, 0, 0, 1);
		this.yellowParallelogram.display();

		this.scene.popMatrix();
		this.scene.pushMatrix();

        this.scene.translate(0.75,2.25,0);
        this.scene.rotate(Math.PI/4, 0,0,1);
        this.scene.scale(1.06,1.06,1);
        this.greenDiamond.display();

		this.scene.popMatrix();
		this.scene.pushMatrix();
		
		this.scene.translate(3.5,0,0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.orangeTriangle.display();
		
		this.scene.popMatrix();
    }
}
