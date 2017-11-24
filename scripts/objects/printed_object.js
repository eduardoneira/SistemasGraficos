function PrintedObject(object, scale, maxY, base_color, diffuse_map_intensity, specular) {
  var that = this;

  this.printed_object = object;
  this.printed_object.optionalParamsShader = activateShader;
  
  var scale_factor = scale;
  var maxY = maxY;
  var stop_printing = 0.0;
  var base_color = base_color;
  var diffuse_map_intensity = diffuse_map_intensity;
  var specular = specular;

  this.curY = null;
  this.deltaY = null;
  this.curX = null;
  this.deltaX = null;
  this.curZ = null;
  var positionPrinter = [0.0,0.0,0.0];

  this.angle = 0.0;

  this.stopPrinting = function() {
    stop_printing = 1.0;
  }

  function activateShader() {
    gl.uniform1f(that.printed_object.shader.uStopPrinting, stop_printing);
    gl.uniform1f(printableObjectShaderHandler.uMaxY,that.curY);
    gl.uniform1f(printableObjectShaderHandler.uDeltaY,that.deltaY);
    gl.uniform1f(printableObjectShaderHandler.uMaxX,that.curX);
    gl.uniform1f(printableObjectShaderHandler.uDeltaX,that.deltaX);
    gl.uniform1f(printableObjectShaderHandler.uMaxZ,that.curZ);
    gl.uniform3fv(printableObjectShaderHandler.uPositionPrinter,positionPrinter);
    
    gl.uniform1f(that.printed_object.shader.uColorBase, base_color);
    gl.uniform1f(that.printed_object.shader.uDMI, diffuse_map_intensity);
    gl.uniform1f(that.printed_object.shader.uKs, specular);
  }

  this.draw = function(position) {
    var transformations = mat4.create();
    mat4.translate(transformations, transformations, position);
    mat4.rotate(transformations,transformations,this.angle,[0.0,1.0,0.0]);
    mat4.scale(transformations,transformations,[scale_factor[0]/maxY,scale_factor[1]/maxY,scale_factor[2]/maxY]);
    this.printed_object.draw(transformations);
  }  
}