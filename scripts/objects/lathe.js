function Lathe(profile_curve, theta, texture) {
  var rows = profile_curve.axis.length;
  var cols = 2*Math.PI / theta + 1;

  Object3D.call(this,rows,cols,texture);
  var that = this;
  this.axial_curve = profile_curve.axis;
  this.profile_curve = profile_curve.radius;
  this.deltaTheta = theta;
  
  this._createNormalBuffer = function() {
    //TODO: implement
  }

  this._createTexturePositionBuffer = function(){

    for (var theta = 0; theta <= 2*Math.PI; theta+=this.deltaTheta) {
      for (var offset = 0; offset < this.axial_curve.length; offset++) {
        normal = [that.profile_curve[offset]*Math.cos(theta),0.0,0.0]
        binormal = [0.0,0.0,-1.0*that.profile_curve[offset]*Math.sin(theta)]
        position = [0.0,this.axial_curve[offset],0.0];

        var new_position = [0.0,0.0,0.0];
        
        vec3.add(new_position, position, normal);
        
        vec3.add(new_position, new_position, binormal);

        this.position_buffer.push(new_position[0]);
        this.position_buffer.push(new_position[1]);
        this.position_buffer.push(new_position[2]);
      }
    }

    for(j = 0; j < that.cols; j++){
      for(i = 0; i < that.rows; i++) {
        that.texture_buffer.push(i/that.rows);
        that.texture_buffer.push(j/that.cols);
      }
    }
  }

}

inheritPrototype(Lathe, Object3D);