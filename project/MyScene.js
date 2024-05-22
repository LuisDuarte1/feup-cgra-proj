import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture, CGFinterface } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./primitives/MyPlane.js";
import { MySphere } from "./primitives/MySphere.js";
import { MyRock } from "./rock/MyRock.js";
import { MyRockSet } from "./rock/MyRockSet.js";
import { MyRockPyramid } from "./rock/MyRockPyramid.js";
import { MyBee } from "./bee/MyBee.js";
import { MyAnimatedBee } from "./animation/MyAnimatedBee.js";
import { MyBigGrass } from "./MyBigGrass.js";
import { MyGarden } from "./flower/MyGarden.js";
import { MyPolen } from "./flower/MyPolen.js";
import { MyHive } from "./MyHive.js";
import { vec3Distance } from "./utils.js";

const NO_GROW_HIVE_RADIUS= 15
const GARDENS_COUNT = 10
const ROCK_SET_COUNT = 20

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {

  /**
   * 
   * @param {CGFinterface} myInterface 
   */
  constructor(myInterface) {
    super();
    this.myInterface = myInterface;
  }
  init(application) {
    super.init(application);

    this.globalFlowerList = [];
    
    this.initCameras();
    this.initLights();
    this.initMaterials();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    this.gl.depthFunc(this.gl.LEQUAL);

    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,15);
    this.sphere = new MySphere(this, 20, 20);
    this.sphereVisbility = false;
    this.grass = new MyBigGrass(this);

    this.rockSet = new MyRockSet(this, 10, 10)
    this.bee = new MyBee(this)
    this.beeVisibility = false
    
    this.hivePosition = [Math.random() * 50 - 25, 0, -Math.random() * 50]
    this.rockPyramid = new MyRockPyramid(this)
    this.hive = new MyHive(this)
    this.hive.basePosition = [this.hivePosition[0], (this.rockPyramid.maxHeight-0.5)*3, this.hivePosition[2]]
    const noGrowHiveRadius = 15
    // this.flower = new MyFlower(this, 5, 3, 0.06, this.darkStemAppearance, this.darkLeafAppearance, 1.5, 8, Math.PI/4, Math.PI/4, 0, this.blueInnerPetalAppearance, this.blueOuterPetalAppearance, 0.5, this.yellowReceptacleAppearance)
    // this.flowerVisibility = false;

    let flowerAppearances = [[this.purpleInnerPetalAppearance, this.purpleOuterPetalAppearance], [this.blueInnerPetalAppearance, this.blueOuterPetalAppearance], [this.orangeInnerPetalAppearance, this.orangeOuterPetalAppearance], [this.whiteInnerPetalAppearance, this.whiteOuterPetalAppearance]]
    let receptacleAppearances = [this.yellowReceptacleAppearance, this.greenReceptacleAppearance]
    let leafAppearances = [this.leafAppearance, this.darkLeafAppearance]
    let stemAppearances = [this.stemAppearance, this.darkStemAppearance]

    this.gardens = []
    for(let i = 0; i < GARDENS_COUNT; i++){
      let initalPos = [Math.random() * 200 - 100, 0, Math.random() * 200 - 100]
      while(true){
        if(vec3Distance(this.hivePosition, initalPos) <= NO_GROW_HIVE_RADIUS){
          initalPos = [Math.random() * 200 - 100, 0, Math.random() * 200 - 100]
          continue
        }
        let found = false;
        for(let garden of this.gardens){
          if(vec3Distance(initalPos, garden.obj.basePosition) <= 25){
            found = true
            break
          }
        }

        if(!found) break
        initalPos = [Math.random() * 200 - 100, 0, Math.random() * 200 - 100]
      }
      let garden = new MyGarden(this, 5, 5, flowerAppearances, stemAppearances, leafAppearances, receptacleAppearances, initalPos)
      this.gardens.push({obj: garden, pos: initalPos})
    }

    this.rockSets = []
    for(let i = 0; i < ROCK_SET_COUNT; i++){
      let initalPos = [Math.random() * 200 - 100, 0, Math.random() * 200 - 100]
      while(true){
        if(vec3Distance(this.hivePosition, initalPos) <= NO_GROW_HIVE_RADIUS){
          initalPos = [Math.random() * 200 - 100, 0, Math.random() * 200 - 100]
          continue
        }
        break
      }
      let rockSet = new MyRockSet(this, 10, 10)
      this.rockSets.push({obj: rockSet, pos: initalPos})
    }


    this.animatedBee = new MyAnimatedBee(this, [0, 3, 0])

   var beeAudio = new Audio('sounds/bee.mp3');
    beeAudio.loop = true;
    beeAudio.volume = 0.07;
    beeAudio.play();

    var ambientAudio = new Audio('sounds/background.mp3');
    ambientAudio.loop = true;
    ambientAudio.volume = 0.25;
    ambientAudio.play();

    this.updatePeriod = 30;
    this.setUpdatePeriod(this.updatePeriod);
    this.appStartTime = Date.now();
    this.animatedObjects = [this.animatedBee]
    this.animStartTimeSecs = 0;
    this.startY = 0;


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);


  }

  initLights() {
    this.setGlobalAmbientLight(0.6,0.6,0.6,1)
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(5, 5, 5),
      vec3.fromValues(0, 0, 0)
    );
  }

  initMaterials() {
    this.quadMaterial = new CGFappearance(this);
    this.quadMaterial.loadTexture('images/earth.jpg');
    this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.stemTex = new CGFtexture(this, "images/stem.png");
    this.stemAppearance = new CGFappearance(this);
    this.stemAppearance.setTexture(this.stemTex);
    this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.darkStemTex = new CGFtexture(this, "images/darkStem.png");
    this.darkStemAppearance = new CGFappearance(this);
    this.darkStemAppearance.setTexture(this.darkStemTex);
    this.darkStemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leafTex = new CGFtexture(this, "images/leaf.jpeg");
    this.leafAppearance = new CGFappearance(this);
    this.leafAppearance.setAmbient(1, 1, 1, 1);
    this.leafAppearance.setTexture(this.leafTex);
    this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.darkLeafTex = new CGFtexture(this, "images/darkLeaf.avif");
    this.darkLeafAppearance = new CGFappearance(this);
    this.darkLeafAppearance.setAmbient(1, 1, 1, 1);
    this.darkLeafAppearance.setTexture(this.darkLeafTex);
    this.darkLeafAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.purpleInnerPetalTex = new CGFtexture(this, "images/innerPetal.png");
    this.purpleInnerPetalAppearance = new CGFappearance(this);
    this.purpleInnerPetalAppearance.setAmbient(1, 1, 1, 1);
    this.purpleInnerPetalAppearance.setTexture(this.purpleInnerPetalTex);
    this.purpleInnerPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.purpleOuterPetalTex = new CGFtexture(this, "images/outerPetal.png");
    this.purpleOuterPetalAppearance = new CGFappearance(this);
    this.purpleOuterPetalAppearance.setAmbient(1, 1, 1, 1);
    this.purpleOuterPetalAppearance.setTexture(this.purpleOuterPetalTex);
    this.purpleOuterPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.blueInnerPetalTex = new CGFtexture(this, "images/blueInnerPetal.avif");
    this.blueInnerPetalAppearance = new CGFappearance(this);
    this.blueInnerPetalAppearance.setAmbient(1, 1, 1, 1);
    this.blueInnerPetalAppearance.setTexture(this.blueInnerPetalTex);
    this.blueInnerPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.blueOuterPetalTex = new CGFtexture(this, "images/blueOuterPetal.jpeg");
    this.blueOuterPetalAppearance = new CGFappearance(this);
    this.blueOuterPetalAppearance.setAmbient(1, 1, 1, 1);
    this.blueOuterPetalAppearance.setTexture(this.blueOuterPetalTex);
    this.blueOuterPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.orangeOuterPetalTex = new CGFtexture(this, "images/orangeOuterPetal.jpeg");
    this.orangeOuterPetalAppearance = new CGFappearance(this);
    this.orangeOuterPetalAppearance.setAmbient(1, 1, 1, 1);
    this.orangeOuterPetalAppearance.setTexture(this.orangeOuterPetalTex);
    this.orangeOuterPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.orangeInnerPetalTex = new CGFtexture(this, "images/orangeInnerPetal.avif");
    this.orangeInnerPetalAppearance = new CGFappearance(this);
    this.orangeInnerPetalAppearance.setAmbient(1, 1, 1, 1);
    this.orangeInnerPetalAppearance.setTexture(this.orangeInnerPetalTex);
    this.orangeInnerPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.whiteInnerPetalTex = new CGFtexture(this, "images/whiteInnerPetal.jpeg");
    this.whiteInnerPetalAppearance = new CGFappearance(this);
    this.whiteInnerPetalAppearance.setAmbient(1, 1, 1, 1);
    this.whiteInnerPetalAppearance.setTexture(this.whiteInnerPetalTex);
    this.whiteInnerPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.whiteOuterPetalTex = new CGFtexture(this, "images/whiteOuterPetal.jpeg");
    this.whiteOuterPetalAppearance = new CGFappearance(this);
    this.whiteOuterPetalAppearance.setAmbient(1, 1, 1, 1);
    this.whiteOuterPetalAppearance.setTexture(this.whiteOuterPetalTex);
    this.whiteOuterPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.yellowReceptacleTex = new CGFtexture(this, "images/receptacle.png");
    this.yellowReceptacleAppearance = new CGFappearance(this);
    this.yellowReceptacleAppearance.setAmbient(1, 1, 1, 1);
    this.yellowReceptacleAppearance.setTexture(this.yellowReceptacleTex);
    this.yellowReceptacleAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.greenReceptacleTex = new CGFtexture(this, "images/greenReceptacle.png");
    this.greenReceptacleAppearance = new CGFappearance(this);
    this.greenReceptacleAppearance.setAmbient(1, 1, 1, 1);
    this.greenReceptacleAppearance.setTexture(this.greenReceptacleTex);
    this.greenReceptacleAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.panoramaTexture = new CGFtexture(this, 'images/panorama.jpg')
    this.panorama = new MyPanorama(this, this.panoramaTexture)
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }


  update(t){
		let timeSinceAppStart = (t - this.appStartTime) / 1000.0;
    this.animatedBee.speedFactor = this.speedFactor;
    this.animatedBee.scaleFactor = this.scaleFactor;
		for (let i = 0; i < this.animatedObjects.length; i++)
			this.animatedObjects[i].update(timeSinceAppStart);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    let beePosition = this.animatedBee.position;

    // first pos means offset in curr bee direction, second pos means offset in Y in relation to the bee
    let [cameraOffsetDir, cameraOffsetY] = [-6, 2]

    let [directionX, directionZ] = [Math.cos(this.animatedBee.direction), Math.sin(this.animatedBee.direction)]

    let cameraPosition = [
      beePosition[0]+directionX*cameraOffsetDir,
      beePosition[1]+cameraOffsetY,
      beePosition[2]+directionZ*cameraOffsetDir,
    ]

    this.camera.setPosition(cameraPosition);
    this.camera.setTarget(beePosition);
    this.myInterface.updateCameraAngle();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.panorama.display();
    this.setDefaultAppearance()
    // Draw axis
    if (this.displayAxis) this.axis.display();
    // ---- BEGIN Primitive drawing section
    if(this.rockVisibility) this.rock.display()
    if(this.rockSetVisibility) this.rockSet.display()
    for(let garden of this.gardens){
      this.pushMatrix()
      this.translate(...garden.pos)
      garden.obj.display()
      this.popMatrix()
    }

    for(let rockSet of this.rockSets){
      this.pushMatrix()
      this.translate(...rockSet.pos)
      rockSet.obj.display()
      this.popMatrix()
    }
    ///bee hive
    this.pushMatrix()
      this.translate(...this.hivePosition)

      this.pushMatrix()
      this.scale(4,3,4)
      this.rockPyramid.display()
      this.popMatrix()

      this.pushMatrix()
      this.translate(0, (this.rockPyramid.maxHeight-0.5)*3 , 0)
      this.hive.display()
      this.popMatrix()
    this.popMatrix()
    // if(this.flowerVisibility) this.flower.display();
    if (this.beeVisibility) this.bee.display()
    if (this.beeThoraxVisibility) this.beeThorax.display()
    
    
    this.pushMatrix();
    this.translate(-50, 0, -50)
    this.grass.display();
    this.popMatrix();

    this.pushMatrix();
    this.appearance.apply();
    this.scale(400,1,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.animatedBee.display()
    // ---- END Primitive drawing section

  }
}
