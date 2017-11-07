// Phong Vertex Shader configuration
const phong_vertex_shader = `



  //atributes 

  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  //matrices

  uniform mat4 uVMMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;

  //position of light

  uniform vec3 uLightPosition;
  uniform vec3 uDirectionalColor;

  //position of camera

  uniform vec3 uCameraPosition;

  //data for fragment shader

  varying vec3 oNormal;
  varying vec3 oToLight;
  varying vec3 oToCamera;
  varying vec2 oTexCoords; //cambia mucho si uso out o varying?

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  void main(void) {
    vec4 pos_camera_view = uVMMatrix * vec4(aVertexPosition, 1.0); //world position
    gl_Position = uPMatrix * pos_camera_view; //view position (proyectada)
    
    vTextureCoord = aTextureCoord;
    oTexCoords = aTextureCoord; //es lo mismo o cambia el formato?


    //direction to light
    // oToLight = normalize(uLightPosition - vec3(pos_camera_view)); //tmb: pos_camera_view.xyz
    oToLight = normalize(uLightPosition - vec3(pos_camera_view)); //tmb: pos_camera_view.xyz

    //direction to camera
    oToCamera = normalize(uCameraPosition - vec3(pos_camera_view)); //(!) el handler tiene que obtener pos de camara

    oNormal = normalize(uNMatrix * aVertexNormal);

    // vec3 light_dir =  uLightPosition - vec3(pos_camera_view);
    // normalize(light_dir);
    // vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
    // float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
    // vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  }
`;


















