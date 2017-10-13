function PrintableObjectShaderHandler(vertex_shader_src,fragment_shader_src) {
  BasicShaderHandler.call(this,vertex_shader_src,fragment_shader_src);
  
  this.uMaxY = gl.getUniformLocation(this.glProgram, "uMaxY");
  this.uDeltaY = gl.getUniformLocation(this.glProgram, "uDeltaY");
  this.uMaxX = gl.getUniformLocation(this.glProgram, "uMaxX");
  this.uDeltaX = gl.getUniformLocation(this.glProgram, "uDeltaX");
  this.uMaxZ = gl.getUniformLocation(this.glProgram, "uMaxZ");
}

inheritPrototype(PrintableObjectShaderHandler,BasicShaderHandler);

