import { CGFappearance, CGFobject, CGFscene } from "../../lib/CGF.js";
import { MyBeeHead } from "./MyBeeHead.js";
import { MyBeeThorax } from "./MyBeeThorax.js";
import { setColorRGB } from "../utils.js";



export class MyBee extends CGFobject{
    /**
     * 
     * @param {CGFscene} scene 
     */
    constructor(scene){
        super(scene)
        this.scene = scene
        this.head = new MyBeeHead(scene)
        this.thorax = new MyBeeThorax(scene)
    }


    display(){
        this.scene.pushMatrix()
        this.scene.rotate(-Math.PI/2, 0, 1, 0)
        this.scene.rotate(-Math.PI/6, 1, 0, 0)
        this.scene.scale(0.65, 0.65, 0.65)
        this.head.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0.7, 0, 0)
        this.scene.scale(0.9, 0.9, 0.9)
        this.thorax.display()
        this.scene.popMatrix()

    }
}