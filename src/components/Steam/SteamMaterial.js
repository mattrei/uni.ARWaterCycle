import THREE from 'three';
const glslify = require('glslify');

/**
 * CubeMaterial class
 */
class SteamMaterial extends THREE.ShaderMaterial {

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

    const texture = this.createTexture()

    this.uniforms = {
      color: { type: 'c', value: new THREE.Color(0xffffff) },
      texture: { type: 't', value: texture }
    }
  }

  createTexture() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var grad = null;
    var texture = null;

    canvas.width = 200;
    canvas.height = 200;
    grad = ctx.createRadialGradient(100, 100, 20, 100, 100, 100);
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.arc(100, 100, 100, 0, Math.PI / 180, true);
    ctx.fill();

    texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

  }
}

export default SteamMaterial;
