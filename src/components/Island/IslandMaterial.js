import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class IslandMaterial extends THREE.MeshStandardMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.shading = THREE.FlatShading
    this.transparent = true
    this.color = new THREE.Color(0x9bb345)
    this.side = THREE.DoubleSide

  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

  }
}

export default IslandMaterial;
