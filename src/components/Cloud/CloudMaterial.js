import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class CloudMaterial extends THREE.MeshStandardMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.shading = THREE.FlatShading
    this.transparent = true
    this.color = new THREE.Color(0xfae2c8)

  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.opacity = Math.sin(time*0.1)    
  }
}

export default CloudMaterial;
