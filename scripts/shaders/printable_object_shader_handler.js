function PrintableObjectShaderHandler(vertex_shader_src,fragment_shader_src) {
  PhongShaderHandler.call(this,vertex_shader_src,fragment_shader_src);
  
  //Printing params
  this.uMaxY = gl.getUniformLocation(this.glProgram, "uMaxY");
  this.uDeltaY = gl.getUniformLocation(this.glProgram, "uDeltaY");
  this.uMaxX = gl.getUniformLocation(this.glProgram, "uMaxX");
  this.uDeltaX = gl.getUniformLocation(this.glProgram, "uDeltaX");
  this.uMaxZ = gl.getUniformLocation(this.glProgram, "uMaxZ");
  this.stopPrinting = gl.getUniformLocation(this.glProgram,"uStopPrinting");
  
  //Light config
  this.uColorBase = gl.getUniformLocation(this.glProgram,"uColorBase");
  this.uKs = gl.getUniformLocation(this.glProgram,"uKs");
  this.uDMI = gl.getUniformLocation(this.glProgram,"uDMI");
}

inheritPrototype(PrintableObjectShaderHandler,PhongShaderHandler);

