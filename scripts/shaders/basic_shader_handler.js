function BasicShaderHandler() {
  var fragmentShaderId = "basic-shader-fs";
  var vertexShaderId = "basic-shader-vs";
  
  this.glProgram = createGLProgram(vertexShaderId,fragmentShaderId);

  this.attribute_handlers = {};
  this.uniform_handlers = {};

}










var basic_shader_handlers = {
  
}