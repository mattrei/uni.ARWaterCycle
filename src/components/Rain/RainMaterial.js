import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class RainMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    this.transparent = true,

    this.vertexShader = glslify( './shader/vert.glsl' );
    this.fragmentShader = glslify( './shader/frag.glsl' );

    this.transparent = true
    this.depthWrite = false
    this.blending = THREE.AdditiveBlending


    const loader = new THREE.ImageLoader()
    loader.load('imgs/raindrop.png', texture => {

      this.uniforms = {
        color: { type: 'c', value: new THREE.Color(0x0000ff) },
        texture: { type: 't', value: texture }
      }

    })
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

  }
}

export default RainMaterial;
