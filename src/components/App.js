//http://codepen.io/chribbe/full/19f4a710bd771da41bcc79b814341b8d
global.THREE = require('three')

import Scene from './Core/Scene'
import Storyline from './Core/Storyline'
const OrbitControls = require('three-orbit-controls')(THREE)


const VIDEO_WIDHT = 640
const VIDEO_HEIGHT = 480

/**
 * App class
 */
class App {

  /**
   * Begin function
   */
  static begin() {

    const container = document.getElementById('world');

    const video = document.createElement('video');
    video.id = "bgvideo"
    container.appendChild(video);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      sortObjects: false
    });
    renderer.setSize(VIDEO_WIDHT, VIDEO_HEIGHT)
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(43, VIDEO_WIDHT / VIDEO_HEIGHT, 1, 2000)
    //camera.lookAt(new THREE.Vector3(0,1,0))
    //camera.rotateZ(Math.PI)

    //const camera = new THREE.Camera()
      //camera.position.set(0, 0, -10)
      //camera.lookAt(new THREE.Vector3())
    camera.matrixAutoUpdate = false;
    //const controls = new OrbitControls(camera)

    var hdConstraints = {
      audio: false,
      video: {
        width: {
          min: VIDEO_WIDHT  //960
        },
        height: {
          min: VIDEO_HEIGHT  //720
        },
        optional: [{
          facingMode: "environment"
        }]
      }
    };

    const storyline = new Storyline()

    let arController = null

    navigator.getUserMedia(hdConstraints, stream => {

      video.src = window.URL.createObjectURL(stream);
      video.onclick = function() {
        video.play();
      };
      video.play();

      const cameraParameters = new ARCameraParam();
      cameraParameters.onload = function() {
        arController = new ARController(VIDEO_WIDHT, VIDEO_HEIGHT, cameraParameters);
        arController.debugSetup();

        renderer.setSize(VIDEO_WIDHT, VIDEO_HEIGHT);

        var cameraMatrix = arController.getCameraMatrix();
        camera.projectionMatrix.elements.set(cameraMatrix);

        const scene = new Scene(storyline, renderer, camera, arController, video);


      };

      cameraParameters.load('./camera_para.dat');

    }, e => {
      console.log("Can't access user media", e);
    });


  }

}

export default App;
