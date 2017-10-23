function PrintedObject(object, scale, maxY) {
  var that = this;

  this.printed_object = object;
  var scale_factor = scale;
  var maxY = maxY;

  this.stop_printing = function() {
    this.printed_object.setShader(basicShaderHandler);
  }

  this.draw = function(position) {
    var transformations = mat4.create();
    mat4.translate(transformations, transformations, position);
    mat4.scale(transformations,transformations,[scale_factor[0]/maxY,scale_factor[1]/maxY,scale_factor[2]/maxY]);
    this.printed_object.draw(transformations);
  }  
}