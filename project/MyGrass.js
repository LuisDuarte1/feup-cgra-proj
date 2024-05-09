import { CGFobject, CGFscene, CGFshader } from "../lib/CGF.js";


const BLADE_HEIGHT = 1.3;
const BLADE_HEIGHT_VARIATION = 0.6;
const BLADE_WIDTH = 0.1;
const BLADE_COUNT = 1;
const PLANE_RADIUS = 30;



export class MyGrass extends CGFobject{
    static shader = null;
    /**
     * 
     * @param {CGFscene} scene 
     * @param {number} bladeCount
     * @param {number} radius 
     * @param {number} yPos 
     */
    constructor(scene, radius=25, bladeCount=13000, yPos=0){
        super(scene)
        this.scene = scene
        this.bladeCount = bladeCount
        this.radius = radius
        this.yPos = yPos
        this.time = 0;
        if(!MyGrass.shader){
            MyGrass.shader = new CGFshader(this.scene.gl, "shaders/grass/grass_vert.glsl", "shaders/grass/grass_frag.glsl")
        }
        this.generateField()
    }

    initColorBuffer(){
        var gl = this.scene.gl;
        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.colors),
            gl.STATIC_DRAW
        )
        // unbind buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    drawElements(primitiveType){
        MyGrass.shader.setUniformsValues({"uTime": this.time})
        var shader = MyGrass.shader;
        var gl = this.scene.gl;
        // update matrices on shader
        gl.uniformMatrix4fv(
          shader.uniforms.uMVMatrix,
          false,
          this.scene.getMatrix()
        );

        gl.uniformMatrix4fv(
            shader.uniforms.uPMatrix,
            false,
            this.scene.getProjectionMatrix()
          );

        gl.enableVertexAttribArray(shader.attributes.aVertexPosition);
        // bind the vertices buffer the active array buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertsBuffer);
        // assign the active buffer to the shader's vertex position attribute
        gl.vertexAttribPointer(
            shader.attributes.aVertexPosition,
            3,
            gl.FLOAT,
            false,
            0,
            0
        )

        gl.enableVertexAttribArray(shader.attributes.aColor);
        // bind the vertices buffer the active array buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        // assign the active buffer to the shader's vertex position attribute
        gl.vertexAttribPointer(
            shader.attributes.aColor,
            3,
            gl.FLOAT,
            false,
            0,
            0
        )

        // bind the indices buffer to the active ELEMENT array buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        // do the actual drawing, using the specified wireframe mode, and indicating the number of indices to be processed
        gl.drawElements(
            primitiveType,
            this.indicesBuffer.numValues,
            gl.UNSIGNED_SHORT,
            0
        );
        // unbind buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        this.time += 1
    }

    generateField(){
        this.vertices = []
        this.indices = []
        this.colors = []
        for(let i = 0; i < this.bladeCount; i++){
            const x = Math.random() * this.radius;
            const z = Math.random() * this.radius;
            const blade = this.generateBlade([x,this.yPos,z], i*5)
            this.vertices.push(...blade.vertices)
            this.indices.push(...blade.indices)
            this.colors.push(...blade.colors)
        }
        this.initGLBuffers()
        this.initColorBuffer()
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