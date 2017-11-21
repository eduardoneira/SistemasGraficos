function TriangleRectangle(rows, cols, texture, shader, lights, specs, repeatTexture) {
  Object3D.call(this, rows+1, cols+1, texture, shader, lights, specs);
  var that = this;
  var repeatTexture = repeatTexture;

  this._createAttributesBuffers = function() {
    var delta_length = 1 / (that.cols-1);

    for(var j = 0; j < that.cols; j++){
      var current_length = j * delta_length;

      for(var i = 0; i < that.rows; i++) {
        this.position_buffer.push((current_length* (i/(that.rows-1))));
        this.position_buffer.push(0);
        this.position_buffer.push(((j/(that.cols-1))));

        this.normal_buffer.push(0);
        this.normal_buffer.push(1);
        this.normal_buffer.push(0);

        this.tangent_buffer.push(1);
        this.tangent_buffer.push(0);
        this.tangent_buffer.push(0);

        this.binormal_buffer.push(0);
        this.binormal_buffer.push(0);
        this.binormal_buffer.push(1);

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

inheritPrototype(TriangleRectangle, Object3D);