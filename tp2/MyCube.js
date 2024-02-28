import { CGFobject } from '../lib/CGF.js';

/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,

            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5
			];

		this.indices = [
            //facing camera
            0,1,2,
            1,3,2,

            //up
            1,5,3,
            5,7,3,

            //down
            2,4,0,
            2,6,4,

            //right
            0,4,1,
            1,4,5,

            //left
            3,6,2,
            3,7,6,

            //back
            6,5,4,
            6,7,5
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
