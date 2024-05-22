import { CGFscene, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyScene } from "./MyScene.js";
import { MyUnitCubeQuad } from "./primitives/MyUnitCubeQuad.js";


export class MyHive extends CGFscene{

    /**
     * 
     * @param {MyScene} scene 
     */
    constructor(scene, basePosition=[0,0,0]){
        super(scene)
        this.scene = scene
        this.quadMaterial = new CGFappearance(scene);
        this.quadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.woodTexture = new CGFtexture(scene, "images/wood.jpg")
        this.topTexture = new CGFtexture(scene, "images/topBee.png")
        this.entryTexture = new CGFtexture(scene, "images/hiveEntryTexture.jpg")
        this.bottomSquare = new MyUnitCubeQuad(scene, [
            this.woodTexture,
            this.woodTexture,
            this.entryTexture,
            this.woodTexture,
            this.woodTexture,
            this.woodTexture,
        ], this.quadMaterial)

        this.topSquare = new MyUnitCubeQuad(scene, [
            this.topSquare,
            this.woodTexture,
            this.topSquare,
            this.topSquare,
            this.topSquare,
            this.topSquare,
        ], this.quadMaterial)
        this.basePosition = basePosition;
    }

    /**
     * @returns {number[]}
     */
    getHolePosition(){
        return [
            this.basePosition[0],
            this.basePosition[1] + 1.75,
            this.basePosition[2] + 5 + 0.15,
        ]
    }

    display(){
        this.scene.pushMatrix()
        this.scene.scale(5,5,5)

            this.scene.pushMatrix()
            this.scene.translate(0, 1.55, 0);
            this.scene.scale(1.2, 0.1, 1.2);
            this.topSquare.display()
            this.scene.popMatrix()


            this.scene.pushMatrix()
            this.scene.scale(1, 1.5, 1);
            this.scene.translate(0, 0.5, 0)
            this.bottomSquare.display()
            this.scene.popMatrix()

        this.scene.popMatrix()
    }
}