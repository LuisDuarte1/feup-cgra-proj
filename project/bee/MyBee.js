import { CGFappearance, CGFobject, CGFscene } from "../../lib/CGF.js";
import { MyBeeHead } from "./MyBeeHead.js";
import { MyBeeThorax } from "./MyBeeThorax.js";
import { MyBeeAbdomen } from "./MyBeeAbdomen.js";
import { setColorRGB } from "../utils.js";
import { MyPolen } from "../flower/MyPolen.js";



export class MyBee extends CGFobject{

    constructor(scene, x = 0, y = 0, z = 0, orientation = 0, speed = 0){
        super(scene)
        this.scene = scene
        this.frontWingAngle = Math.PI/10
        this.backWingAngle = 10 * Math.PI/180
        this.head = new MyBeeHead(scene)
        this.thorax = new MyBeeThorax(scene, this.frontWingAngle, this.backWingAngle)
        this.abdomen = new MyBeeAbdomen(scene)
        this.polen = null;

       /*this.position = {x: x, y: y, z: z}
        this.def
        this.orientation = orientation
        this.speed = speed*/


        this.displayHead()
        this.displayThorax()
        this.displayAbdomen()
    }
    displayHead(){
        this.scene.pushMatrix()
        this.scene.rotate(-Math.PI/2, 0, 1, 0)
        this.scene.rotate(-Math.PI/8, 1, 0, 0)
        this.scene.scale(0.5, 0.5, 0.5)
        this.head.display()
        this.scene.popMatrix()
    }
    displayThorax(){
        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.scale(0.9, 0.9, 0.9)
        this.thorax.display(this.polen ? true : false)
        this.scene.popMatrix()
    }
    displayAbdomen(){
        this.scene.pushMatrix()
        this.scene.translate(1.05, -0.2, 0)
        this.scene.rotate(Math.PI/3, 0, 0, 1)
        this.scene.scale(0.5, 0.5, 0.5)
        this.abdomen.display()
        this.scene.popMatrix()
    }
    display(){

        if(this.polen){
            this.scene.pushMatrix();
            this.scene.translate(0.3, -0.35, 0)
            this.scene.scale(0.06, 0.08, 0.06)
            this.polen.display();
            this.scene.popMatrix();
        }
        this.displayHead()
        this.displayThorax()
        this.displayAbdomen()
    }
}