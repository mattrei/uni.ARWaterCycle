import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')

import Mover from '../Helpers/Mover'

const NUM_MOVERS = 50

/**
 * CubeGeometry class
 */
class SteamGeometry extends THREE.BufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super();

    this.gravity = new THREE.Vector3(0, 0.1, 0)

    this.movers = []
    this.points = new THREE.Object3D()

    this.positions = new Float32Array(NUM_MOVERS * 3)
    this.colors = new Float32Array(NUM_MOVERS * 3)
    this.opacities = new Float32Array(NUM_MOVERS)
    this.sizes = new Float32Array(NUM_MOVERS)

    for (var i = 0; i < NUM_MOVERS; i++) {

      const mover = new Mover()

      var h = randomInt(0, 45);
      var s = randomInt(60, 90);
      var color = new THREE.Color('hsl(' + h + ', ' + s + '%, 50%)');

      mover.init(new THREE.Vector3(randomInt(-10, 10), 0, 0));
      mover.is_active = true
      mover.a = 1

      this.movers.push(mover);
      this.positions[i * 3 + 0] = mover.position.x;
      this.positions[i * 3 + 1] = mover.position.y;
      this.positions[i * 3 + 2] = mover.position.z;
      color.toArray(this.colors, i * 3);

      this.opacities[i] = mover.a;
      this.sizes[i] = mover.size;
    }

    this.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.addAttribute('customColor', new THREE.BufferAttribute(this.colors, 3));
    this.addAttribute('vertexOpacity', new THREE.BufferAttribute(this.opacities, 1));
    this.addAttribute('size', new THREE.BufferAttribute(this.sizes, 1));
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update(time) {

    this.updateMover()

    this.attributes.position.needsUpdate = true;
    this.attributes.vertexOpacity.needsUpdate = true;
    this.attributes.size.needsUpdate = true;
    this.attributes.customColor.needsUpdate = true;
  }

  updateMover() {


     for (var i = 0; i < this.movers.length; i++) {
       var mover = this.movers[i];
       if (mover.is_active) {
         mover.time++;
         mover.applyForce(this.gravity);
         mover.applyDrag(0.01);
         mover.updateVelocity();
         mover.updatePosition();
         mover.position.sub(this.points.position);
         if (mover.time > 50) {
           mover.size -= 0.7;
           mover.a -= 0.009;
         }
         if (mover.a <= 0) {
           mover.init(new THREE.Vector3(0, 0, 0));
           mover.time = 0;
           mover.a = 0.0;
           mover.inactivate();
         }
       }
       this.positions[i * 3 + 0] = mover.position.x - this.points.position.x;
       this.positions[i * 3 + 1] = mover.position.y - this.points.position.y;
       this.positions[i * 3 + 2] = mover.position.z - this.points.position.z;
       this.opacities[i] = mover.a;
       this.sizes[i] = mover.size;
     }
   }
}

export default SteamGeometry;
