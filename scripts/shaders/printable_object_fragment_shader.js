// Printable Object Fragment Shader Configuration
const printable_object_fragment_shader = ` 
  precision mediump float;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;
  uniform sampler2D uSampler;

  varying float vDraw;

  void main(void) {
    if (vDraw > 0.0){
      vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
      gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
    } else {
      discard;
    }
  }
`;