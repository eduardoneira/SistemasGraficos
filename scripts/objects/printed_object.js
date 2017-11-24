function PrintedObject(object, scale, maxY, base_color, diffuse_map_intensity, specular) {
  var that = this;

  this.printed_object = object;
  var scale_factor = scale;
  var maxY = maxY;
  var stop_printing = 0.0;
  var base_color = base_color;
  var diffuse_map_intensity = diffuse_map_intensity;
  var specular = specular;

  this.stop_printing = function() {
    stop_printing = 1.0; 
  }

  this.activateShader = function() {
    this.printed_object.activateShader();
    gl.uniform1f(that.printed_object.shader.uColorBase, base_color);
    gl.uniform1f(that.printed_object.shader.uDMI, diffuse_map_intensity);
    gl.uniform1f(that.printed_object.shader.uKs, specular);
  }

  this.draw = function(position) {
    var transformations = mat4.create();
    mat4.translate(transformations, transformations, position);
    mat4.scale(transformations,transformations,[scale_factor[0]/maxY,scale_factor[1]/maxY,scale_factor[2]/maxY]);
    this.printed_object.draw(transformations);
  }  
}