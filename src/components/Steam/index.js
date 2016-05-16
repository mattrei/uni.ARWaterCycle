import THREE from 'three';

import SteamGeometry from './SteamGeometry';
import SteamMaterial from './SteamMaterial';

/**
 * Cube class
 */
class Steam extends THREE.Points {

  /**
   * Constructor function
   */
  constructor() {
    super(new SteamGeometry(),new SteamMaterial({
      wireframe: false
    }));
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

export default Steam;
