function Lathe(axial_curve, profile_curve, theta, texture) {
  var rows = axial_curve.positions.length/3;
  var cols = 2*Math.PI / theta + 1;

  Object3D.call(this,rows,cols,texture);
  var that = this;
  this.axial_curve = axial_curve;
  this.profile_curve = profile_curve;
  this.deltaTheta = theta;
  
  this._createNormalBuffer = function() {
    //TODO: implement
  }

  this._createTexturePositionBuffer = function(){

    for (var theta = 0; theta <= 2*Math.PI; theta+=this.deltaTheta) {
      for (var offset = 0; 3*offset < this.axial_curve.positions.length-1; offset++) {
        normal = this.axial_curve.normals.slice(3*offset, 3*offset+3);
        binormal = this.axial_curve.binormals.slice(3*offset, (3*offset)+3);
        position = this.axial_curve.positions.slice(3*offset, (3*offset)+3);

        var new_position = [0.0,0.0,0.0];
        
        vec3.add(new_position, position, normal.map( function(elem) {
            return that.profile_curve.positions[offset]*Math.cos(theta)*elem;
          }));
        
        vec3.add(new_position, new_position, binormal.map( function(elem) {
            return that.profile_curve.positions[offset]*Math.sin(theta)*elem;
          }));

        debugger;

        this.position_buffer.push(new_position[0]);
        this.position_buffer.push(new_position[1]);
        this.position_buffer.push(new_position[2]);
      }
    }

    debugger;

    for(j = 0; j < that.cols; j++){
      for(i = 0; i < that.rows; i++) {
        that.texture_buffer.push(i/that.rows);
        that.texture_buffer.push(j/that.cols);
      }
    }
  }

}

inheritPrototype(Lathe, Object3D);