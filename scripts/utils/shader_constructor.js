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
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
    return null;  
  }
    
  return shader;
}

function createGLProgram(vertexShaderId, fragmentShaderId) {
  var vertexShader = getShader(gl, vertexShaderId);
  var fragmentShader = getShader(gl, fragmentShaderId);

  glProgram = gl.createProgram();

  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);

  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(glProgram));
    return null;
  }

  return glProgram;
}