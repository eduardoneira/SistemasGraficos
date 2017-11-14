// Phong Vertex Shader configuration
const phong_vertex_shader = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec3 aVertexTangent;
  attribute vec3 aVertexBinormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uMMatrix;
  uniform mat4 uVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  const int NUM_LIGHTS = 4;
  uniform vec3 uLightPositions[NUM_LIGHTS];
  uniform vec3 uCameraPosition;

  varying vec3 vNormal;
  varying vec3 vTangent;
  varying vec3 vBinormal;
  varying vec3 vToCamera;
  varying vec3 vToLight[NUM_LIGHTS];
  varying vec2 vTextureCoord;

  void main(void) {
    vec4 position_world = uMMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * uVMatrix * position_world;
    
    vTextureCoord = aTextureCoord;

    for (int i = 0; i < NUM_LIGHTS; i++) {
      vToLight[i] = uLightPositions[i] - vec3(position_world); 
    }

    vToCamera = normalize(uCameraPosition - vec3(position_world));
    vNormal = normalize(uNMatrix * aVertexNormal);
    vTangent = normalize(uNMatrix * aVertexTangent);
    vBinormal = normalize(uNMatrix * aVertexBinormal);
  }
`;


















