// Basic Vertex Shader configuration
const printable_object_vertex_shader = `
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

  uniform float uMaxY;
  uniform float uDeltaY;
  uniform float uMaxX;
  uniform float uDeltaX;
  uniform float uMaxZ;

  uniform float uStopPrinting;
  varying float vDraw;

  void main(void) {
    vec4 position_world = uMMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * uVMatrix * position_world;
    
    vTextureCoord = aTextureCoord;

    vDraw = uStopPrinting;

    if (aVertexPosition.y <= uMaxY || (aVertexPosition.y <= uMaxY + uDeltaY && (aVertexPosition.x <= uMaxX || (aVertexPosition.x <= uMaxX + uDeltaX && aVertexPosition.z <= uMaxZ )))) {
      vDraw = 1.0;
    }

    for (int i = 0; i < NUM_LIGHTS; i++) {
      vToLight[i] = uLightPositions[i] - vec3(position_world); 
    }

    vToCamera = normalize(uCameraPosition - vec3(position_world));
    vNormal = normalize(uNMatrix * aVertexNormal);
    vTangent = normalize(uNMatrix * aVertexTangent);
    vBinormal = normalize(uNMatrix * aVertexBinormal);
  }
`;