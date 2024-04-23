import {CGFobject} from '../lib/CGF.js';


export class MySphere extends CGFobject{
    constructor(scene, slices, stacks) {
		super(scene);
		this.initBuffers(slices, stacks);
	}

    normalize(v1){
        const magnitude = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1] +v1[2]*v1[2])
        return [v1[0]/magnitude, v1[1]/magnitude, v1[2]/magnitude]
    }

	initBuffers(slices, stacks) {

        this.vertices = []

        this.indices = []
        const stackStep = 2 * Math.PI / stacks;
        const sectorStep = Math.PI / slices;
        for(let i = 0; i <= stacks; i++){
            let stackAngle = Math.PI / 2 - i * stackStep;
            const xy = Math.cos(stackAngle)
            const z = Math.sin(stackAngle)

            for(let j = 0; j <= slices; j++){
                let sectorAngle = j * sectorStep
                const x = xy * Math.cos(sectorAngle)
                const y = xy * Math.sin(sectorAngle)
                this.vertices.push(x,y,z)
                //TODO(luisd): make UV and normals
            }
        }

        for(let i = 0; i < stacks; i++){
            let k1 = i * (slices + 1);
            let k2 = k1 + slices + 1;
            for(let j = 0; j < slices; j++, k1++, k2++){
                if(i != 0){
                    this.indices.push(k1, k2, k1 + 1)
                    this.indices.push(k1 + 1, k2, k1)
                }
                if(i != (stacks - 1)){
                    this.indices.push(k1+1, k2, k2+1)
                    this.indices.push(k2+1, k2, k1+1)
                }
            }
        }


		this.initGLBuffers();
	}
}