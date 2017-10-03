function BasicShaderHandler() {
  var fragmentShaderId = "basic-shader-fs";
  var vertexShaderId = "basic-shader-vs";
  
  this.glProgram = createGLProgram(vertexShaderId,fragmentShaderId);

  // Uniforms
  this.glProgram.pMatrixUniform = gl.getUniformLocation(this.glProgram, "uPMatrix");
  this.glProgram.vmMatrixUniform = gl.getUniformLocation(this.glProgram, "uVMMatrix");
  this.glProgram.nMatrixUniform = gl.getUniformLocation(this.glProgram, "uNMatrix");
  this.glProgram.ambientColorUniform = gl.getUniformLocation(this.glProgram, "uAmbientColor");
  this.glProgram.lightingDirectionUniform = gl.getUniformLocation(this.glProgram, "uLightPosition");
  this.glProgram.directionalColorUniform = gl.getUniformLocation(this.glProgram, "uDirectionalColor");
  this.glProgram.samplerUniform = gl.getUniformLocation(this.glProgram, "uSampler");

  // Attributes
  this.glProgram.vertexPositionAttribute = gl.getAttribLocation(this.glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(this.glProgram.vertexPositionAttribute);

  this.glProgram.textureCoordAttribute = gl.getAttribLocation(this.glProgram, "aTextureCoord");
  gl.enableVertexAttribArray(this.glProgram.textureCoordAttribute);

  this.glProgram.vertexNormalAttribute = gl.getAttribLocation(this.glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(this.glProgram.vertexNormalAttribute);

  this.useShader = function() {
    gl.useProgram(this.glProgram);
  }
}