import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyPetal } from "./MyPetal.js";
import { MyStem } from "./MyStem.js";
import { MySphere } from "./MySphere.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyRockPyramid } from "./MyRockPyramid.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyFlower } from "./MyFlower.js";
import { MyCorolla } from "./MyCorolla.js";
import { MyCylinder } from "./primitives/MyCylinder.js";
import { MyLeaf } from "./MyLeaf.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
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
    this.gl.depthFunc(this.gl.LEQUAL);

    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.petal = new MyPetal(this, Math.PI/4, 1);
    this.petalVisibility = false;
    this.corolla = new MyCorolla(this);
    this.corollaVisibility = false;
    this.receptacle = new MyReceptacle(this, 20, 20);
    this.receptacleVisibility = false;
    this.sphere = new MySphere(this, 20, 20);
    this.sphereVisbility = false;


    this.stemTex = new CGFtexture(this, "images/stem.png");
    this.stemAppearance = new CGFappearance(this);
    this.stemAppearance.setTexture(this.stemTex);
    this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leafTex = new CGFtexture(this, "images/leaf.jpeg");
    this.leafAppearance = new CGFappearance(this);
    this.leafAppearance.setTexture(this.leafTex);
    this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');
    

    this.panoramaTexture = new CGFtexture(this, 'images/panorama.jpg')
    this.panorama = new MyPanorama(this, this.panoramaTexture)

    this.leaf = new MyLeaf(this, this.leafAppearance);
    this.leafVisibility = false;

    this.rock = new MyRock(this)
    this.rockPyramid = new MyRockPyramid(this, 10, 10)
    this.rockSet = new MyRockSet(this, 10, 10)
    this.rockVisibility = false
    this.rockPyramidVisibility = false
    this.rockSetVisibility = false

    this.stem = new MyStem(this, 5, 3, 1, 0.2, 0.03, this.stemAppearance, this.leafAppearance)
    this.stemVisibility = false;

    this.flower = new MyFlower(this, 5, 3, 0.04, this.stemAppearance, this.leafAppearance, 1.5, 8, Math.PI/4, Math.PI/4, 0, [1, 0, 0], 0.5, [1, 1, 0])
    this.flowerVisibility = true;

    //Objects connected to MyInterface
    this.displayAxis = false;
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
  
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
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
    if(this.receptacleVisibility) this.receptacle.display();
    if(this.flowerVisibility) this.flower.display();
    if(this.petalVisibility) this.petal.display();
    if(this.corollaVisibility) this.corolla.display();
    if(this.stemVisibility) this.stem.display();
    if(this.leafVisibility) this.leaf.display();
   
    
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
