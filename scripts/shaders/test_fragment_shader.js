// Test Fragment Shader Configuration
const test_fragment_shader = ` 
  precision mediump float;

  varying vec2 oTexCoords;
  varying vec3 oNormal;
  varying vec3 oToLight;
  varying vec3 oToCamera;
  // varying vec3 vLightWeighting;
  uniform sampler2D uSampler;

  void main(void) {
    vec4 textureColor = texture2D(uSampler, vec2(oTexCoords.s, oTexCoords.t));
    // gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
    // gl_FragColor = vec4(textureColor.rgb, textureColor.a);
    gl_FragColor = vec4(oToCamera.rgb, textureColor.a);
  }
`;