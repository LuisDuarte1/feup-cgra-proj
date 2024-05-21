import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, nRows, nCols, flowerAppearances, stemAppearances, leafAppearances, receptacleAppearances, basePosition=[0,0,0]) {
        super(scene);
        this.nRows = nRows;
        this.nCols = nCols;
        this.flowerAppearances = flowerAppearances;
        this.stemAppearances = stemAppearances;
        this.leafAppearances = leafAppearances;
        this.receptacleAppearances = receptacleAppearances;
        this.basePosition = basePosition;
        this.initGarden();
    }
    initGarden(){
        this.flowerPositions = [];
        this.flowers = [];
        for (let i = 0; i < this.nRows; i++){
            this.flowers.push([]);
            for (let j = 0; j < this.nCols; j++){
                const numCylinders = Math.floor(Math.random() * (7 - 3) + 3);
                const height = Math.random() * (5 - 3) + 3;
                const radius = Math.random() * (0.09 - 0.03) + 0.03;
                const corollaRadius = Math.random() * (3.5 - 1.5) + 1.5;
                const petalAngle = Math.random() * (- 30 * Math.PI/180 + 20 * Math.PI/180) + 20 * Math.PI/180;
                const maxAngle = Math.random() * 0.5 + 0.2;
                const minAngle = Math.random() * 0.5 + 0.2;
                const receptacleRadius = corollaRadius / 2.5;
                const numPetals = Math.floor(Math.random() * (8-6) + 6);
                
                let flowerIndex = Math.floor(Math.random() * this.flowerAppearances.length);
                const innerPetalColor = this.flowerAppearances[flowerIndex][0];
                const outerPetalColor = this.flowerAppearances[flowerIndex][1];
                let stemIndex = Math.floor(Math.random() * this.stemAppearances.length);
                let leafIndex = Math.floor(Math.random() * this.leafAppearances.length);
                let receptacleIndex = Math.floor(Math.random() * this.receptacleAppearances.length);
                let stemAppearance = this.stemAppearances[stemIndex];
                let leafAppearance = this.leafAppearances[leafIndex];
                let receptacleAppearance = this.receptacleAppearances[receptacleIndex];

                let x = (i * 4) + Math.random() * 3;
                let z = (j * 4) + Math.random() * 3;

                let flower = new MyFlower(this.scene, numCylinders, height, radius, 
                    stemAppearance, leafAppearance, corollaRadius, numPetals, petalAngle, maxAngle, 
                    minAngle, innerPetalColor, outerPetalColor, receptacleRadius, receptacleAppearance, 
                    Math.random()*2*Math.PI, [this.basePosition[0]+x,this.basePosition[1],this.basePosition[2]+z]);
                this.flowers[i].push(flower);
                this.flowerPositions.push({x: x, z: z});
            }
        }
    }
    display(){
        for (let i = 0; i < this.flowerPositions.length; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.flowerPositions[i].x, 0, this.flowerPositions[i].z);
            this.flowers[Math.floor(this.flowerPositions[i].x / 4)][Math.floor(this.flowerPositions[i].z /4)].display();
            this.scene.popMatrix();
        }
    }
}
