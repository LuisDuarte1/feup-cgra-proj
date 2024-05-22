import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { applyScalarToPointInDirection, changeVertex, setColorRGB } from "../utils.js";


export class MyRock extends CGFobject{

    static appearance = null;

    /**
     * Randomizes the vertices of the initial sphere to create a rock-like appearance.
     * It applies a random deviation to each vertex along its normal, except for the top and bottom vertices.
     *
     * @param {number} magnitude - The magnitude of the random deviation. Higher values result in smaller deviations.
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
    /**
     * Constructs a new rock object.
     * @param {*} scene 
     * @param {*} randomMagnitude - The magnitude of the random deviation. Higher values result in smaller deviations.
     */
    constructor(scene, randomMagnitude=8){
        super(scene)
        if(MyRock.appearance == null){
            MyRock.appearance = new CGFappearance(scene)
            setColorRGB(MyRock.appearance, 190, 190, 190)
            MyRock.appearance.loadTexture("images/rock.jpg")
        }
        
        const ratio = Math.random()/2 + 0.5

        const vertical = Math.random() >= 0.5
        
        this.initialSphere = new MySphere(scene, 10, 10, false, 
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
        MyRock.appearance.apply()
        this.initialSphere.display()
    }
}