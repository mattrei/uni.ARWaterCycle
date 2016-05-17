global.THREE = require('three')
import raf from 'raf-loop';
import Clock from '../Helpers/Clock';
import Cube from '../Cube';
import Sea from '../Sea'
import Steam from '../Steam'
import Cloud from '../Cloud'
import Mountain from '../Mountain'
import Island from '../Island'
import Rain from '../Rain'

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

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xb3858c, 0.65);
    this.add(hemiLight)


    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( SCENE_WIDTH, -SCENE_HEIGHT, 1 );
    //dirLight.position.multiplyScalar( 50 );
    this.add( dirLight );

  }

  /**
   * CreateScene function
   */
  createScene() {


    var gridHelper = new THREE.GridHelper( 10, 1);
    //this.add( gridHelper);
    var axisHelper = new THREE.AxisHelper( 50 );
    //this.add( axisHelper );
    //this.add(new THREE.CameraHelper(this.camera))

    // create the marker Root
    this.markerRoot = new THREE.Object3D();
    this.markerRoot.markerMatrix = new Float64Array(12);
    this.markerRoot.matrixAutoUpdate = false;
    this.markerRoot.visible = false
    this.add(this.markerRoot);

    const marker = this.markerRoot//this// this.markerRoot // this

    const root = new THREE.Object3D()
    marker.add(root)
    //root.rotation.x = Math.PI
    root.rotation.z = -Math.PI*0.5
    root.rotation.y = -Math.PI*0.3


    this.cube = new Cube();
//    root.add(this.cube);

    this.sea = new Sea()
    root.add(this.sea)


    this.steam = new Steam()
    root.add(this.steam)


    const loader = new THREE.ImageLoader()
    loader.load('./imgs/raindrop.png', texture => {
      this.rain = new Rain({texture: texture})
      root.add(this.rain)
    })

    this.cloud = new Cloud()
    root.add(this.cloud)
    //this.cloud.grow(0.1, 4)

    this.mountain = new Mountain()
    root.add(this.mountain)


    this.island = new Island()
    root.add(this.island)

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

    this.updateScene()
    this.updateAR()

    this.renderer.render(this, this.camera)
  }

  updateScene() {
    this.cube.update ( this.clock.time)
    this.sea.update(this.clock.time)
    this.steam.update(this.clock.time)
    if (this.rain) this.rain.update(this.clock.time)
    this.cloud.update(this.clock.time)
  }

  updateAR() {
    const MARKER_IDX = 0,
      MARKER_WIDTH = 1// war 0

    if (!this.arController) return;

    this.arController.detectMarker(this.video);
    this.arController.debugDraw();
    // update markerRoot with the found markers
    var markerNum = this.arController.getMarkerNum();
    if (markerNum > 0) {
      if (this.markerRoot.visible === false) {
        this.arController.getTransMatSquare(MARKER_IDX /* Marker index */ , MARKER_WIDTH /* Marker width */ , this.markerRoot.markerMatrix);
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
