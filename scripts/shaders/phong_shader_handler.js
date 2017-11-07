function PhongShaderHandler(vertex_shader_src,fragment_shader_src) {
  this.vertexShaderSrc = vertex_shader_src;
  this.fragmentShaderSrc = fragment_shader_src;
  
  this.glProgram = createGLProgram(this.vertexShaderSrc,this.fragmentShaderSrc);

  // Uniforms
  this.pMatrixUniform = gl.getUniformLocation(this.glProgram, "uPMatrix");
  this.vmMatrixUniform = gl.getUniformLocation(this.glProgram, "uVMMatrix");
  this.nMatrixUniform = gl.getUniformLocation(this.glProgram, "uNMatrix");
  this.ambientColorUniform = gl.getUniformLocation(this.glProgram, "uAmbientColor");
  this.lightingDirectionUniform = gl.getUniformLocation(this.glProgram, "uLightPosition");
  this.directionalColorUniform = gl.getUniformLocation(this.glProgram, "uDirectionalColor");
  this.samplerUniform = gl.getUniformLocation(this.glProgram, "uSampler");

  this.cameraPosition = gl.getUniformLocation(this.glProgram, "uCameraPosition");

  // Attributes
  this.vertexPositionAttribute = gl.getAttribLocation(this.glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(this.vertexPositionAttribute);

  this.textureCoordAttribute = gl.getAttribLocation(this.glProgram, "aTextureCoord");
  gl.enableVertexAttribArray(this.textureCoordAttribute);

  this.vertexNormalAttribute = gl.getAttribLocation(this.glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(this.vertexNormalAttribute);

  this.activateShader = function() {
    gl.useProgram(this.glProgram);
  }
}