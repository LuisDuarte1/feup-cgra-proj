import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyCorolla } from './MyCorolla.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyFlower extends CGFobject {
    constructor(scene, numCylinders, height, radius, stemAppearance, leafAppearance, corollaRadius, 
            numPetals, petalAngle, maxAngle, minAngle, innerPetalColor, outerPetalColor, receptacleRadius, receptacleColor,
            YYRotation=0, basePosition=[0,0,0]) {
        super(scene);
        this.scene.globalFlowerList.push(this);
        this.height = height;
        let maxHeight = height/3;
        let minHeight = height/5;
        this.YYRotation = YYRotation;
        this.basePosition = basePosition;
        this.receptacleRadius = receptacleRadius;
        this.stem = new MyStem(scene, numCylinders, this.height, maxHeight, minHeight, radius, stemAppearance, leafAppearance);
        this.corolla = new MyCorolla(scene, corollaRadius, numPetals, petalAngle, maxAngle, minAngle, innerPetalColor, outerPetalColor, receptacleRadius, receptacleColor);
        this.polen = new MySphere(scene, 20, 20);
        this.initMaterials();
    }

    /**
     * @returns {{pos: number[], normal: number[]}}
     */
    getPolenWorldPosition(){
        const normal = this.getPolenNormal();
        return {
            pos: [
                this.basePosition[0] + this.stem.finalPosition[0] - (this.receptacleRadius-0.3)*0.6*normal[0],
                this.basePosition[1] + this.stem.finalPosition[1] - (this.receptacleRadius-0.3)*0.6*normal[1],
                this.basePosition[2] + this.stem.finalPosition[2] - (this.receptacleRadius-0.3)*0.6*normal[2]
            ],
            normal: normal
        }
    }

    getPolenNormal(){
        const xz = Math.cos(-this.stem.angle-Math.PI/6-Math.PI/4)
        const y = Math.sin(-this.stem.angle-Math.PI/6-Math.PI/4)
        const x = xz * Math.cos(this.YYRotation)
        const z = xz * Math.sin(this.YYRotation)
        return [x,y,z]
    }

    initMaterials() {
    }
    display() {
        if(this.polen){
            const normal = this.getPolenNormal()

            this.scene.pushMatrix()
            this.scene.rotate(this.YYRotation, 0, 1, 0);
            this.scene.translate(
                this.stem.finalPosition[0] - (this.receptacleRadius-0.3)*0.6*normal[0], 
                this.stem.finalPosition[1] - (this.receptacleRadius-0.3)*0.6*normal[1], 
                this.stem.finalPosition[2] - (this.receptacleRadius-0.3)*0.6*normal[2], 
                )            

            this.scene.scale(0.15, 0.15, 0.15)
            this.polen.display()
            this.scene.popMatrix()
        }


        this.scene.pushMatrix()
        this.scene.rotate(this.YYRotation, 0, 1, 0);
        this.scene.translate(...this.stem.finalPosition)
        this.scene.rotate(-this.stem.angle-Math.PI/6, 1, 0, 0)
        this.scene.scale(0.6, 0.6, 0.6)
        this.corolla.display()
        this.scene.popMatrix()
        this.scene.pushMatrix()
        this.scene.rotate(this.YYRotation, 0, 1, 0);
        this.stem.display()
        this.scene.popMatrix()
    }
}