import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')

/**
 * CubeGeometry class
 */
class CloudGeometry extends THREE.SphereGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super(6 + Math.floor(Math.random() * 12), 8, 8);

    for (var i = 0; i < sphereGeom.vertices.length; i++) {
      var vertex = sphereGeom.vertices[i];
      vertex.y += random(-2, 2)
      vertex.x += random(-1.5, 1.5)
      vertex.z += random(-1.5, 1.5)
    }

    this.computeFaceNormals();
    this.computeVertexNormals();
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update(time) {



  }
}

export default CloudGeometry;
