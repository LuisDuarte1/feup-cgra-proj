import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyBeeLegs extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 10, false, 1, 1, false);
        this.initMaterials();
    }
    initMaterials() {
        this.beeLegsTex = new CGFtexture(this.scene, "images/beeLegs.png");
        this.beeLegsAppearance = new CGFappearance(this.scene);
        this.beeLegsAppearance.setTexture(this.beeLegsTex);
        this.beeLegsAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
    display() {
        this.scene.pushMatrix()
        this.scene.scale(0.1, 0.6, 0.1)
        this.scene.translate(0, 1, 0)
        this.beeLegsAppearance.apply()
        this.sphere.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()
        this.scene.rotate(-Math.PI / 6, 1, 0, 0)

        this.scene.pushMatrix()
        this.scene.scale(0.1, 0.6, 0.1)
        this.scene.translate(0, -1, 0)
        //this.beeToraxAppearance.apply();
        this.sphere.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-0.04, -1.25, -0)
        this.scene.rotate(-Math.PI / 8, 0, 0, 1)
        this.scene.scale(0.04, 0.1, 0.04)
        this.sphere.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0.04, -1.25, 0)
        this.scene.rotate(Math.PI / 8, 0, 0, 1)
        this.scene.scale(0.04, 0.1, 0.04)
        this.sphere.display()
        this.scene.popMatrix()

        this.scene.popMatrix()
    }
}