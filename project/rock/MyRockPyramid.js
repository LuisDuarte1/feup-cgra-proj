import { CGFobject } from "../../lib/CGF.js";
import { MyRock } from "./MyRock.js";

/**
 * @property {CGFscene} scene
 */
export class MyRockPyramid extends CGFobject{
    /**
     * Builds a column of rocks at the given x and z coordinates.
     * The column is built up to the given minimum height.
     * Each rock is randomly rotated around the y-axis.
     *
     * @param {number} x - The x coordinate of the column.
     * @param {number} z - The z coordinate of the column.
     * @param {number} min_height - The minimum height of the column.
     */
    buildColumn(x,z,min_height){
        let curr_height = 0
        for(let i = 0; i < min_height; i++){
            const rock = new MyRock(this.scene, 18)
            this.rocks.push(rock)
            this.rockTransformations.push({
                position: [x,
                    i == 0 ? 0 : curr_height,
                    z],
                rotation_y: (Math.random()*2 - 1)*Math.PI/2
            })
            
            curr_height += rock.verticalRadius
        }
    }
    /**
     * Builds the rocks for the pyramid.
     */
    buildRocks(){
        this.buildColumn(0,0,4)

        this.buildColumn(0,1,3)
        this.buildColumn(0,-1,3)
        this.buildColumn(1,0,3)
        this.buildColumn(-1,0,3)

        this.buildColumn(-1,-1, 1)
        this.buildColumn(-1, 1, 1)
        this.buildColumn(1,  1, 1)
        this.buildColumn(1, -1, 1)
    }
    /**
     * Constructs a new rock pyramid object.
     * @param {*} scene 
     */
    constructor(scene){
        super(scene)
        this.rocks = []
        this.rockTransformations = []
        this.buildRocks()
    }

    display(){
        for(let i = 0; i < this.rocks.length; i++){
            this.scene.pushMatrix()
            const [x,y,z] = this.rockTransformations[i].position
            this.scene.translate(x,y,z)
            this.scene.rotate(this.rockTransformations[i].rotation_y, 0, 1, 0)
            this.rocks[i].display()
            this.scene.popMatrix()
        }
    }
}