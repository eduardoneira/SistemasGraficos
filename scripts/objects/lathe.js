function Lathe(profile_curve, theta, texture, shader, light, spec) {
  var rows = profile_curve.axis.length;
  var cols = 2*Math.PI / theta + 1;

  Object3D.call(this, rows, cols, texture, shader, light, spec);
  
  var that = this;
  
  this.axial_curve = profile_curve.axis;
  this.profile_curve = profile_curve.radius;
  this.normals_curve = profile_curve.normals;
  this.deltaTheta = theta;

  this._createAttributesBuffers = function() {
    for (var theta = 0; theta <= 2*Math.PI; theta+=this.deltaTheta) {
      for (var offset = 0; offset < this.axial_curve.length; offset++) {
        normal = [this.profile_curve[offset]*Math.cos(theta),0.0,0.0];
        binormal = [0.0,0.0,-1.0*this.profile_curve[offset]*Math.sin(theta)];
        position = [0.0,this.axial_curve[offset],0.0];

        var new_position = [0.0,0.0,0.0];
        vec3.add(new_position, position, normal);
        vec3.add(new_position, new_position, binormal);

        this.position_buffer.push(new_position[0]);
        this.position_buffer.push(new_position[1]);
        this.position_buffer.push(new_position[2]);

        var normal_vector = [0.0,0.0,0.0];
        vec3.add(normal_vector, normal_vector, normal);
        vec3.add(normal_vector, normal_vector, binormal);
        vec3.add(normal_vector,normal_vector,[0.0,this.normals_curve[offset],0.0]);

        this.normal_buffer.push(normal_vector[0]);
        this.normal_buffer.push(normal_vector[1]);
        this.normal_buffer.push(normal_vector[2]);

        var tangent_vector = [-1.0*binormal[2],0.0,normal[0]]

        this.tangent_buffer.push(tangent_vector[0]);
        this.tangent_buffer.push(tangent_vector[1]);
        this.tangent_buffer.push(tangent_vector[2]);

        var binormal_vector = []
        vec3.cross(binormal_vector,normal_vector,tangent_vector)

        this.binormal_buffer.push(binormal_vector[0]);
        this.binormal_buffer.push(binormal_vector[1]);
        this.binormal_buffer.push(binormal_vector[2]);

      }
    }

    for(var j = 0; j < that.cols; j++){
      for(var i = 0; i < that.rows; i++) {
        that.texture_buffer.push(i/(that.rows-1));
        that.texture_buffer.push(j/(that.cols-1));
      }
    }
  }

}

inheritPrototype(Lathe, Object3D);