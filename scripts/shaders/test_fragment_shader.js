// Test Fragment Shader Configuration
const test_fragment_shader = ` 
  precision mediump float;

  varying vec2 oTexCoords;
  varying vec3 oNormal;
  varying vec3 oToLight;
  varying vec3 oToCamera;
  // varying vec3 vLightWeighting;
  uniform sampler2D uSampler;

  //parameters of the light
  uniform vec3 uLightAmbientIntensities;
  uniform vec3 uLightDiffuseIntensities;
  uniform vec3 uLightSpecularIntensities;

  //parameters of the material
  uniform vec3 uMaterialAmbientRefl;
  uniform vec3 uMaterialDiffuseRefl;
  uniform vec3 uMaterialSpecularRefl;
  uniform float uMaterialShininess;

  ////////////////////////////////////////////////////////////////


  vec3 ambientLightning(){
    return uMaterialAmbientRefl * uLightAmbientIntensities;
  }

  vec3 diffuseLightning(in vec3 N, in vec3 L){
    //Lambertian reflection
    float diffuseTerm = dot(N, L);
    if(diffuseTerm < 0.0){
      diffuseTerm = 0.0;
    }
    if(diffuseTerm > 1.0){
      diffuseTerm = 1.0;
    }
    return uMaterialDiffuseRefl * uLightDiffuseIntensities * diffuseTerm;
  }

  void main(void) {

    vec3 L = normalize(oToLight);
    vec3 V = normalize(oToCamera);
    vec3 N = normalize(oNormal);

    vec3 Iamb = ambientLightning();

    vec4 textureColor = texture2D(uSampler, vec2(oTexCoords.s, oTexCoords.t));
    // gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
    // gl_FragColor = vec4(textureColor.rgb, textureColor.a);
    gl_FragColor = vec4(Iamb.rgb, textureColor.a);
  }
`;