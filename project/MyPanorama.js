import {CGFappearance, CGFobject, CGFscene, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';


export class MyPanorama extends CGFobject{
    /**
     * 
     * @param {CGFscene} scene 
     * @param {CGFtexture} texture 
     */
    constructor(scene, texture) {
		super(scene);
        this.appearance = new CGFappearance(scene)
        this.appearance.setAmbient(0,0,0,0);
        this.appearance.setDiffuse(0,0,0,0);
        this.appearance.setSpecular(0,0,0,0);
        this.appearance.setEmission(1,1,1,1)
        this.appearance.setTexture(texture)
        this.sphere = new MySphere(scene, 20, 20, true)
	}

    /**
     * @property {CGFappearance} appearance
     * @property {MySphere} sphere
     * @property {CGFscene} scene
     */

    display() {
        this.appearance.apply()

        this.scene.pushMatrix()

        this.scene.scale(200, 200, 200)

        this.sphere.display()

        this.scene.popMatrix()
    }
}