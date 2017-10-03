// Global varibles
var gl = null;
var glProgram = null;
var canvas = null;

// Shaders
var fragmentShader = null;
var vertexShader = null;

// Time of frames
var time = 0.0;
var deltaTime = 10;

// Objects
var scene = new Scene();
var camera = new Camera();

//TODO: Move this to scene?
var vMatrix = mat4.create();
var pMatrix = mat4.create();

function getShader(gl, id) {
  var shaderScript, src, currentChild, shader;

  shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  src = "";
  currentChild = shaderScript.firstChild;
  while(currentChild) {
    if (currentChild.nodeType == currentChild.TEXT_NODE) {
      src += currentChild.textContent;
    }
    currentChild = currentChild.nextSibling;
  }

  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
      return null;
  }

  gl.shaderSource(shader, src);

  gl.compileShader(shader);  
    
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
    alert("An error occurred compiling the shaders: " + 
      gl.getShaderInfoLog(shader));  
    return null;  
  }
    
  return shader;
}

function initWebGL() { 
  canvas = document.getElementById("my-canvas");  
  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");                   
  } catch(e) {}
                  
  if(gl) {
    setupWebGL();
    initShaders();
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
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShaders() {
  var fragmentShader = getShader(gl, "basic-shader-fs");
  var vertexShader = getShader(gl, "basic-shader-vs");

  glProgram = gl.createProgram();

  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);

  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(glProgram));
    return null;
  }

  gl.useProgram(glProgram);
}

function makeShader(src, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
  }
  return shader;
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
   