// Basic Vertex Shader configuration
const printable_object_vertex_shader = `
  float atan2(in float y, in float x) {
    return x == 0.0 ? sign(y)*3.1415926535897932384626433832795/2.0 : atan(y, x);
  }
  
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uVMMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;
  uniform vec3 uLightPosition;
  uniform vec3 uDirectionalColor;

  uniform float uMaxZ;
  uniform float uDeltaZ;
  uniform float uMaxAngle;
  uniform vec3  uPositionPrinter;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  void main(void) {
    vec4 pos_camera_view = uVMMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * pos_camera_view; 
    
    vTextureCoord = aTextureCoord;

    vec3 realPosition = aVertexPosition;

    vec3 ambientColor = vec3(0.0,0.0,0.0);
    vec3 directionalColor = vec3(0.0,0.0,0.0);

    if (realPosition.z <= uMaxZ || (realPosition.z <= uMaxZ + uDeltaZ && atan2(realPosition.y,realPosition.x) <= uMaxAngle)) {
      ambientColor = uAmbientColor;
      directionalColor = uDirectionalColor;
    }

    vec3 light_dir =  uLightPosition - vec3(pos_camera_view);
    normalize(light_dir);
    vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
    float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
    vLightWeighting = ambientColor + directionalColor * directionalLightWeighting;
  }
`;