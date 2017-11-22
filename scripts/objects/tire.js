function Tire(delta, M, radius, lights){
  var that = this;

  this.offset = [0,0,0];
  this.scale_value = [1,1,1]; 
  this.rotation = 0; //asumo siempre eje y(?)

  var shape = new Tire1Profile();
  shape.discretize(0.01);

  var sweep_path = new CurveCircle(radius);
  sweep_path.travel(0.04);
  sweep_path.closed = false;

  this.loft = new Loft(shape, 
                       sweep_path, 
                       textures["blank"],
                       0, 
                       phongShaderHandler, 
                       lights, 
                       materialSpecs([1.0,1.0,1.0],
                                     [1.0,1.0,1.0],
                                     [1.0,1.0,1.0],
                                     32),
                       false,
                       false,
                       textures["normal_map_gotas"]);
  this.loft.init();

  debugger;

  this.draw = function(transformations){
    this.loft.activateShader();
    this.loft.draw(transformations);
  }

  this.translate = function(tVect){
    for(var i = 0; i < this.offset.length; i++){
      this.offset[i] += tVect[i];
    }
    this.loft.translate(tVect);
  }

  this.scale = function(sVect){
    for(var i = 0; i < this.scale_value.length; i++){
      this.scale_value[i] *= sVect[i];
    }
    this.loft.scale(sVect);
  }

  this.applyScale = function(){
    var transformation_matrix = mat4.create();
    mat4.scale(transformation_matrix, transformation_matrix, that.scale_value);

    var aux_vert = vec3.create();

     for(var i = 0; i < that.loft.position_buffer.length; i+=3){
      aux_vert = vec3.fromValues(that.loft.position_buffer[i],
                                 that.loft.position_buffer[i+1],
                                 that.loft.position_buffer[i+2]);

      vec3.transformMat4(aux_vert, aux_vert, transformation_matrix);

      that.loft.position_buffer[i] = aux_vert[0];
      that.loft.position_buffer[i+1] = aux_vert[1];
      that.loft.position_buffer[i+2] = aux_vert[2];
     } 
     that.loft.scale([1/that.scale_value[0], 
                      1/that.scale_value[1], 
                      1/that.scale_value[2]]);

     that.scale_value = [1,1,1];
  }

  this.rotate = function(rad, axis){
    this.rotation += rad;
    this.loft.rotate(rad, axis);
  }

}