// Global variables
var gl = null;
var canvas = null;

// Shaders
var basicShaderHandler = null;
var printableObjectShaderHandler = null;

// Global time variables
var time = 0;
var deltaTime = 10;

// Objects
// var scene = new Scene();  //Usar para la escene posta
var scene = null;
var camera = null;

function initShaders() {
  basicShaderHandler = new BasicShaderHandler(basic_vertex_shader,
                                              basic_fragment_shader);
  
  printableObjectShaderHandler = new PrintableObjectShaderHandler(printable_object_vertex_shader,
                                                                  printable_object_fragment_shader);
}

function initScene() {
  camera = new Camera();
  scene = new SceneRicky4();
}

function main() { 
  canvas = document.getElementById("my-canvas");  
  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");                   
  } catch(e) {}
                  
  if(gl) {
    setupWebGL();
    initShaders();
    loadAllTextures();
    initScene();
    tick();  
  }else {    
    alert("Error: Your browser does not appear to support WebGL.");
  }
}

function setupWebGL() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);    
  gl.enable(gl.DEPTH_TEST);
}

function tick() {
  requestAnimFrame(tick);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  time = time + 0.01;
  scene.draw();
}