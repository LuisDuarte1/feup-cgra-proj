export class MyAnimatedObject{
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

    sinFunction(x, amplitude = 1, frequency = 1){
        return amplitude * Math.sin(2*x*frequency);
    }
    display(){
        this.object.display();
    }
}