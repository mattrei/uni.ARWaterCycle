import THREE from 'three'

import MountainGeometry from './IslandGeometry'
import MountainMaterial from './IslandMaterial'

const HEIGHT = 2

class Island extends THREE.Mesh {

  /**
   * Constructor function
   */
  constructor() {
    super(new MountainGeometry(), new MountainMaterial({wireframe: false}))

    this.position.x -= 4
    this.position.y += 1
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    //this.material.update( time );
  }
}

export default Island;
