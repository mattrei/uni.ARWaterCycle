import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')


const SIZE_X = 10
const SIZE_Y = 20
const HEIGHT = 2
  /**
   * CubeGeometry class
   */
class IslandGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super(SIZE_X, SIZE_Y, SIZE_X, SIZE_Y)
    this.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))

    const zeroVector = new THREE.Vector3();

    const positions = this.attributes.position.array

    for (let j = 0; j < positions.length; j += 3) {

      positions[j + 0] += random(-2, 2)
      positions[j + 1] = 0
      positions[j + 2] += random(-2, 2)

      const vector = new THREE.Vector3(
        positions[j + 0],
        positions[j + 1],
        positions[j + 2])

      const factor = (-vector.distanceTo(zeroVector) * 0.1) * HEIGHT
      positions[j + 1] += factor//simplex.noise3D(positions[j+0]*0.5, positions[j+2]*0.5) * HEIGHT
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

export default IslandGeometry;
