function Plane(rows, cols, texture, shader, lights, specs, repeatTexture, normal_map=null) {
  Object3D.call(this, rows+1, cols+1, texture, shader, lights, specs, normal_map);
  var that = this;
  var repeatTexture = repeatTexture;

  this._createAttributesBuffers = function() {
    for(var j = 0; j < that.cols; j++){
      for(var i = 0; i < that.rows; i++) {
        this.position_buffer.push((i/(that.rows-1))-0.5);
        this.position_buffer.push(0);
        this.position_buffer.push((j/(that.cols-1))-0.5);

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

inheritPrototype(Plane, Object3D);