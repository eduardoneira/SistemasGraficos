function getShader(gl, src, type) {
  var shader;

  if (type == "fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (type == "vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }

  gl.shaderSource(shader, src);

  gl.compileShader(shader);  
    
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
    return null;  
  }
    
  return shader;
}

function createGLProgram(vertexShaderSrc, fragmentShaderSrc) {
  var vertexShader = getShader(gl, vertexShaderSrc, "vertex");
  var fragmentShader = getShader(gl, fragmentShaderSrc, "fragment");

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