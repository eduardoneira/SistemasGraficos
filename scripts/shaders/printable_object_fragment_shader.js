// Printable Object Fragment Shader Configuration
const printable_object_fragment_shader = ` 
  precision mediump float;

  varying bool draw;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;
  uniform sampler2D uSampler;

  void main(void) {
    if (draw) {
      vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
      gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
    } else {
      gl_FragColor = vec4([255.0,255.0,255.0],1.0);
    }
  }
`;