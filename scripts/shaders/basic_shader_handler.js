function BasicShaderHandler() {
  var fragmentShaderId = "basic-shader-fs";
  var vertexShaderId = "basic-shader-vs";
  
  this.glProgram = createGLProgram(vertexShaderId,fragmentShaderId);

  // Uniforms
  this.pMatrixUniform = gl.getUniformLocation(this.glProgram, "uPMatrix");
  this.vmMatrixUniform = gl.getUniformLocation(this.glProgram, "uVMMatrix");
  this.nMatrixUniform = gl.getUniformLocation(this.glProgram, "uNMatrix");
  this.ambientColorUniform = gl.getUniformLocation(this.glProgram, "uAmbientColor");
  this.lightingDirectionUniform = gl.getUniformLocation(this.glProgram, "uLightPosition");
  this.directionalColorUniform = gl.getUniformLocation(this.glProgram, "uDirectionalColor");
  this.samplerUniform = gl.getUniformLocation(this.glProgram, "uSampler");

  // Attributes
  this.vertexPositionAttribute = gl.getAttribLocation(this.glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(this.vertexPositionAttribute);

  this.textureCoordAttribute = gl.getAttribLocation(this.glProgram, "aTextureCoord");
  gl.enableVertexAttribArray(this.textureCoordAttribute);

  this.vertexNormalAttribute = gl.getAttribLocation(this.glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(this.vertexNormalAttribute);

  this.useShader = function() {
    gl.useProgram(this.glProgram);
  }
}