import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { applyScalarToPointInDirection, changeVertex, setColorRGB } from "./utils.js";


export class MyRock extends CGFobject{

    /**
     * 
     * @param {number} magnitude 
     */
    randomizeVertices(magnitude){
        let vertices = this.initialSphere.vertices
        let normals = this.initialSphere.normals
        for(let i = 0; i < vertices.length / 3; i++){
            const vertex = [vertices[i*3], vertices[i*3 + 1], vertices[i*3+ 2]]
            const normal = [normals[i*3], normals[i*3 + 1], normals[i*3+ 2]]
            const deviation = Math.random() / magnitude
            const resultVertex = applyScalarToPointInDirection(normal, vertex, deviation)
            changeVertex(vertices, resultVertex, i)
        }
        this.initialSphere.initGLBuffers()
    }
    
    constructor(scene, randomMagnitude=3){
        super(scene)
        this.appearance = new CGFappearance(scene)
        setColorRGB(this.appearance, 88, 96, 100)
        
        const ratio = Math.random() / 2  + 0.4
        const vertical = Math.random() > 0.5;
        
        this.initialSphere = new MySphere(scene, 15, 15, false, 
            vertical ? 1 : ratio, 
            !vertical ? 1 :ratio)

        this.randomizeVertices(randomMagnitude)
    }
    /**
     * @property {MySphere} initialSphere
     * @property {CGFappearance} appearance
     */

    display(){
        this.appearance.apply()
        this.initialSphere.display()
    }
}