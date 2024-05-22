import { CGFobject } from '../../lib/CGF.js';

/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);

		this.initBuffers();
	}
	/**
	 * Initializes the buffers for the triangle.
	 */
	initBuffers() {
		this.vertices = [
				-0.5, 0, 0,
               	0.5, 0, 0,
				0, 1, 0,
			];

		this.indices = [
				0,1,2,
				2,1,0
			];
		
		this.texCoords = [
			0, 0,
			1, 0,
			0, 1
		];
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
