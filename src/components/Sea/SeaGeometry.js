import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')

const SIZE_X = 10
const SIZE_Y = 20

/**
 * CubeGeometry class
 */
class SeaGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super( SIZE_X, SIZE_Y, SIZE_X, SIZE_Y );
    this.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))

  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

    const height = 0.5
    const positions = this.attributes.position.array

    for (let j=0; j < positions.length; j += 3) {
      positions[j + 1] = simplex.noise3D(positions[j+0]*0.5, positions[j+2]*0.5, time*0.1) * height
    }

    this.attributes.position.needsUpdate = true
  }
}

export default SeaGeometry;
