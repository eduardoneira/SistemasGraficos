function PrintableObjectShaderHandler(vertex_shader_src,fragment_shader_src) {
  BasicShaderHandler.call(this,vertex_shader_src,fragment_shader_src);
  
  this.uMaxY = gl.getUniformLocation(this.glProgram, "uMaxY");
  this.uDeltaY = gl.getUniformLocation(this.glProgram, "uDeltaY");
  this.uMaxAngle = gl.getUniformLocation(this.glProgram, "uMaxAngle");
  this.uPositionPrinter = gl.getUniformLocation(this.glProgram, "uPositionPrinter");
}

inheritPrototype(PrintableObjectShaderHandler,BasicShaderHandler);

