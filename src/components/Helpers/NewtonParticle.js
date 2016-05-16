class NewtonParticle {
  constructor(args) {
    this.position = new THREE.Vector3()
    this.alpha = 1
    this.size = 1
    this.mass = 1
    this.isActive = true

    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
  }
  updatePosition() {
    this.position.add(this.velocity)
  }
  updateVelocity() {
    this.acceleration.divideScalar(this.mass);
    this.velocity.add(this.acceleration)
  }

  setVelocity(velocity) {
    this.velocity.copy(velocity)
  }

  setAcceleration(acceleration) {
    this.acceleration.copy(acceleration)
  }

  setPosition(position) {
    this.position.copy(position)
  }
  getPosition() {
    return this.position
  }
  getAlpha() {
    return this.alpha
  }
  setAlpha(a) {
    this.alpha = a
  }
  getSize() {
    return this.size
  }
  setSize(size) {
    this.size = size
  }
  getActive() {
    return this.isActive
  }
  setActive(active) {
    this.isActive = active
  }
}

export default NewtonParticle
