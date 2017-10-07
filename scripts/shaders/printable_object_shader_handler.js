function PrintableObjectShaderHandler(vertex_shader_src,fragment_shader_src) {
  BasicShaderHandler.call(this,vertex_shader_src,fragment_shader_src);
  
  this.uMaxZ = gl.getUniformLocation(this.glProgram, "uMaxZ");
  this.uDeltaZ = gl.getUniformLocation(this.glProgram, "uDeltaZ");
  this.uMaxAngle = gl.getUniformLocation(this.glProgram, "uMaxAngle");
  this.uPositionPrinter = gl.getUniformLocation(this.glProgram, "uPositionPrinter");
}

inheritPrototype(PrintableObjectShaderHandler,BasicShaderHandler);

