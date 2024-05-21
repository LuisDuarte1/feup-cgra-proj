import { MyAnimatedObject } from "./MyAnimatedObject.js";
import { MyBee } from "../bee/MyBee.js";

const DIRECTION_CHANGE = Math.PI / 6;
const XZ_ACCELERATION = 1;
const MAX_VELOCITY = 6;
const DRAG = 2.5;
const GRAVITY = 2;
const MAX_Y_VELOCITY = 2;
const Y_ACCELERATION = 0.5;

export class MyAnimatedBee extends MyAnimatedObject{


    constructor(scene, position = [0,0,0], start = 0, end = 1, startTime = 0, duration = Infinity){
        let bee = new MyBee(scene);
        super(scene, bee);
        this.position = position;
        this.initialPosition = position;
        this.direction = Math.PI;
        this.velocityXZ = 0;
        this.velocityY = 0;
        this.speedFactor = 1;
        this.scaleFactor = 1;
    }

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


    checkKeys(timeSinceAppStart){
        const deltaTime = timeSinceAppStart - this.lastFrame;
        let velocityChange = false;
        let verticalVelocityChange = false;
        if(this.scene.myInterface.isKeyPressed("KeyW")){
            this.velocityXZ = Math.min(MAX_VELOCITY*this.speedFactor, 
                this.velocityXZ+XZ_ACCELERATION*this.speedFactor*deltaTime);
            velocityChange = true;
        }
        if(this.scene.myInterface.isKeyPressed("KeyA")){
            this.direction -= DIRECTION_CHANGE*this.speedFactor*deltaTime;
        }
        if(this.scene.myInterface.isKeyPressed("KeyD")){
            this.direction += DIRECTION_CHANGE*this.speedFactor*deltaTime;
        }
        if(this.scene.myInterface.isKeyPressed("KeyS")){
            this.velocityXZ = Math.max(-MAX_VELOCITY*this.speedFactor, 
                this.velocityXZ-XZ_ACCELERATION*this.speedFactor*deltaTime);
            velocityChange = true;
        }

        if(this.scene.myInterface.isKeyPressed("Space")){
            this.velocityY = Math.max(MAX_Y_VELOCITY*this.speedFactor, 
                this.velocityY+Y_ACCELERATION*this.speedFactor*deltaTime);
            verticalVelocityChange = true;
        }

        if(this.scene.myInterface.isKeyPressed("KeyR")){
            this.velocityY = 0;
            this.velocityXZ = 0;
            this.direction = Math.PI;
            this.position = this.initialPosition;
            verticalVelocityChange = false;
            velocityChange = false;
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