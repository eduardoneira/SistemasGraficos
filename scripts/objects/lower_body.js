function LowerBody(){
  
  var that = this;
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);
  var _delta = 0.1;

  this.wheel1 = new Wheel();
  this.wheel2 = new Wheel();
  this.pelvis = new Pelvis(0.1, 100, 0.2, light);

  this.parts = [this.wheel1, this.wheel2, this.pelvis];
  this.wheels = [this.wheel1, this.wheel2];

  var wheel_offset = 4;
  // this.wheel1.rotate(Math.PI/2, [0,1,0]);
  // this.wheel2.rotate(Math.PI/2, [0,1,0]);
  // this.pelvis.translate([0,0,-2]);
  var pelvis_transformations = mat4.create();
  mat4.scale(pelvis_transformations, pelvis_transformations,
              [0.8, 0.8, 0.8]);
  mat4.translate(pelvis_transformations, pelvis_transformations,
                 [0,6,0]);

  // this.wheel1.translate([0, 0, wheel_offset]);
  // this.wheel2.translate([0, 0, -wheel_offset]);

  var wheel1_transformations = mat4.create();
  var wheel2_transformations = mat4.create();
  mat4.translate(wheel1_transformations, wheel1_transformations, [0,1,-wheel_offset]);
  mat4.scale(wheel1_transformations, wheel1_transformations, [2.5, 2.5, 2.5]);

  mat4.translate(wheel2_transformations, wheel2_transformations, [0,1,wheel_offset]);
  mat4.rotate(wheel2_transformations, wheel2_transformations, Math.PI, [0,1,0]);
  mat4.scale(wheel2_transformations, wheel2_transformations, [2.5, 2.5, 2.5]);


  this.draw = function(transformations){
    var aux = mat4.create();
    mat4.multiply(aux, transformations, pelvis_transformations);
    that.pelvis.draw(aux);

    aux = mat4.create();
    mat4.multiply(aux, transformations, wheel1_transformations);
    that.wheel1.draw(aux);

    aux = mat4.create();
    mat4.multiply(aux, transformations, wheel2_transformations);
    that.wheel2.draw(aux);
    // this.parts.forEach(function(elem){
    //   elem.draw(transformations);
    // });
  }

}