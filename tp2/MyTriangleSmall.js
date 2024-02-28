import { CGFobject } from '../lib/CGF.js';

/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
                0,1,0,
                -1,0,0,
                1,0,0
			];

		this.indices = [
				1,2,0,
                0,2,1
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
