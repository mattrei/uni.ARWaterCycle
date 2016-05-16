#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)
#pragma glslify: PI = require('glsl-pi')

uniform float time;
uniform float speed;
uniform float height;

void main() {

  float displacement  =  pnoise3(.4 * position + vec3( 0, speed * time, 0 ), vec3( 100.0 ) ) * 1. * height;
  displacement       += pnoise3( 2. * position + vec3( 0, speed * time * 5., 0 ), vec3( 100. ) ) * .3 * height;


  vec3 newPosition = vec3(position.x,position.y, displacement + position.z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
