import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyBeeLegs extends CGFobject {
    constructor(scene, angle, double = false) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 1, 1, false);
        this.angle = angle;
        this.double = double;
    }

    display() {
        this.scene.pushMatrix()
        this.scene.scale(0.1, 0.4, 0.1)
        this.scene.translate(0, -1, 0)
        this.sphere.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()

        this.scene.translate(0, -0.75, 0)
        this.scene.rotate(this.angle, 0, 0, 1)

        this.scene.pushMatrix()
        this.scene.scale(0.1, 0.3, 0.1)
        this.scene.translate(0, -1, 0)
        this.sphere.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, -0.5, 0)
        this.scene.rotate(10 * Math.PI / 180, 1, 0, 0)
        this.scene.scale(0.03, 0.1, 0.025)
        this.scene.translate(0, -1, 0)
        this.sphere.display()
        this.scene.popMatrix()

        if(this.double){
            this.scene.pushMatrix()
            this.scene.translate(0, -0.5, 0)
            this.scene.rotate(-10 * Math.PI / 180, 1, 0, 0)
            this.scene.scale(0.03, 0.1, 0.025)
            this.scene.translate(0, -1, 0)
            this.sphere.display()
            this.scene.popMatrix()
        }

        this.scene.popMatrix()
    }
}