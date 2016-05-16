import CloudGeometry from './CloudGeometry'
import CloudMaterial from './CloudMaterial'

const tweenr = require('tweenr')

class Cloud extends THREE.Mesh {

  /**
   * Constructor function
   */
  constructor() {
    super(new CloudGeometry(), new CloudMaterial({wireframe: false}))
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    //this.material.update( time );
  }

  grow() {

    // scale and rotation

  }
}

export default Cloud;
