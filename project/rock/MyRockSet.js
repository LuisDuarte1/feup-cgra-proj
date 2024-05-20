import { CGFobject, CGFscene } from "../../lib/CGF.js";
import { MyRock } from "./MyRock.js";


export class MyRockSet extends CGFobject{
    /**
     * @property {MyRock[]} rocks
     * @property {any[]} rockTransformations
     * @property {CGFscene} scene
    */

    /**
     * 
     * @param {CGFscene} scene 
     * @param {number} num_rocks 
     * @param {number} units Square of x by x units
     */
    constructor(scene, num_rocks, units){
        super(scene)
        this.rocks = []
        this.rockTransformations = []
        this.scene = scene
        this.buildRocks(scene, num_rocks, units)
    }

    /**
     * 
     * @param {number[][]} positions 
     * @param {number[]} new_pos
     * @returns {boolean}
     */
    checkIfPositionIsValid(positions, new_pos){
        const [new_x, new_y] = new_pos
        for(const [x,y] of positions){
            //detect collision by using distance between centers
            const distance = Math.pow(x-new_x, 2) + Math.pow(y-new_y, 2)
            if (distance <= 1) return false 
        }
        return true
    }

    /**
     * @param {CGFscene} scene 
     * @param {number} num_rocks 
     * @param {number} units
     */
    buildRocks(scene, num_rocks, units){
        //we assume that every rock occupies 1 squared unit (even though it's not always true)
        this.positions = []
        for(let i = 0; i < num_rocks; i++){
            this.rocks.push(new MyRock(scene, 14))

            //find position for each rock
            let tries = 0;
            let pos = [Math.random()*units, Math.random()*units]
            while(!this.checkIfPositionIsValid(this.positions, pos)){
                tries++
                if (tries == 10000){
                    throw Error("Couldn't find position for rock")
                }
                pos = [Math.random()*units, Math.random()*units]
            }

            this.positions.push(pos)
            this.rockTransformations.push({
                position: pos,
                scale: Math.min(Math.random() + 0.2, 1),
                rotation_y: Math.random() * 2 * Math.PI
            })
        }
    }

    display(){
        for(let i = 0; i < this.rocks.length; i++){
            this.scene.pushMatrix()
            const [x, z] = this.rockTransformations[i].position
            this.scene.translate(x,0,z)
            this.scene.rotate(this.rockTransformations[i].rotation_y, 0, 1, 0)
            const scale = this.rockTransformations[i].scale
            this.scene.scale(scale, scale, scale)
            this.rocks[i].display()
            this.scene.popMatrix()
        }
    }
}