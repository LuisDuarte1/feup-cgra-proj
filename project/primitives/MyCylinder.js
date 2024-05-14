import {CGFobject} from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, top = [0,1,0]) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.top = top;
        this.x_offset = top[0];
        this.z_offset = top[2];
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = []
        this.indices = []
        this.normals = []
        this.texCoords = []

        let factor = 2 * Math.PI / this.slices
        let stack_height = 1 / (this.stacks)
        let x_stack = this.x_offset / this.stacks
        let z_stack = this.z_offset / this.stacks

        this.generateLateral(factor, stack_height, x_stack, z_stack);
        this.generateTopAndBottom(factor, x_stack, z_stack, stack_height);
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    generateLateral(factor, stack_height, x_stack, z_stack) {

        for(let i = 0; i < this.slices + 1; i++){
            for (let j = 0; j < this.stacks + 1; j++){
                let x = Math.cos(i * factor)
                let z = Math.sin(i * factor)
                this.vertices.push(x + j * x_stack, j * stack_height, z + j * z_stack)
                this.normals.push(x, 0, z)
                this.texCoords.push(i / this.slices, j / this.stacks)
            }
        }

        for (let i = 0; i < this.slices; i++){
            for (let j = 0; j < this.stacks; j++){
                this.indices.push(
                    i * (this.stacks + 1) + j, 
                    i * (this.stacks + 1) + j + 1, 
                    (i + 1) * (this.stacks + 1) + j, 
                    i * (this.stacks + 1) + j + 1, 
                    (i + 1) * (this.stacks + 1) + j + 1, 
                    (i + 1) * (this.stacks + 1) + j
                );
            }
        }
    }

    generateTopAndBottom(factor, x_stack, z_stack, stack_height) {
        stack_height += 1
        this.vertices.push(0, 0, 0, this.top[0], this.top[1], this.top[2])
        this.normals.push(0, -1, 0, 0, 1, 0)
        this.texCoords.push(0.5, 0.5, 0.5, 0.5)
        
        const base = (this.slices + 1) * (this.stacks + 1)

        for (let i = 0; i < this.slices + 1; i++){
            let x = Math.cos(i * factor)
            let z = Math.sin(i * factor)
            this.vertices.push(x, 0, z, x + x_stack * this.z_offset, 1, z + this.z_offset * z_stack)
            this.normals.push(0, -1, 0, 0, 1, 0)
            this.texCoords.push(0.5 + x / 2, 0.5 - z / 2, 0.5 + this.x_offset / 2, 0.5 - this.z_offset / 2)
        }

        // top base
        for (let i = 0; i < this.slices; i++){
            let a = i * stack_height + this.stacks
            const b = a + stack_height
            this.indices.push(base + 1, b, a)
        }  

        // bot base
        for (let i = 0; i < this.slices; i++){
            let a = i * stack_height
            let b = a + stack_height
            this.indices.push(base, a, b)
        } 
    }
}