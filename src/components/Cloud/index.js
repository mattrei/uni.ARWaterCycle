import THREE from 'three'

import CloudGeometry from './CloudGeometry'
import CloudMaterial from './CloudMaterial'

const tweenr = require('tweenr')()

class Cloud extends THREE.Mesh {

  /**
   * Constructor function
   */
  constructor() {
    super(new CloudGeometry(), new CloudMaterial({wireframe: false}))
    //this.scale.set(new THREE.Vector3(1, 1, 1))
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    //this.material.update( time );
  }

  grow(factor, duration) {

    
    const origScale = new THREE.Vector3()
    origScale.copy(this.scale)

    tweenr.to(this.scale, {
      x: origScale.x * factor,
      y: origScale.y * factor,
      z: origScale.z * factor,
      duration: duration
    })
  }
}

export default Cloud;
