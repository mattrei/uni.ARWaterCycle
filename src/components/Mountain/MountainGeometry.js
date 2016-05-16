import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')


const SIZE = 4
const HEIGHT = 5
  /**
   * CubeGeometry class
   */
class MountainGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super(SIZE, SIZE, 8, 8)
    this.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))

    const zeroVector = new THREE.Vector3();

    const positions = this.attributes.position.array

    for (let j = 0; j < positions.length; j += 3) {

      positions[j + 0] = random(5, 10)
      positions[j + 2] = random(5, 10)

      const vector = new THREE.Vector3(
        positions[j + 0],
        positions[j + 1],
        positions[j + 2])

      console.log(vector)
      console.log(vector.distanceTo(zeroVector))

      const factor = Math.abs(vector.distanceTo(zeroVector))



      positions[j + 1] = factor//factor // + random(1, 4)//simplex.noise3D(positions[j+0]*0.5, positions[j+2]*0.5) * HEIGHT

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
