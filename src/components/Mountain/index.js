import THREE from 'three'

import MountainGeometry from './MountainGeometry'
import MountainMaterial from './MountainMaterial'


class Mountain extends THREE.Mesh {

  /**
   * Constructor function
   */
  constructor() {
    super(new MountainGeometry(), new MountainMaterial({wireframe: false}))


    this.position.x -= 5
    this.position.y = 3
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    //this.material.update( time );
  }
}

export default Mountain;
