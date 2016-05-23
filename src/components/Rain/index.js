import THREE from 'three';

import RainGeometry from './RainGeometry';
import RainMaterial from './RainMaterial';

/**
 * Cube class
 */
class Rain extends THREE.Points {

  /**
   * Constructor function
   */
  constructor(options) {
    super(new RainGeometry(),new RainMaterial({
      texture: options.texture
    }));

    this.isRaining = false

    this.position.x = -5
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update(time) {
    if (this.isRaining) {
      this.geometry.update(time)
      this.material.update(time)
    }
  }

  getMaterial() {
    return this.material
  }

  setRaining(raining) {
    this.isRaining = raining
    this.geometry.setRaining(raining)
  }
  getRaining() {
    return this.isRaining
  }
}

export default Rain;
