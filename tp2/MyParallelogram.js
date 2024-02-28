import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0,0,0,
            1,0,0,
            1,1,0,
            2,0,0,
            2,1,0,
            3,1,0
		];

		this.indices = [
            0,1,2,
            1,4,2,
            3,4,1,
            3,5,2,

            2,1,0,
            2,4,1,
            1,4,3,
            2,5,3,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

