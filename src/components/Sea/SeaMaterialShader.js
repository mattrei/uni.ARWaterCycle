import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class SeaMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.transparent = true
    this.opacity = 0.9
    this.side = THREE.DoubleSide

    this.vertexShader = glslify( './shader/vert.glsl' );
    this.fragmentShader = glslify( './shader/frag.glsl' );

    this.uniforms = {
      time: { type: 'f', value: 0.0 },
      height: { type: 'f', value: 1.0 },
      speed: { type: 'f', value: 1.0 },
      color: { type: 'c', value: new THREE.Color( 0x6092c1 ) }
    }
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.uniforms.time.value = time * 0.3;
  }
}

export default SeaMaterial;
