// Phong Fragment Shader Configuration
const phong_fragment_shader = `
  precision highp float; 
  const int NUM_LIGHTS = 4;

  varying vec2 vTextureCoord;
  varying vec3 vNormal;
  varying vec3 vTangent;
  varying vec3 vBinormal;
  varying vec3 vToCamera;
  varying vec3 vToLight[NUM_LIGHTS];
  uniform float uLightIntensities[NUM_LIGHTS];

  uniform sampler2D uSampler;
  uniform sampler2D uNormalMapSampler;

  uniform vec3 uLightAmbientIntensity;
  uniform vec3 uLightDiffuseIntensity;
  uniform vec3 uLightSpecularIntensity;

  uniform vec3 uMaterialAmbientRefl;
  uniform vec3 uMaterialDiffuseRefl;
  uniform vec3 uMaterialSpecularRefl;
  uniform float uMaterialShininess;

  vec3 ambientLightning() {
    return uMaterialAmbientRefl * uLightAmbientIntensity;
  }

  vec3 diffuseLightning(in vec3 N, in vec3 L) {
    float diffuseTerm = dot(N, L);
    
    if(diffuseTerm < 0.0){
      diffuseTerm = 0.0;
    }

    if(diffuseTerm > 1.0){
      diffuseTerm = 1.0;
    }

    return uMaterialDiffuseRefl * uLightDiffuseIntensity * diffuseTerm;
  }

  vec3 specularLightning(in vec3 N, in vec3 L, in vec3 V) {
    float specularTerm = 0.0;

    if(dot(N, L) > 0.0){
      vec3 H = normalize(L + V);
      specularTerm = pow(dot(N, H), uMaterialShininess);
    }

    return uMaterialSpecularRefl * uLightSpecularIntensity * specularTerm;
  }

  vec3 applyNormalMap(in vec3 N, in vec3 T, in vec3 B) {
    mat3 TBN = mat3(T,B,N);
    vec4 textureColor = texture2D(uNormalMapSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    vec3 colorRGB = (textureColor.rgb - vec3(0.5,0.5,0.5)) * 2.0;
    return normalize(TBN * colorRGB);     
  }

  void main(void) {
    vec3 L[NUM_LIGHTS];
    float D[NUM_LIGHTS];

    for (int i = 0; i < NUM_LIGHTS; i++) {
      D[i] = length(vToLight[i]); 
      L[i] = normalize(vToLight[i]);
    }

    vec3 V = normalize(vToCamera);
    vec3 N = applyNormalMap(normalize(vNormal), normalize(vTangent), normalize(vBinormal));

    vec3 resultingLight = ambientLightning();

    for (int i = 0; i < NUM_LIGHTS; i++) {
      vec3 Idiff = diffuseLightning(N, L[i]);
      vec3 Ispec = specularLightning(N, L[i], V);
      float decay = D[i]*D[i];
      decay = uLightIntensities[i] / decay;
      resultingLight += decay * (Idiff + Ispec);
    }

    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor = vec4(textureColor.rgb * resultingLight, 1.0);
  }
`;