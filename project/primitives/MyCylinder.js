import {CGFobject} from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    /**
     * Constructs a new cylinder object.
     * @param {*} scene 
     * @param {*} slices - number of slices
     * @param {*} stacks - number of stacks
     * @param {*} top - coordinates of the top of the cylinder
     */
    constructor(scene, slices, stacks, top = [0,1,0]) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.top = top;
        this.x_offset = top[0];
        this.z_offset = top[2];
        this.initBuffers();
    }
    /**
     * Initializes the buffers for the cylinder.
     * It calculates the factors for the lateral surface and the top and bottom surfaces of the cylinder,
     * generates the vertices, indices, normals, and texture coordinates for these surfaces,
     * and initializes the WebGL buffers for the cylinder.
     */
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
    /**
     * Generates the vertices, normals, texture coordinates, and indices for the lateral surface of the cylinder.
     *
     * @param {number} factor - The factor for calculating the x and z coordinates of the vertices.
     * @param {number} stack_height - The height of each stack.
     * @param {number} x_stack - The x offset for each stack.
     * @param {number} z_stack - The z offset for each stack.
     */
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
                let a = (this.stacks + 1) * i + j
                let b = a + 1
                let c = (i + 1) * (this.stacks + 1) + j
                let d = c + 1
                this.indices.push(a, b, c, b, d, c)
            }
        }
    }
    /**
     * Generates the vertices, normals, texture coordinates, and indices for the top and bottom surfaces of the cylinder.
     * @param {*} factor 
     * @param {*} x_stack 
     * @param {*} z_stack 
     * @param {*} stack_height 
     */
    generateTopAndBottom(factor, x_stack, z_stack, stack_height) {
        stack_height = 1 + this.stacks
        this.vertices.push(0, 0, 0, this.top[0], this.top[1], this.top[2])
        this.normals.push(0, -1, 0, 0, 1, 0)
        this.texCoords.push(0.5, 0.5)
        
        const base = (this.slices + 1) * (this.stacks + 1)

        for (let i = 0; i < this.slices + 1; i++){
            let x = Math.cos(i * factor)
            let z = Math.sin(i * factor)
            this.vertices.push(x, 0, z, x + x_stack * this.z_offset, 1, z + this.z_offset * z_stack)
            this.normals.push(0, -1, 0, 0, 1, 0)
            this.texCoords.push(0.5, 0.5)
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