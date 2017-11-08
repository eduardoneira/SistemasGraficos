// Phong Fragment Shader Configuration
const phong_fragment_shader = `

  precision mediump float; //???

  varying vec3 oNormal;
  varying vec3 oToLight;
  varying vec3 oToCamera;
  varying vec2 oTexCoords;

  // varying vec2 vTextureCoord;
  uniform sampler2D uSampler; //diffuse texture

  // varying vec4 resultingColor; //distinto de FragColor?

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
    float diffuseTerm = dot(N, L);
    if(diffuseTerm < 0.0){
      diffuseTerm = 0.0;
    }
    if(diffuseTerm > 1.0){
      diffuseTerm = 1.0;
    }
    return uMaterialDiffuseRefl * uLightDiffuseIntensities * diffuseTerm;
  }

  vec3 specularLightning(in vec3 N, in vec3 L, in vec3 V){
    float specularTerm = 0.0;

    //calculate specular reflection only if
    //the surface is oriented to the light source

    if(dot(N, L) > 0.0){
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
    vec3 Iamb = ambientLightning();
    vec3 Idiff = diffuseLightning(N, L);
    vec3 Ispec = specularLightning(N, L, V);

    //diffuse color of the object from texture
    // vec3 diffuseColor = texture(uSampler, oTexCoords).rgb;
    vec4 textureColor = texture2D(uSampler, vec2(oTexCoords.s, oTexCoords.t));

    //combination of all components and diffuse color of the object
    // resultingColor.xyz = vec3(textureColor) * (Iamb + Idiff + Ispec);
    // resultingColor.a = 1.0;

    vec3 resultingColor = vec3(textureColor) * (Iamb + Idiff + Ispec);
    // float red = textureColor.r * (Iamb.r + Idiff.r + Ispec.r);
    // float green = textureColor.g * (Iamb.g + Idiff.g + Ispec.g);
    // float blue = textureColor.b * (Iamb.b + Idiff.b + Ispec.b);

    // gl_FragColor = vec4(vec3(textureColor)* (Iamb + Idiff + Ispec), 1.0);
    
    gl_FragColor = vec4(resultingColor.rgb, 1.0);
    // gl_FragColor = vec4(red, green, blue, 1.0);

    // gl_FragColor = vec4(resultingColor); //???


    // vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    // gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
  }
`;