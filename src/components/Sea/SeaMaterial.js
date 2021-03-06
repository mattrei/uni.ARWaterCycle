import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class SeaMaterial extends THREE.MeshStandardMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.side = THREE.DoubleSide
    //this.vertexColors = THREE.VertexColors
    this.transparent = true
    this.shading = THREE.FlatShading
    this.color = new THREE.Color(0x6092c1)
    this.opacity = 0.9


  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

  }
}

export default SeaMaterial;
