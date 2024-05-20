import { MyAnimatedObject } from "./MyAnimatedObject.js";
import { MyBee } from "../bee/MyBee.js";

export class MyAnimatedBee extends MyAnimatedObject{
    constructor(scene, position, start = 0, end = 1, startTime = 0, duration = Infinity){
        let bee = new MyBee(scene);
        super(scene, bee);
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
    update(timeSinceAppStart){
        let elapsedTimeSecs = timeSinceAppStart - this.startTime;
        this.idleAnim(elapsedTimeSecs);
        this.wingAnim(elapsedTimeSecs);
    }
    idleAnim(elapsedTimeSecs){
        if(elapsedTimeSecs >= 0 && elapsedTimeSecs <= this.duration){
            this.animPosition = this.sinFunction(Math.PI * elapsedTimeSecs, 0.05);
        }
    }
    wingAnim(elapsedTimeSecs){
        if(elapsedTimeSecs >= 0 && elapsedTimeSecs <= this.duration){
            this.object.thorax.frontWing.wingAngle = this.sinFunction(elapsedTimeSecs, 0.2,5.3);
            this.object.thorax.backWing.wingAngle = this.sinFunction(elapsedTimeSecs, 0.2,-5.3);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,this.animPosition,0);
        super.display();
        this.scene.popMatrix();
    }
}