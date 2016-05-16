import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class SeaMaterial extends THREE.MeshBasicMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.side = THREE.DoubleSide
    this.vertexColors = THREE.VertexColors
    this.transparent = true
    this.shading = THREE.FlatShading
    this.color = new THREE.Color(0xff00ff)

  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

  }
}

export default SeaMaterial;
