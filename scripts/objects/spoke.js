function Spoke(delta, M, radius, lights){

  var that = this;

  this.offset = [0,0,0];
  this.scale_value = [1,1,1];

  this.min_coords = [null, null, null];
  this.min_coords2 = [null, null, null];

  // var shape = new Spoke2Profile();
  // shape.travel(delta);

  // var sweep_path = new Polygon(makeFlatCircle(radius, M));
  // sweep_path.closed = true;

  var line = new Line(1);
  line.travel(0.05);

  var shape = new SurfaceCircle(radius);
  shape.discretize(0.05);

  this.loft = new Loft(shape, 
                       line, 
                       textures["eye"], 
                       0, 
                       phongShaderHandler, 
                       lights,
                       materialSpecs([1.0,1.0,1.0],
                                     [1.0,1.0,1.0],
                                     [1.0,1.0,1.0],
                                     32),
                       true,
                       true
                      );
  this.loft.init();

  for(var i = 0; i < this.loft.position_buffer.length; i+=3){
    for(var j = 0; j < 3; j++){
      if(this.min_coords[j] === null || 
         this.min_coords[j] > this.loft.position_buffer[i+j]){
        this.min_coords[j] = this.loft.position_buffer[i+j];
      }
    }
  }

  var index = null;

  for(var i = 0; i < this.loft.position_buffer.length; i+=3){
    if(this.min_coords2[0] === null ||
       this.min_coords2[0] > this.loft.position_buffer[i]){
      this.min_coords2[0] = this.loft.position_buffer[i];
      index = i;
    }
  }

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