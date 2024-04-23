import {CGFobject} from '../../lib/CGF.js';


export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.initBuffers(slices, stacks);
	}

    replaceVertex(src, index, dest){
        dest[index*3] = src[0]
        dest[index*3+1] = src[1]
        dest[index*3+2] = src[2]
    }

    normalize(v1){
        const magnitude = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1] +v1[2]*v1[2])
        return [v1[0]/magnitude, v1[1]/magnitude, v1[2]/magnitude]
    }
	
	initBuffers(slices, stacks) {
        const factor = 2*Math.PI/slices

        let face_vertices = [0,0,0]

        for(let i = 0; i < 2*Math.PI;  i += factor){
            face_vertices.push(Math.cos(i), Math.sin(i), 0)
        }
        face_vertices = face_vertices.slice(0, (slices+1)*3)
        

        let face_indices = []

        for(let i = 0; i < slices-1; i++){
            face_indices.push(0, i+1, i+2)
        }
        face_indices.push(0,slices, 1)
        console.log(face_indices)

		this.vertices = [
            ...face_vertices,
            ...face_vertices.map((value, index, _) => {
                if ((index+1) % 3 == 0)
                    return 1
                return value
            })
		];


		//Counter-clockwise reference of vertices
		this.indices = [
            ...[...face_indices].reverse(),
            ...face_indices.map((value) => value + slices + 1)
		];

        this.normals = [
        ]
        
        for(let i= 0; i < slices+1; i++){
            this.normals.push(0,0,-1)
        }
        for(let i= 0; i < slices+1; i++){
            this.normals.push(0,0,1)
        }

        for(let i = 0; i < stacks; i++){
            const right_face = face_vertices.slice(3).map((value, index, _) => {
                if ((index+1) % 3 == 0)
                    return i/stacks
                return value
            })
            const left_face  = face_vertices.slice(3).map((value, index, _) => {
                if ((index+1) % 3 == 0)
                    return (i+1)/stacks
                return value
            })

            this.vertices.push(
                ...right_face,
                ...left_face,
            )

            //we pre-fill the normals with zero to make it the normal fill easier
            this.normals.push(...Array(right_face.length*2).fill(0))

            for (let j = 0; j < slices; j++){
                const faceVerticesCount = (slices+1)*2
                const normal = this.normalize([Math.cos(factor*j), Math.sin(factor*j), 0])
                this.indices.push(faceVerticesCount+slices*(i*2) + j)
                this.indices.push(faceVerticesCount+slices*(i*2) + ((1 + j) % slices))
                this.indices.push(faceVerticesCount+slices*(i*2+1) + ((1 + j) % slices))
                
                this.indices.push(faceVerticesCount+slices*(i*2+1) + ((1 + j) % slices))
                this.indices.push(faceVerticesCount+slices*(i*2+1) + j)
                this.indices.push(faceVerticesCount+slices*(i*2) + j)

                this.replaceVertex(normal, faceVerticesCount+slices*(i*2) + j, this.normals)
                this.replaceVertex(normal, faceVerticesCount+slices*(i*2+1) + j, this.normals)

            }

        }
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
        console.log(this.vertices.length, this.normals.length)

		this.initGLBuffers();
	}
}

