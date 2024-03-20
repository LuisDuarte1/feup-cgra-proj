import { CGFobject } from '../lib/CGF.js';

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

	initBuffers() {
		this.vertices = [
				1.0, -1.0, 0,
               	-1.0, 1.0, 0,
				-1.0, -1.0, 0,
			];

		this.indices = [
				0,1,2,
				2,1,0
			];
		
		this.texCoords = [
			0.75, 0.75,
			0.25, 0.75,
			0.5, 0.5
		]
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}