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

    //this.position.y = 5
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update(time) {
    this.geometry.update(time)
    this.material.update(time)
  }

  getMaterial() {
    return this.material
  }
}

export default Rain;
