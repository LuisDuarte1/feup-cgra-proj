/**
 * MyAnimatedObject
 * 
 */
export class MyAnimatedObject{
    /**
     * 
     * @param {*} scene 
     * @param {*} object object to be animated
     * @param {*} start start position
     * @param {*} end end position
     * @param {*} startTime starting time
     * @param {*} duration duration of the animation
     */
    constructor(scene, object, start = 0, end = 1, startTime = 0, duration = Infinity){
        this.scene = scene;
        this.object = object;

        this.startPosition = start;
        this.endPosition = end;
        this.startTime = startTime;
        this.duration = duration;
        this.length = this.endPosition - this.startPosition;

        this.animPosition = this.startPosition;
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
    /**
     * Function to generate a sinusoidal wave for the animation
     * @param {*} x 
     * @param {*} amplitude 
     * @param {*} frequency 
     * @returns 
     */
    sinFunction(x, amplitude = 1, frequency = 1){
        return amplitude * Math.sin(2*x*frequency);
    }
    display(){
        this.object.display();
    }
}