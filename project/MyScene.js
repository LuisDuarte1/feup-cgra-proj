import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture, CGFinterface } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./primitives/MyPlane.js";
import { MySphere } from "./primitives/MySphere.js";
import { MyRock } from "./rock/MyRock.js";
import { MyRockSet } from "./rock/MyRockSet.js";
import { MyRockPyramid } from "./rock/MyRockPyramid.js";
import { MyBee } from "./bee/MyBee.js";
import { MyFlower } from "./flower/MyFlower.js";
import { MyAnimatedBee } from "./animation/MyAnimatedBee.js";
import { MyBeeThorax } from "./bee/MyBeeThorax.js";
import { MyBigGrass } from "./MyBigGrass.js";

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
    
    this.initCameras();
    this.initLights();

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
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 20, 20);
    this.sphereVisbility = false;
    this.grass = new MyBigGrass(this);


    this.stemTex = new CGFtexture(this, "images/stem.png");
    this.stemAppearance = new CGFappearance(this);
    this.stemAppearance.setTexture(this.stemTex);
    this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leafTex = new CGFtexture(this, "images/leaf.jpeg");
    this.leafAppearance = new CGFappearance(this);
    this.leafAppearance.setTexture(this.leafTex);
    this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.innerPetalTex = new CGFtexture(this, "images/innerPetal.png");
    this.innerPetalAppearance = new CGFappearance(this);
    this.innerPetalAppearance.setTexture(this.innerPetalTex);
    this.innerPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.outerPetalTex = new CGFtexture(this, "images/outerPetal.png");
    this.outerPetalAppearance = new CGFappearance(this);
    this.outerPetalAppearance.setTexture(this.outerPetalTex);
    this.outerPetalAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.receptacleTex = new CGFtexture(this, "images/receptacle.png");
    this.receptacleAppearance = new CGFappearance(this);
    this.receptacleAppearance.setTexture(this.receptacleTex);
    this.receptacleAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.panoramaTexture = new CGFtexture(this, 'images/panorama.jpg')
    this.panorama = new MyPanorama(this, this.panoramaTexture)

    this.rock = new MyRock(this)
    this.rockPyramid = new MyRockPyramid(this, 10, 10)
    this.rockSet = new MyRockSet(this, 10, 10)
    this.bee = new MyBee(this)
    this.beeVisibility = false

    this.rockVisibility = false
    this.rockPyramidVisibility = false
    this.rockSetVisibility = false

    this.flower = new MyFlower(this, 5, 3, 0.04, this.stemAppearance, this.leafAppearance, 1.5, 8, Math.PI/4, Math.PI/4, 0, this.innerPetalAppearance, this.outerPetalAppearance, 0.5, this.receptacleAppearance)
    this.flowerVisibility = false;

    this.beeThorax = new MyBeeThorax(this)
    this.beeThoraxVisibility = false

    this.animatedBee = new MyAnimatedBee(this, [0, 3, 0])

    this.updatePeriod = 30;
    this.setUpdatePeriod(this.updatePeriod);
    this.appStartTime = Date.now();
    this.animatedObjects = [this.animatedBee]
    this.animStartTimeSecs = 0;
    this.startY = 0;


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    //------ Applied Material
    this.quadMaterial = new CGFappearance(this);
    this.quadMaterial.loadTexture('images/earth.jpg');
    this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

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
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }


  update(t){
		let timeSinceAppStart = (t - this.appStartTime) / 1000.0;
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
    if(this.rockPyramidVisibility) this.rockPyramid.display()
    if(this.flowerVisibility) this.flower.display();
    if (this.beeVisibility) this.bee.display()
    if (this.beeThoraxVisibility) this.beeThorax.display()
    this.grass.display();
    
    this.animatedBee.display()
    
   
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    // ---- END Primitive drawing section

  }
}
