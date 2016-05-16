import THREE from 'three';
import raf from 'raf-loop';
import Clock from '../Helpers/Clock';
import Cube from '../Cube';
import PostProcessing from '../PostProcessing/PostProcessing';

const VIDEO_WIDHT = 640
const VIDEO_HEIGHT = 480

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * Constructor function
   * @param {Renderer} Renderer Renderer instance
   * @param {Camera}   Camera   Camera instance
   */
  constructor(Renderer, Camera, arController, video) {
    super();

    this.raycaster = new THREE.Raycaster()

    this.renderer = Renderer;
    this.camera = Camera;
    this.arController = arController
    this.video = video

    this.clock = new Clock();


    this.objects = []

    this.createScene();

    document.addEventListener('mousedown', (e) => this.onDocumentMouseDown(e), false);
  }

  onDocumentMouseDown(event) {

    event.preventDefault()

    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / VIDEO_WIDHT) * 2 - 1;
    mouse.y = -(event.clientY / VIDEO_HEIGHT) * 2 + 1;

    console.log(mouse)

    this.raycaster.setFromCamera(mouse, this.camera)
    var intersects = this.raycaster.intersectObjects(this.objects);
    if (intersects.length > 0) {
      const SELECTED = intersects[0].object;
      console.log(SELECTED)
      /*
      var intersects = raycaster.intersectObject(plane);
      if (intersects.length > 0) {
        offset.copy(intersects[0].point).sub(plane.position);
      }
      container.style.cursor = 'move';
      */
    }
}

/**
 * CreateScene function
 */
createScene() {

  // create the marker Root
  this.markerRoot = new THREE.Object3D();
  this.markerRoot.markerMatrix = new Float64Array(12);
  this.markerRoot.matrixAutoUpdate = false;
  this.markerRoot.visible = false
  this.add(this.markerRoot);


  this.cube = new Cube();
  this.markerRoot.add(this.cube);


  this.objects.push( this.markerRoot )
  this.objects.push( this.cube )

  this.raf = raf(::this.render).start();
}

/**
 * Render function
 */
render() {

  this.cube.rotation.x += 0.01;
  this.cube.rotation.y += 0.02;

  this.cube.update(this.clock.time);


  this.updateAR()

  this.renderer.render(this, this.camera)
}

updateAR() {
  if (!this.arController) return;

  this.arController.detectMarker(this.video);
  this.arController.debugDraw();
  // update markerRoot with the found markers
  var markerNum = this.arController.getMarkerNum();
  if (markerNum > 0) {
    if (this.markerRoot.visible === false) {
      this.arController.getTransMatSquare(0 /* Marker index */ , 1 /* Marker width */ , this.markerRoot.markerMatrix);
    } else {
      this.arController.getTransMatSquareCont(0, 1, this.markerRoot.markerMatrix, this.markerRoot.markerMatrix);
    }
    this.arController.transMatToGLMat(this.markerRoot.markerMatrix, this.markerRoot.matrix.elements);
  }
  // objects visible IIF there is a marker
  if (markerNum > 0) {
    //console.log("vis " + markerNum)
    this.markerRoot.visible = true;
  } else {
    this.markerRoot.visible = false;
  }
}
}

export default Scene;
