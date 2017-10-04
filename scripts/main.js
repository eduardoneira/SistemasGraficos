// Global variables
var gl = null;
var canvas = null;

// Shaders
var basicShaderHandler = new BasicShaderHandler();

// Global time variables
var time = 0;
var deltaTime = 10;

// Objects
// var scene = new Scene();  //Usar para la escene posta
var scene = new TestScene();
var camera = new Camera();
var projector = new Projector();

function main() { 
  canvas = document.getElementById("my-canvas");  
  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");                   
  } catch(e) {}
                  
  if(gl) {
    setupWebGL();
    loadAllTextures();
    setInterval(drawScene, deltaTime);  
  }else {    
    alert("Error: Your browser does not appear to support WebGL.");
  }
}

function setupWebGL() {
  gl.clearColor(0.1, 0.1, 0.2, 1.0);     
  gl.enable(gl.DEPTH_TEST);                              
  gl.depthFunc(gl.LEQUAL); 
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 
  time = time + 0.01;
  scene.draw();
}