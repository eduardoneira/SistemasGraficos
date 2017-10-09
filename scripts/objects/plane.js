function Plane(rows, cols, texture, shader, light, diffuseColor) {
  Object3D.call(this, rows, cols, texture, shader, light, diffuseColor);
  var that = this;


  this._createAttributesBuffers = function() {
    for(var j = 0; j < that.cols; j++){
      for(var i = 0; i < that.rows; i++) {
        this.position_buffer.push((j/that.cols)-0.5);
        this.position_buffer.push(0);
        this.position_buffer.push((i/that.rows)-0.5);

        this.normal_buffer.push(0);
        this.normal_buffer.push(1);
        this.normal_buffer.push(0);

        that.texture_buffer.push(i);
        that.texture_buffer.push(j);
      }
    }
  }
}

inheritPrototype(Plane, Object3D);