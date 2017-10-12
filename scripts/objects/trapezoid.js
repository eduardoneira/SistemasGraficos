function Trapezoid(rows, cols, shrinking_factor,texture, shader, light, diffuseColor,repeatTexture) {
  Object3D.call(this, rows+1, cols+1, texture, shader, light, diffuseColor);
  
  var that = this;
  var repeatTexture = repeatTexture;

  this._createAttributesBuffers = function() {
    var horizontal_delta = shrinking_factor / (that.cols-1);
    for(var j = 0; j < that.cols; j++){
      var horizontal_size = j * horizontal_delta; 
      for(var i = 0; i < that.rows; i++) {
        this.position_buffer.push(((1-horizontal_size)*i/(that.rows-1)) - 0.5 + (horizontal_size/2.0));
        this.position_buffer.push(0);
        this.position_buffer.push((j/(that.cols-1))-0.5);

        this.normal_buffer.push(0);
        this.normal_buffer.push(1);
        this.normal_buffer.push(0);

        if (repeatTexture) {
          that.texture_buffer.push(i);
          that.texture_buffer.push(j);
        } else {
          that.texture_buffer.push(i/(that.rows-1));
          that.texture_buffer.push(j/(that.cols-1));
        }
      }
    }
  }
}

inheritPrototype(Trapezoid, Object3D);