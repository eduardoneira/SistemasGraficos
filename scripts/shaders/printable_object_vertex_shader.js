// Basic Vertex Shader configuration
const printable_object_vertex_shader = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uVMMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;
  uniform vec3 uLightPosition;
  uniform vec3 uDirectionalColor;

  uniform float uMaxY;
  uniform float uDeltaY;
  uniform float uMaxX;
  uniform float uDeltaX;
  uniform float uMaxZ;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  varying float vDraw;

  void main(void) {
    vec4 pos_camera_view = uVMMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * pos_camera_view; 
    
    vTextureCoord = aTextureCoord;
    vDraw = 0.0;

    if (aVertexPosition.y <= uMaxY || (aVertexPosition.y <= uMaxY + uDeltaY && (aVertexPosition.x <= uMaxX || (aVertexPosition.x <= uMaxX + uDeltaX && aVertexPosition.z <= uMaxZ )))) {
      vDraw = 1.0;
    }

    vec3 light_dir =  uLightPosition - vec3(pos_camera_view);
    normalize(light_dir);
    vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
    float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
    vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  }
`;