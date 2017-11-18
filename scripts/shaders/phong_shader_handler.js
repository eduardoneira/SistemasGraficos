function PhongShaderHandler(vertex_shader_src,fragment_shader_src) {
  this.vertexShaderSrc = vertex_shader_src;
  this.fragmentShaderSrc = fragment_shader_src;
  
  this.glProgram = createGLProgram(this.vertexShaderSrc, this.fragmentShaderSrc);

  // Uniforms
  this.pMatrixUniform = gl.getUniformLocation(this.glProgram, "uPMatrix");
  this.vMatrixUniform = gl.getUniformLocation(this.glProgram, "uVMatrix");
  this.mMatrixUniform = gl.getUniformLocation(this.glProgram, "uMMatrix");
  this.nMatrixUniform = gl.getUniformLocation(this.glProgram, "uNMatrix");

  this.cameraPosition = gl.getUniformLocation(this.glProgram, "uCameraPosition");
  this.pointLightPositions = gl.getUniformLocation(this.glProgram,"uLightPositions");
  this.pointLightIntensities = gl.getUniformLocation(this.glProgram,"uLightIntensities");

  this.lightAmbientIntensity = gl.getUniformLocation(this.glProgram, "uLightAmbientIntensity");  
  this.lightDiffuseIntensity = gl.getUniformLocation(this.glProgram, "uLightDiffuseIntensity");  
  this.lightSpecularIntensity = gl.getUniformLocation(this.glProgram, "uLightSpecularIntensity");  

  this.materialAmbientRefl = gl.getUniformLocation(this.glProgram, "uMaterialAmbientRefl");
  this.materialDiffuseRefl = gl.getUniformLocation(this.glProgram, "uMaterialDiffuseRefl");
  this.materialSpecularRefl = gl.getUniformLocation(this.glProgram, "uMaterialSpecularRefl");
  this.materialShininess = gl.getUniformLocation(this.glProgram, "uMaterialShininess");

  this.samplerUniform = gl.getUniformLocation(this.glProgram, "uSampler");
  this.normalMapSamplerUniform = gl.getUniformLocation(this.glProgram, "uNormalMapSampler");
  
  this.uUsesNormalMap = gl.getUniformLocation(this.glProgram, "uUsesNormalMap");

  // Attributes
  this.vertexPositionAttribute = gl.getAttribLocation(this.glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(this.vertexPositionAttribute);

  this.textureCoordAttribute = gl.getAttribLocation(this.glProgram, "aTextureCoord");
  gl.enableVertexAttribArray(this.textureCoordAttribute);

  this.vertexNormalAttribute = gl.getAttribLocation(this.glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(this.vertexNormalAttribute);

  this.vertexTangentAttribute = gl.getAttribLocation(this.glProgram, "aVertexTangent");
  gl.enableVertexAttribArray(this.vertexTangentAttribute);

  this.vertexBinormalAttribute = gl.getAttribLocation(this.glProgram, "aVertexBinormal");
  gl.enableVertexAttribArray(this.vertexBinormalAttribute);


  this.activateShader = function() {
    gl.useProgram(this.glProgram);
  }
}