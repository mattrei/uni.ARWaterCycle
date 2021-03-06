import THREE from 'three';
const simplex = new(require('simplex-noise'))
const random = require('random-float')
const randomInt = require('random-int')

import NewtonParticle from '../Helpers/NewtonParticle'

const NUM_MOVERS = 10
const MAX_HEIGHT = 4

/**
 * CubeGeometry class
 */
class SteamGeometry extends THREE.BufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super();

    this.gravity = new THREE.Vector3(0, 0.0001, 0)

    this.particles = []
    this.points = new THREE.Object3D()

    this.positions = new Float32Array(NUM_MOVERS * 3)
    this.colors = new Float32Array(NUM_MOVERS * 3)
    this.opacities = new Float32Array(NUM_MOVERS)
    this.sizes = new Float32Array(NUM_MOVERS)

    for (var i = 0; i < NUM_MOVERS; i++) {

      const mover = new NewtonParticle()

      var h = randomInt(0, 45);
      var s = randomInt(60, 90);
      var color = new THREE.Color('hsl(' + h + ', ' + s + '%, 50%)');
      color.setHSL((180+Math.random()*40)/360, 1.0, 0.5 + Math.random() * 0.2);

      mover.setPosition(this.getInitialPosition())
      mover.setVelocity(this.getInitialVelocity())
      mover.setAcceleration(this.getInitialAcceleration())
      mover.setSize(random(0.1, 1))

      this.particles.push(mover);
      this.positions[i * 3 + 0] = mover.getPosition().x;
      this.positions[i * 3 + 1] = mover.getPosition().y;
      this.positions[i * 3 + 2] = mover.getPosition().z;
      color.toArray(this.colors, i * 3);

      this.opacities[i] = mover.getAlpha()
      this.sizes[i] = mover.getSize()
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

  getInitialPosition() {
    return new THREE.Vector3(random(2, 5), 0, random(-1, 1))
  }

  getInitialVelocity() {
    const vel = new THREE.Vector3(random(-0.01, 0.01), random(0.001, 0.01), random(-0.01, 0.01))
    vel.divideScalar(10)
    return vel
  }

  getInitialAcceleration() {
    const accel = new THREE.Vector3(0, random(0.2, 0.4), 0)
    accel.divideScalar(1000)
    return accel
  }

  updateMover() {


     for (var i = 0; i < this.particles.length; i++) {
       var mover = this.particles[i];
       if (mover.getActive()) {

         mover.updateVelocity();
         mover.updatePosition();
         mover.getPosition().sub(this.points.position);

         this.positions[i * 3 + 0] = mover.getPosition().x - this.points.position.x;
         this.positions[i * 3 + 1] = mover.getPosition().y - this.points.position.y;
         this.positions[i * 3 + 2] = mover.getPosition().z - this.points.position.z;
         this.opacities[i] = mover.getAlpha()
         this.sizes[i] = mover.getSize()

         if (mover.getPosition().y >= MAX_HEIGHT) {
           mover.setPosition(this.getInitialPosition())
           mover.setVelocity(this.getInitialVelocity())
           mover.setAcceleration(this.getInitialAcceleration())
         }
       }
     }
   }

}

export default SteamGeometry;
