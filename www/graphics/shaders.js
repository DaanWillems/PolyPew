const vsSource = `
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uColor;
varying highp vec3 vLighting;


void main() {
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;

  highp vec3 ambientLight = vec3(0.8, 0.8, 0.8);
  highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.5);
  highp vec3 directionalVector = normalize(vec3(0.25, 0.8, 0.7));

  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vLighting = uColor + (directionalLightColor * directional);
}
`;

const fsSource = `
varying highp vec3 vLighting;

void main() {
  gl_FragColor = vec4(vec3(1.0, 1.0, 1.0)*vLighting, 1.0);
}
`;

const vsToonSource = `
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uScaleMatrix;

void main() {
  float scaleFactor = 0.005;

  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  vec4 newPosition = (aVertexPosition+vec4(aVertexNormal, 1.0)*0.1);
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * uScaleMatrix * aVertexPosition;
}
`;

const fsToonSource = `

void main() {
  gl_FragColor = vec4(vec3(0.0, 0.0, 0.0), 1.0);
}
`;