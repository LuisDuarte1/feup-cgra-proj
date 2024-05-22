import { CGFobject, CGFscene } from "../../lib/CGF.js";
import { MyGrass } from "./MyGrass.js";


export class MyBigGrass extends CGFobject{

    /**
     * 
     * @param {CGFscene} scene 
     */
    constructor(scene, radius=200){
        super(scene)
        this.scene = scene
        this.grassBlocks = []
        this.grassBlockTransformations = []
        const grassRadius = 50
        for(let i = radius; i > -radius; i -= grassRadius){
            for(let j = radius; j > -radius; j -= grassRadius){
                const grassBlock = new MyGrass(scene, 50, 9000)
                this.grassBlocks.push(grassBlock)
                this.grassBlockTransformations.push({translation: [i,0,j]})
            }
        }
    }

    display(){
        this.scene.setActiveShaderSimple(MyGrass.shader)
        for(let i = 0; i < this.grassBlocks.length; i++){
            this.scene.pushMatrix()
            this.scene.translate(...this.grassBlockTransformations[i].translation)
            this.grassBlocks[i].display()
            this.scene.popMatrix()
        }
        this.scene.setActiveShaderSimple(this.scene.defaultShader)
    }
}