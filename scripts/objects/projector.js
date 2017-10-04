function Projector(shader) {
  var pMatrix = mat4.create();
  var shader = shader;
  mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth/gl.viewportHeight, 0.1, 1000.0);
  
  this.applyProjection = function() {
    gl.uniformMatrix4fv(shader.pMatrixUniform, false, pMatrix);
  } 

}