global.THREE = require('three')
import raf from 'raf-loop';
import Clock from '../Helpers/Clock';
import Cube from '../Cube';
import Sea from '../Sea'
import Steam from '../Steam'
import Cloud from '../Cloud'
import Mountain from '../Mountain'
import Island from '../Island'

/*
import {
  textAlign,
  Text2D
} from 'three-text2d'
*/

// from origin point - and +
const SCENE_WIDTH = 5
const SCENE_HEIGHT = 5

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

    this.createScene()
    this.createLight()
    //this.createDemoText()

    //document.addEventListener('mousedown', (e) => this.onDocumentMouseDown(e), false);
  }

  onDocumentMouseDown(event) {

    event.preventDefault()

    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / VIDEO_WIDHT) * 2 - 1;
    mouse.y = -(event.clientY / VIDEO_HEIGHT) * 2 + 1;

    this.raycaster.setFromCamera(mouse, this.camera)
    var intersects = this.raycaster.intersectObjects(this.objects);
    if (intersects.length > 0) {
      const SELECTED = intersects[0].object;
      console.log(SELECTED)
      SELECTED.scale.multiplyScalar(1.2)

    }
  }

  createLight() {

    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( SCENE_WIDTH, SCENE_HEIGHT, 1 );
    				//dirLight.position.multiplyScalar( 50 );
    				this.add( dirLight );


    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xb3858c, .65);
    this.add(hemiLight)

  }

  /**
   * CreateScene function
   */
  createScene() {


    var gridHelper = new THREE.GridHelper( 10, 1);
    this.add( gridHelper);
    var axisHelper = new THREE.AxisHelper( 50 );
    this.add( axisHelper );
    this.add(new THREE.CameraHelper(this.camera))

    // create the marker Root
    this.markerRoot = new THREE.Object3D();
    this.markerRoot.markerMatrix = new Float64Array(12);
    this.markerRoot.matrixAutoUpdate = false;
    this.markerRoot.visible = false
    this.add(this.markerRoot);


    this.cube = new Cube();
    //this.markerRoot.add(this.cube);
  //  this.add(this.cube)
  //  this.cube.position.set(new THREE.Vector3(1, 1,1))


    this.sea = new Sea()
    //this.markerRoot.add(this.sea)
    this.add(this.sea)

    this.steam = new Steam()
    //this.markerRoot.add(this.steam)
    //this.add(this.steam)

    this.cloud = new Cloud()
    //this.markerRoot.add(this.cloud)
    this.add(this.cloud)
    this.cloud.position.x = SCENE_WIDTH
    this.cloud.position.y = SCENE_HEIGHT
    this.cloud.grow(0.1, 4)

    this.mountain = new Mountain()
    this.add(this.mountain)

    this.island = new Island()
    this.add(this.island)

    //this.objects.push(this.sea)
    //this.objects.push(this.steam)
    //this.objects.push(this.cube)

    this.raf = raf(::this.render).start();
  }


  createDemoText() {

    var loader = new THREE.FontLoader();
    const fontName = 'helvetiker',
      fontWeight = 'regular'

    const text = 'CLICKED ME!',
      size = 0.5

    loader.load('../fonts/' + fontName + '_' + fontWeight + '.typeface.js', (font) => {

      /*
          const textGeo = new THREE.TextGeometry( text, {
        					font: font,
        					size: size
        				});
        				//textGeo.computeBoundingBox();
        				//textGeo.computeVertexNormals();

          const material = new THREE.MeshNormalMaterial()

          const textMesh = new THREE.Mesh( textGeo, material );

          this.markerRoot.add(textMesh)
          */

/*
      var text = new Text2D("RIGHT", {
        align: new THREE.Vector2(-1, 0),
        font: '30px Arial',
        fillStyle: '#000000',
        antialias: true
      })
      this.markerRoot.add(text)
      */
    })
  }

  /**
   * Render function
   */
  render() {

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.02;

    this.cube.update ( this.clock.time)
    this.sea.update(this.clock.time)
    this.steam.update(this.clock.time)


    //this.updateAR()

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
      this.markerRoot.visible = true;
    } else {
      this.markerRoot.visible = false;
    }
  }
}

export default Scene;
