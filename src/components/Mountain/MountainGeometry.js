import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')


const SIZE = 10
const HEIGHT = 10
/**
 * CubeGeometry class
 */
class MountainGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super( SIZE, SIZE, 8 + randomInt(0, 3), 8 + randomInt(0, 3) )
    this.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))



    const positions = this.attributes.position.array

    for (let i = 0, j=0; i < positions.length; i++, j += 3) {

      positions[j + 0] = random(5, 10)
      positions[j + 1] = simplex.noise3D(positions[j+0]*0.5, positions[j+2]*0.5) * height
      positions[j + 2] = random(5, 10)
    }

    this.attributes.position.needsUpdate = true

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

export default MountainGeometry;
