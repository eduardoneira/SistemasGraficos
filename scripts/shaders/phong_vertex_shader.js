// Phong Vertex Shader configuration
const phong_vertex_shader = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uVMMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uCameraPosition;
  uniform vec3 uLightPositions[4];

  varying vec3 vNormal;
  varying vec3 vToCamera;
  varying vec3 vToLight[4];
  varying vec2 vTextureCoord;

  void main(void) {
    vec4 pos_camera_view = uVMMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * pos_camera_view;
    
    vTextureCoord = aTextureCoord;
    for (int i = 0; i < 4; ++i) {
      vToLight[i] = normalize(uLightPositions[i] - pos_camera_view); 
    }
    vToCamera = normalize(uCameraPosition - pos_camera_view);
    vNormal = normalize(uNMatrix * aVertexNormal);
  }
`;


















