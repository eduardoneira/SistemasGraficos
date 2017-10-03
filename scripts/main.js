// Global variables
var gl = null;
var canvas = null;

// Global time variables
var time = 0.0;
var deltaTime = 10;

// Objects
var scene = new Scene();
var camera = new Camera();

// Shaders
var basicShaderHandler = new BasicShaderHandler();

//TODO: Move this to scene?
var vMatrix = mat4.create();
var pMatrix = mat4.create();


function initWebGL() { 
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
  var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
  mat4.perspective(pMatrix, 45, canvas.width/canvas.height, 0.1, 100.0);
  gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);

  vMatrix = camera.getViewMatrix();
  
  time = time + 0.01;

  scene.draw();
}
   