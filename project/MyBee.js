import { CGFappearance, CGFobject, CGFscene } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCylinder } from "./MyCylinder.js";
import { setColorRGB } from "./utils.js";



export class MyBee extends CGFobject{
    /**
     * 
     * @param {CGFscene} scene 
     */
    constructor(scene){
        super(scene)
        this.scene = scene
        this.bodyAppearence = new CGFappearance(scene)
        setColorRGB(this.bodyAppearence, 247, 243, 7)
        this.sphere = new MySphere(scene, 20, 20, false, 0.8, 1, true)
        this.cylinder = new MyCylinder(scene, 80, 20, true)
    }

    /**
     * @property {CGFscene} scene
     * @property {MySphere} sphere
     * @property {CGFappearance} bodyAppearence
     */

    display(){
        // this.sphere.enableNormalViz()
        // this.cylinder.enableNormalViz()
        this.bodyAppearence.apply()

        this.scene.pushMatrix()
        this.scene.translate(0,0,-0.5)
        this.scene.scale(1,1,1.5)
        this.cylinder.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0,0,1)
        this.sphere.display()
        this.scene.popMatrix()
    }
}