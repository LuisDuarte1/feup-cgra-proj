import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';
import { setColorRGB } from "../utils.js";

export class MyBeeLegs extends CGFobject {
    constructor(scene, angle, back = false) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 1, 1, false);
        this.angle = angle;
        this.back = back;
        this.initMaterials();
    }

    initMaterials() {
        this.brownAppearance = new CGFappearance(this.scene);
        setColorRGB(this.brownAppearance, 8, 7, 7);
    }
    display() {
        this.scene.pushMatrix()
        this.scene.scale(0.07, 0.3, 0.07)
        this.scene.translate(0, -1, 0)
        this.brownAppearance.apply()
        this.sphere.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()

        this.scene.translate(0, -0.58, 0)

        if (this.back) this.scene.rotate(this.angle, 0, 0, 1)
        else this.scene.rotate(this.angle, 1, 0, 0)

        this.scene.pushMatrix()
        this.scene.scale(0.05, 0.3, 0.05)
        this.scene.translate(0, -1, 0)
        this.brownAppearance.apply()
        this.sphere.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, -0.55, 0)
        this.scene.rotate(20 * Math.PI / 180, 1, 0, 0)
        this.scene.scale(0.02, 0.09, 0.02)
        this.scene.translate(0, -1, 0)
        this.brownAppearance.apply()
        this.sphere.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, -0.5, 0)
        this.scene.rotate(-20 * Math.PI / 180, 1, 0, 0)
        this.scene.scale(0.03, 0.1, 0.025)
        this.scene.translate(0, -1, 0)
        this.sphere.display()
        this.scene.popMatrix()

        this.scene.popMatrix()
    }
}