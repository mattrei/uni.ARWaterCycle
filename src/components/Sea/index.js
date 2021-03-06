import THREE from 'three';

import SeaGeometry from './SeaGeometry';
import SeaMaterial from './SeaMaterial';
import SeaMaterialShader from './SeaMaterialShader';

/**
 * Cube class
 */
class Sea extends THREE.Mesh {

  /**
   * Constructor function
   */
  constructor() {
    super( new SeaGeometry(), new SeaMaterial({ wireframe: false }) );

    this.position.x += 4
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.geometry.update( time )
    this.material.update( time );
  }

  getMaterial() {
    return this.material
  }
}

export default Sea;
