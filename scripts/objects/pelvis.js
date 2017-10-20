function Pelvis(delta, M, radius, light){

  var that = this;

  this.offset = [0,0,0];
  this.scale_value = [1,1,1]; 

  var line = new Line(5);
  line.travel(0.05);

  var shape = new SurfaceCircle(radius);
  shape.discretize(0.05);

  this.loft = new Loft(shape, 
                      line, 
                      textures["brushed_aluminum_rot"], 
                      0, 
                      basicShaderHandler, 
                      light, 
                      [0.1, 0.1, 0.1],
                      true);
  this.loft.init();


  this.loft.init();
  this.loft.translate([0,-4.3,0]);
  this.loft.rotate(Math.PI/2, [0,0,1]);
  // this.loft.scale([10,10,10]);

    // rescalo textura:
  for(var i = 1; i < this.loft.texture_buffer.length; i+=2){
    this.loft.texture_buffer[i+1] *= 10;
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

}