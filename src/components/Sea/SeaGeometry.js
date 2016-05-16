import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')

/**
 * CubeGeometry class
 */
class SeaGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super( 10, 5, 10, 5 );
    this.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2))
    /*
    const positions = this.attributes.position.array
    for (let i = 0, j=0; i < positions.length; i++, j += 3) {
      positions[j + 0] = positions[j + 1] = positions[j + 2] = 0
    }
    */
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

    const positions = this.attributes.position.array

    for (let i = 0, j=0; i < positions.length; i++, j += 3) {
      positions[j + 0] = simplex.noise3D(positions[j+1], positions[j+2], time)
      positions[j + 1] = simplex.noise3D(positions[j+0], positions[j+1], time)
      positions[j + 2] = simplex.noise3D(positions[j+0], positions[j+1], time)
    }

    this.attributes.position.needsUpdate = true

  }
}

export default SeaGeometry;
