import {CGFobject, CGFscene} from '../lib/CGF.js';


export class MySphere extends CGFobject{
    /**
     * 
     * @param {CGFscene} scene 
     * @param {number} slices 
     * @param {number} stacks 
     * @param {boolean} invertNormals 
     */
    constructor(scene, slices, stacks, invertNormals=false, verticalRadius=1, horizontalRadius=1) {
		super(scene);
		this.initBuffers(slices, stacks, invertNormals,verticalRadius,horizontalRadius);
	}

    normalize(v1){
        const magnitude = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1] +v1[2]*v1[2])
        return [v1[0]/magnitude, v1[1]/magnitude, v1[2]/magnitude]
    }

    /**
     * 
     * @param {number} slices 
     * @param {number} stacks 
     * @param {boolean} invertNormals 
     * @param {number} verticalRadius 
     * @param {number} horizontalRadius 
     * 
     */
	initBuffers(slices, stacks, invertNormals, verticalRadius, horizontalRadius) {

        this.vertices = []

        this.indices = []

        this.normals = []

        this.texCoords = []

        const stackStep = Math.PI / 2 / stacks;
        const sectorStep = Math.PI * 2 / slices;
        for(let i = 0; i <= stacks*2; i++){
            let stackAngle = Math.PI / 2 - i * stackStep;
            const xy = Math.cos(stackAngle)
            const z = horizontalRadius * Math.sin(stackAngle)

            for(let j = 0; j <= slices; j++){
                let sectorAngle = j * sectorStep
                const x = horizontalRadius * xy * Math.cos(sectorAngle)
                const y = verticalRadius * xy * Math.sin(sectorAngle)

                this.vertices.push(x,z,y)
                if(invertNormals) this.normals.push(-x,-y,-x)
                else this.normals.push(x,z,y)
                

                this.texCoords.push(1 - j / (slices), i / (stacks*2))
            }
        }

        for(let i = 0; i < stacks*2; i++){
            let k1 = i * (slices + 1);
            let k2 = k1 + slices + 1;
            for(let j = 0; j < slices; j++, k1++, k2++){
                if(i != 0){
                    this.indices.push(k1, k2, k1 + 1)
                    this.indices.push(k1 + 1, k2, k1)
                }
                if(i != (stacks*2 - 1)){
                    this.indices.push(k1+1, k2, k2+1)
                    this.indices.push(k2+1, k2, k1+1)
                }
            }
        }


		this.initGLBuffers();
	}
}