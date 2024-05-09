import { CGFobject, CGFscene } from "../lib/CGF.js";


const BLADE_HEIGHT = 1.3;
const BLADE_HEIGHT_VARIATION = 0.6;
const BLADE_WIDTH = 0.1;
const BLADE_COUNT = 1;
const PLANE_RADIUS = 30;



export class MyGrass extends CGFobject{

    /**
     * 
     * @param {CGFscene} scene 
     * @param {number} bladeCount
     * @param {number} radius 
     * @param {number} yPos 
     */
    constructor(scene, bladeCount=12000, radius=25, yPos=0){
        super(scene)
        this.bladeCount = bladeCount
        this.radius = radius
        this.yPos = yPos
        this.generateField()
    }

    generateField(){
        this.vertices = []
        this.indices = []
        for(let i = 0; i < this.bladeCount; i++){
            const x = Math.random() * this.radius;
            const z = Math.random() * this.radius;
            const blade = this.generateBlade([x,this.yPos,z], i*5)
            this.vertices.push(...blade.vertices)
            this.indices.push(...blade.indices)
        }
        this.initGLBuffers()
    }

    /**
     * 
     * @param {number[]} center 
     * @param {number} offset 
     * @returns {{vertices: number[], indices:[], colors: []}}
     */
    generateBlade(center, offset){
        const MIDDLE_WIDTH = BLADE_WIDTH * 0.5;
        const TIP_OFFSET = 0.1;
        const yaw = Math.random() * Math.PI * 2;
        // const yawVec = [1, 0, 1]
        const yawVec = [Math.sin(yaw), 0, -Math.cos(yaw)]
        const tipBend = Math.random() * Math.PI * 2;
        const tipBendVec = [Math.sin(tipBend), 0, -Math.cos(tipBend)]
        // const tipBendVec = [1, 0, 1]
        const height = BLADE_HEIGHT + (Math.random() * BLADE_HEIGHT_VARIATION)

        const indicesList = [
            offset,
            offset + 1,
            offset + 2,
            offset + 2,
            offset + 1,
            offset + 3,
            offset + 2,
            offset + 3,
            offset + 4
        ]

        return {
            vertices: [
                center[0]+(yawVec[0]*BLADE_WIDTH/2), center[1]+(yawVec[1]*BLADE_WIDTH/2), center[2]+(yawVec[2]*BLADE_WIDTH/2), //bottom left
                center[0]+(yawVec[0]*-1*BLADE_WIDTH/2), center[1]+(yawVec[1]*-1*BLADE_WIDTH/2), center[2]+(yawVec[2]*-1*BLADE_WIDTH/2), //bottom right
                center[0]+(yawVec[0]*MIDDLE_WIDTH/2), center[1]+(yawVec[1]*MIDDLE_WIDTH/2) + height/2, center[2]+(yawVec[2]*MIDDLE_WIDTH/2), //top left
                center[0]+(yawVec[0]*MIDDLE_WIDTH/2*-1), center[1]+(yawVec[1]*MIDDLE_WIDTH/2*-1)+ height/2, center[2]+(yawVec[2]*MIDDLE_WIDTH/2*-1), //top right
                center[0]+(tipBendVec[0]*TIP_OFFSET*BLADE_WIDTH), center[1]+(tipBendVec[1]*TIP_OFFSET*BLADE_WIDTH) + height, center[2]+(tipBendVec[2]*TIP_OFFSET*BLADE_WIDTH) // top centers
            ],
            indices: [...indicesList, ...Array.from(indicesList).reverse()],
            colors: [
                0, 0, 0,
                0, 0, 0,
                0.5, 0.5, 0.5,
                0.5, 0.5, 0.5,
                1, 1, 1,
            ]
        }
    }
}