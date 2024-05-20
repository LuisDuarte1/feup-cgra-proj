import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { applyScalarToPointInDirection, changeVertex, setColorRGB } from "../utils.js";


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
            const deviation = (Math.random()*2-1) / magnitude
            if (vertex[1] == this.horizontalRadius || vertex[1] == -this.horizontalRadius){
                continue
            }
            const resultVertex = applyScalarToPointInDirection(normal, vertex, deviation)
            changeVertex(vertices, resultVertex, i)
        }
        this.initialSphere.initGLBuffers()
    }
    
    constructor(scene, randomMagnitude=8){
        super(scene)
        this.appearance = new CGFappearance(scene)
        setColorRGB(this.appearance, 190, 190, 190)
        this.appearance.setShininess(5)
        this.appearance.loadTexture("images/rock.jpg")
        
        const ratio = Math.random()/2 + 0.5

        const vertical = Math.random() >= 0.5
        
        this.initialSphere = new MySphere(scene, 15, 15, false, 
            ratio, vertical ? 0.8 : 0.5)
        
        this.verticalRadius = ratio
        this.horizontalRadius = vertical ? 0.8 : 0.5

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