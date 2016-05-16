import THREE from 'three'

import Renderer from './Core/Renderer';
import Camera from './Core/Camera';
import Scene from './Core/Scene';


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
      antialias: true
    });
    container.appendChild(renderer.domElement);

    // Camera
    //const camera = new THREE.Camera() //Camera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const camera = new THREE.PerspectiveCamera(75, VIDEO_WIDHT, VIDEO_HEIGHT, 1, 10000);
    camera.matrixAutoUpdate = false;

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

    navigator.getUserMedia(hdConstraints, stream => {

      video.src = window.URL.createObjectURL(stream);
      video.onclick = function() {
        video.play();
      };
      video.play();

      const cameraParameters = new ARCameraParam();
      cameraParameters.onload = function() {
        arController = new ARController( VIDEO_WIDHT, VIDEO_HEIGHT, cameraParameters);
        arController.debugSetup();

        renderer.setSize( VIDEO_WIDHT, VIDEO_HEIGHT );

        var cameraMatrix = arController.getCameraMatrix();
        camera.projectionMatrix.elements.set(cameraMatrix);


        // Scene
        const scene = new Scene(renderer, camera, arController, video);
      };

      cameraParameters.load('./camera_para.dat');

    }, e => {
      console.log("Can't access user media", e);
    });

  }
}

export default App;
