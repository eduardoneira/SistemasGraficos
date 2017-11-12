// Phong Fragment Shader Configuration
const phong_fragment_shader = `
  precision mediump float; 

  varying vec3 vNormal;
  varying vec3 vToLight[4];
  varying vec3 vToCamera;
  varying vec2 vTexCoords;

  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;

  uniform vec3 uLightAmbientIntensities;
  uniform vec3 uLightDiffuseIntensities;
  uniform vec3 uLightSpecularIntensities;

  uniform vec3 uMaterialAmbientRefl;
  uniform vec3 uMaterialDiffuseRefl;
  uniform vec3 uMaterialSpecularRefl;
  uniform float uMaterialShininess;

  vec3 ambientLightning(){
    return uMaterialAmbientRefl * uLightAmbientIntensities;
  }

  vec3 diffuseLightning(in vec3 N, in vec3 L){
    float diffuseTerm = clamp(dot(N, L), 0, 1);
    return uMaterialDiffuseRefl * uLightDiffuseIntensities * diffuseTerm;
  }

  vec3 specularLightning(in vec3 N, in vec3 L, in vec3 V){
    float specularTerm = 0.0;

    if(dot(N, L) > 0.0){
      vec3 H = normalize(L + V);
      specularTerm = pow(dot(N, H), uMaterialShininess);
    }

    return uMaterialSpecularRefl * uLightSpecularIntensities * specularTerm;
  }

  void main(void) {
    vec3 L[4];
    float D[4];

    for (int i = 0; i < 4; ++i) {
      D[i] = length(L[i]); 
      L[i] = normalize(vToLight);
    }

    vec3 V = normalize(vToCamera);
    vec3 N = normalize(vNormal);

    vec3 Iamb = ambientLightning();
    vec3 resultingLight = Iamb;

    for (int i = 0; i < 4; ++i) {
      vec3 Idiff = diffuseLightning(N, L[i]);
      vec3 Ispec = specularLightning(N, L[i], V);
      float decay = 1.0 + 2.0*D[i] + 4.0*D[i]*D[i];
      decay = 1.0 / decay;
      resultingLight = decay * (Idiff + Ispec);
    }

    vec4 textureColor = texture2D(uSampler, vec2(oTexCoords.s, oTexCoords.t));
    gl_FragColor = vec4(textureColor.rgb * resultingLight, 1.0);
  }
`;