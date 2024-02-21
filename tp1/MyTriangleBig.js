import { CGFobject } from '../lib/CGF.js';

/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
                0,2,0,
                -2,0,0,
                2,0,0
			];

		this.indices = [
				1,2,0,
                0,2,1
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
