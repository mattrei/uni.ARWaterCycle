import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')

/**
 * CubeGeometry class
 */
class CloudGeometry extends THREE.TetrahedronGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super(1, 2)

    for (var i = 0; i < this.vertices.length; i++) {
      var vertex = this.vertices[i];
      vertex.x += simplex.noise2D(vertex.y * 0.2, vertex.z * 0.1)
      vertex.y += simplex.noise2D(vertex.x * 0.1, vertex.z * 0.5)
      vertex.z += simplex.noise2D(vertex.x * 0.5, vertex.y * 0.1)
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
