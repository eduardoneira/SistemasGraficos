function Projector() {
  var pMatrix = mat4.create();
  mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth/gl.viewportHeight, 0.1, 1000.0);
  
  this.getProjection() {
    gl.uniformMatrix4fv(basicShaderHandler.pMatrixUniform, false, pMatrix);
  } 

}