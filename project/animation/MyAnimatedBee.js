import { MyAnimatedObject } from "./MyAnimatedObject.js";
import { MyBee } from "../bee/MyBee.js";
import { MyScene } from "../MyScene.js";
import { MyFlower } from "../flower/MyFlower.js";
import { vec3Distance, vec3Magnitude } from "../utils.js";

const DIRECTION_CHANGE = Math.PI / 6;
const XZ_ACCELERATION = 1;
const MAX_VELOCITY = 6;
const DRAG = 2.5;
const GRAVITY = 2;
const MAX_Y_VELOCITY = 2;
const Y_ACCELERATION = 0.5;
const TARGET_POS_NORMAL_MULTIPLIER = 1;
const AUTO_ROTATION_STEP = Math.PI/2;
const AUTO_VELOCITY = 2;

export class MyAnimatedBee extends MyAnimatedObject{

    /**
     * 
     * @param {MyScene} scene 
     * @param {*} position 
     * @param {*} start 
     * @param {*} end 
     * @param {*} startTime 
     * @param {*} duration 
     */
    constructor(scene, position = [0,0,0], start = 0, end = 1, startTime = 0, duration = Infinity){
        let bee = new MyBee(scene);
        super(scene, bee);
        this.scene = scene;
        this.position = position;
        this.initialPosition = position;
        this.direction = Math.PI;
        this.velocityXZ = 0;
        this.savedVelocityXZ = 0;
        this.savedHeight = 0;
        this.savedDirection = 0;
        this.velocityY = 0;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.auto = false;
        this.stateAuto = "";
        this.stateTargetPos = [0,0,0];
        this.targetFlower = null;
    }
    /**
     * 
     * @param {number} x 
     * @returns 
     */
    tween(x)
    {
        // https://easings.net
        // https://easings.net/#easeInElastic
        const c4 = (2 * Math.PI) / 3;
        
        return x === 0
            ? 0
            : x === 1
            ? 1
            : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);        
    }

    sinFunction(x, amplitude = 1, frequency = 1){
        return amplitude * Math.sin(2*x*frequency);
    }

    lastFrame = 0;

    /**
     * 
     * @returns {MyFlower}
     */
    findNearestFlower(){
        const sortFunc = (a, b) => {
            return vec3Distance(this.position, a.getPolenWorldPosition().pos) -
                vec3Distance(this.position, b.getPolenWorldPosition().pos)
        }

        let nearestFlowers = this.scene.globalFlowerList.toSorted(sortFunc)
        nearestFlowers = nearestFlowers.filter((val) => val.polen != null)
        

        console.log(
            "Nearest flower distance: " + 
            vec3Distance(this.position, nearestFlowers[0].getPolenWorldPosition().pos)
        )
        console.log(
            "Nearest flower polen pos: " + nearestFlowers[0].getPolenWorldPosition().pos
        )

        return nearestFlowers[0];
    }

    autoMove(deltaTime){
        if(this.stateAuto == "rotateToPolen"){
            const directionVector = [-Math.cos(this.direction), -Math.sin(this.direction)]
            
            const toDirectionVector = [
                this.position[0] - this.stateTargetPos[0],
                this.position[2] - this.stateTargetPos[2]
            ]

            const sameSign = -Math.sin(this.savedDirection) * toDirectionVector[1] > 0

            const finalDirection = Math.acos(
                (directionVector[0]*toDirectionVector[0] + directionVector[1]*toDirectionVector[1])
                /
                (
                    Math.sqrt(directionVector[0]*directionVector[0] + directionVector[1]*directionVector[1])
                    *
                    Math.sqrt(toDirectionVector[0]*toDirectionVector[0] + toDirectionVector[1]*toDirectionVector[1])
                )
            )

            if(isNaN(finalDirection)){
                this.stateAuto = "moveToPolen"
                return
            }
            console.log(finalDirection)
            
            if(Math.abs(finalDirection) >= 0.0001){

                this.direction += 
                    Math.abs(finalDirection) >= AUTO_ROTATION_STEP*deltaTime ? (sameSign ? -1 : 1)*AUTO_ROTATION_STEP*deltaTime : (sameSign ? -1 : 1) * finalDirection
            } else {
                this.stateAuto = "moveToPolen"
            }
        }
        else if (this.stateAuto == "moveToPolen"){
            const toDirectionVector = [
                this.position[0] - this.stateTargetPos[0], 
                this.position[1] - this.stateTargetPos[1], 
                this.position[2] - this.stateTargetPos[2]
            ]

            const toDirectionVectorNormalized = [
                toDirectionVector[0] / vec3Magnitude(toDirectionVector),
                toDirectionVector[1] / vec3Magnitude(toDirectionVector),
                toDirectionVector[2] / vec3Magnitude(toDirectionVector),
            ]

            const steps = Math.abs(this.position[0]-this.stateTargetPos[0])/toDirectionVectorNormalized[0]

            if(Math.abs(steps) <= 0.5){
                this.stateAuto = "paused"
                return
            }

            this.position = [
                this.position[0] - toDirectionVectorNormalized[0]*this.savedVelocityXZ*deltaTime, 
                this.position[1] - toDirectionVectorNormalized[1]*this.savedVelocityXZ*deltaTime,
                this.position[2] - toDirectionVectorNormalized[2]*this.savedVelocityXZ*deltaTime,
            ]
        }
        else if(this.stateAuto == "restoreHeight"){
            const heightDiff = this.savedHeight - this.position[1];
            if(heightDiff == 0){
                this.beforeDirection = this.direction;
                this.stateAuto = "restoreDirection"
                return
            }
            this.position = [
                this.position[0],
                this.position[1] + (heightDiff >= AUTO_VELOCITY*deltaTime 
                    ? AUTO_VELOCITY*deltaTime : heightDiff),
                this.position[2],
            ]
        }
        else if(this.stateAuto == "restoreDirection"){
            const directionVector = [-Math.cos(this.direction), -Math.sin(this.direction)]
            
            const toDirectionVector = [
                -Math.cos(this.savedDirection), -Math.sin(this.savedDirection)
            ]

            const sameSign = -Math.sin(this.beforeDirection) * toDirectionVector[1] > 0


            const finalDirection = Math.acos(
                (directionVector[0]*toDirectionVector[0] + directionVector[1]*toDirectionVector[1])
                /
                (
                    Math.sqrt(directionVector[0]*directionVector[0] + directionVector[1]*directionVector[1])
                    *
                    Math.sqrt(toDirectionVector[0]*toDirectionVector[0] + toDirectionVector[1]*toDirectionVector[1])
                )
            )

            if(isNaN(finalDirection)){
                this.velocityXZ = this.savedVelocityXZ;
                this.stateAuto = ""
                this.stateTargetPos = [0,0,0]
                this.auto = false
                this.savedDirection = 0;
                this.savedHeight = 0;
                this.savedVelocityXZ = 0;
                return
            }
            
            if(Math.abs(finalDirection) >= 0.00001){

                this.direction += 
                    Math.abs(finalDirection) >= AUTO_ROTATION_STEP*deltaTime ? (sameSign ? -1 : 1)*AUTO_ROTATION_STEP*deltaTime : (sameSign ? -1 : 1) * finalDirection

            } else {
                this.velocityXZ = this.savedVelocityXZ; 
                this.stateAuto = ""
                this.stateTargetPos = [0,0,0]
                this.auto = false
                this.savedDirection = 0;
                this.savedHeight = 0;
                this.savedVelocityXZ = 0;
            }

        }
    }


    checkKeys(timeSinceAppStart){
        const deltaTime = timeSinceAppStart - this.lastFrame;
        let velocityChange = false;
        let verticalVelocityChange = false;

        if(this.scene.myInterface.isKeyPressed("KeyW") && !this.auto){
            this.velocityXZ = Math.min(MAX_VELOCITY*this.speedFactor, 
                this.velocityXZ+XZ_ACCELERATION*this.speedFactor*deltaTime);
            velocityChange = true;
        }
        if(this.scene.myInterface.isKeyPressed("KeyA") && !this.auto){
            this.direction -= DIRECTION_CHANGE*this.speedFactor*deltaTime;
        }
        if(this.scene.myInterface.isKeyPressed("KeyD") && !this.auto){
            this.direction += DIRECTION_CHANGE*this.speedFactor*deltaTime;
        }
        if(this.scene.myInterface.isKeyPressed("KeyS") && !this.auto){
            this.velocityXZ = Math.max(-MAX_VELOCITY*this.speedFactor, 
                this.velocityXZ-XZ_ACCELERATION*this.speedFactor*deltaTime);
            velocityChange = true;
        }

        if(this.scene.myInterface.isKeyPressed("Space") && !this.auto){
            this.velocityY = Math.max(MAX_Y_VELOCITY*this.speedFactor, 
                this.velocityY+Y_ACCELERATION*this.speedFactor*deltaTime);
            verticalVelocityChange = true;
        }

        if(this.scene.myInterface.isKeyPressed("KeyR") && !this.auto){
            this.velocityY = 0;
            this.velocityXZ = 0;
            this.direction = Math.PI;
            this.position = this.initialPosition;
            verticalVelocityChange = false;
            velocityChange = false;
        }

        if(this.scene.myInterface.isKeyPressed("KeyF") && !this.auto && !this.object.polen){
            const flower = this.findNearestFlower()
            if(flower == null) return
            this.savedVelocityXZ = this.velocityXZ;
            this.savedHeight = this.position[1];
            this.targetFlower = flower
            this.savedDirection = this.direction;
            const polenPos = flower.getPolenWorldPosition();
            this.stateTargetPos = [
                polenPos.pos[0] + TARGET_POS_NORMAL_MULTIPLIER*polenPos.normal[0],
                polenPos.pos[1] + TARGET_POS_NORMAL_MULTIPLIER*polenPos.normal[1],
                polenPos.pos[2] + TARGET_POS_NORMAL_MULTIPLIER*polenPos.normal[2],
            ]
            this.auto = true;
            this.velocityY = 0;
            this.velocityXZ = 0;
            this.stateAuto = "rotateToPolen"
        }

        if(this.scene.myInterface.isKeyPressed("KeyP") && this.auto 
            && this.stateAuto=="paused" && !this.object.polen){
            const polen = this.targetFlower.polen
            this.targetFlower.polen = null;
            this.object.polen = polen
            
            this.stateAuto = "restoreHeight"
        }

        

        if(this.auto){
            //if on auto, do not apply gravity, or drag calculations
            velocityChange = true;
            verticalVelocityChange = true;
            this.autoMove(deltaTime)
        }

        if(!velocityChange){
            if(this.velocityXZ > 0){
                this.velocityXZ = Math.max(0, this.velocityXZ-DRAG*this.speedFactor*deltaTime)
            }
            else if(this.velocityXZ < 0){
                this.velocityXZ = Math.min(0, this.velocityXZ+DRAG*this.speedFactor*deltaTime)

            }
        }

        if(!verticalVelocityChange){
            this.velocityY -= GRAVITY*this.speedFactor*deltaTime
        }

        //apply velocity changes
        this.position = [
            this.position[0] + Math.cos(this.direction)*this.velocityXZ*deltaTime, 
            Math.min(Math.max(0.6, this.position[1] + this.velocityY*deltaTime), 25),
            this.position[2] + Math.sin(this.direction)*this.velocityXZ*deltaTime,
        ]
      }

    update(timeSinceAppStart){
        let elapsedTimeSecs = timeSinceAppStart - this.startTime;
        this.idleAnim(elapsedTimeSecs);
        this.wingAnim(elapsedTimeSecs);
        this.checkKeys(timeSinceAppStart)
        this.lastFrame = timeSinceAppStart;
    }
    idleAnim(elapsedTimeSecs){
        if(elapsedTimeSecs >= 0 && elapsedTimeSecs <= this.duration){
            this.animPosition = this.sinFunction(Math.PI * elapsedTimeSecs, 0.05);
        }
    }
    wingAnim(elapsedTimeSecs){
        if(elapsedTimeSecs >= 0 && elapsedTimeSecs <= this.duration){
            this.object.thorax.frontWing.wingAngle = this.sinFunction(elapsedTimeSecs, 0.2,6);
            this.object.thorax.backWing.wingAngle = this.sinFunction(elapsedTimeSecs, 0.2,-6.3);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.translate(0,this.animPosition,0);
        this.scene.rotate(Math.PI - this.direction, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        super.display();
        this.scene.popMatrix();
    }
}