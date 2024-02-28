import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(scene);
		this.initBuffers();
	}

	initBuffers() {
	}

    display() {

        // front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.quad.display();
		this.scene.popMatrix();

        // back
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        // top
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        // bottom
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        // right
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        // left
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();
    }
}
