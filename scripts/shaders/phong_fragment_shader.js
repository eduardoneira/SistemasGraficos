// Phong Fragment Shader Configuration
const phong_fragment_shader = `#version 300

  precision mediump float; //???

  in vec3 oNormal;
  in vec3 oToLight;
  in vec3 oToCamera;
  in vec2 oTexCoords;

  varying vec2 vTextureCoord;
  uniform sampler2D uSampler; //diffuse texture

  varying vec4 resultingColor; //distinto de FragColor?

  ////////////////////////////////////////////////////////////////

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
    float diffuseTerm = clamp(dot(N, L), 0, 1);
    return uMaterialDiffuseRefl * uLightDiffuseIntensities * diffuseTerm;
  }

  vec3 specularLightning(in vec3 N, in vec3 L, in vec3 V){
    float specularTerm = 0;

    //calculate specular reflection only if
    //the surface is oriented to the light source

    if(dot(N, L) > 0){
      //half vector
      vec3 H = normalize(L + V); //(!) Probar que pasa si lo hago con Phong puro
      specularTerm = pow(dot(N, H), uMaterialShininess);
    }

    return uMaterialSpecularRefl * uLightSpecularIntensities * specularTerm;
  }

  void main(void) {

    //normalize vectors after interpolation (se supone que el mismo pipeline 
    // me interpolo las normales?)

    vec3 L = normalize(oToLight);
    vec3 V = normalize(oToCamera);
    vec3 N = normalize(oNormal);


    //get Blinn-Phong reflectance components
    float Iamb = ambientLightning();
    float Idiff = diffuseLightning(N, L);
    float Ispec = specularLightning(N, L, V);

    //diffuse color of the object from texture
    vec3 diffuseColor = texture(uSampler, oTexCoords).rgb;

    //combination of all components and diffuse color of the object
    resultingColor.xyz = diffuseColor * (Iamb + Idiff + Ispec);
    resultingColor.a = 1;

    gl_FragColor = vec4(resultingColor); //???


    // vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    // gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
  }
`;