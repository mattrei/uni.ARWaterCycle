//http://codepen.io/chribbe/full/19f4a710bd771da41bcc79b814341b8d
global.THREE = require('three')

import Scene from './Core/Scene';
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

    const container = document.getElementById('container');

    const video = document.createElement('video');
    container.appendChild(video);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      sortObjects: false
    });
    renderer.setSize(VIDEO_WIDHT, VIDEO_HEIGHT)
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, VIDEO_WIDHT / VIDEO_HEIGHT, 1, 1000)
    camera.position.set(0, 0, -10)
    camera.lookAt(new THREE.Vector3())
    //camera.matrixAutoUpdate = false;
    const controls = new OrbitControls(camera)

    var hdConstraints = {
      audio: false,
      video: {
        mandatory: {
          maxWidth: window.innerWidth,
          maxHeight: window.innerHeight
        }
      }
    };

    let arController = null

/*
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
        //camera.projectionMatrix.elements.set(cameraMatrix);
*/
        // Scene
        const scene = new Scene(renderer, camera, arController, video);
/*
      };

      cameraParameters.load('./camera_para.dat');

    }, e => {
      console.log("Can't access user media", e);
    });
    */

  }

}

export default App;
