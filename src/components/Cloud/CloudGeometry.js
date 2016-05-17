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

    this.seed = randomInt(1, 100)

    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i];
      vertex.x += simplex.noise3D(this.seed + vertex.y * 0.2, vertex.z * 0.1, 1)
      vertex.y += simplex.noise3D(this.seed + vertex.x * 0.1, vertex.z * 0.5, 1)
      vertex.z += simplex.noise3D(this.seed + vertex.x * 0.5, vertex.y * 0.1, 1)
    }

    this.computeFaceNormals();
    this.computeVertexNormals();
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update(time) {

    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i];
      vertex.x *= simplex.noise3D(this.seed + vertex.y * 0.2, vertex.z * 0.1, time * 0.01)
      vertex.y *= simplex.noise3D(this.seed + vertex.x * 0.1, vertex.z * 0.5, time * 0.01)
      vertex.z *= simplex.noise3D(this.seed + vertex.x * 0.5, vertex.y * 0.1, time * 0.01)
    }

  //  this.verticesNeedUpdate = true
  }
}

export default CloudGeometry;
