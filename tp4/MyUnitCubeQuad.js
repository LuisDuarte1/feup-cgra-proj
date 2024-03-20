import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, textures, quadMaterial) {
		super(scene);
        this.quadMaterial = quadMaterial
        this.quad = new MyQuad(scene);
        this.textures = textures
		this.initBuffers();
	}

	initBuffers() {
	}

    display() {

        this.quadMaterial.setTexture(this.textures[0])
        this.quadMaterial.apply()
        // top
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.quadMaterial.setTexture(this.textures[1])
        this.quadMaterial.apply()
        // bottom
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        // front
        this.quadMaterial.setTexture(this.textures[2])
        this.quadMaterial.apply()
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
