import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class MountainMaterial extends THREE.MeshStandardMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.shading = THREE.FlatShading
    this.transparent = true
    this.color = new THREE.Color(0xa99a9d)
    this.side = THREE.DoubleSide

  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

  }
}

export default MountainMaterial;
