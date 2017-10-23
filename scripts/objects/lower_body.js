function LowerBody(){
  
  var that = this;
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);
  var _delta = 0.1;

  this.wheel1 = new Wheel();
  this.wheel2 = new Wheel();
  this.pelvis = new Pelvis(0.1, 100, 6, light);

  var wheel_offset = 6;
  var pelvis_transformations = mat4.create();
  mat4.scale(pelvis_transformations, pelvis_transformations,
              [0.8, 0.8, 0.8]);
  mat4.translate(pelvis_transformations, pelvis_transformations,
                 [0,6,0]);

  var wheel1_transformations = mat4.create();
  var wheel2_transformations = mat4.create();
  mat4.translate(wheel1_transformations, wheel1_transformations, [0,1.3,-wheel_offset]);
  mat4.scale(wheel1_transformations, wheel1_transformations, [3, 3, 2.5]);

  mat4.translate(wheel2_transformations, wheel2_transformations, [0,1.3,wheel_offset]);
  mat4.rotate(wheel2_transformations, wheel2_transformations, Math.PI, [0,1,0]);
  mat4.scale(wheel2_transformations, wheel2_transformations, [3, 3, 2.5]);

  var angle = 0.0;
  var radius = 0.32 * 3 * this.wheel1.radius();

  this.rotateWheel = function(length_travelled, clockwise) {
    angle += clockwise * length_travelled / radius; 
  }

  this.draw = function(transformations){
    var aux = mat4.create();
    mat4.multiply(aux, transformations, pelvis_transformations);
    that.pelvis.draw(aux);

    aux = mat4.create();
    mat4.rotate(aux, wheel1_transformations, angle, [0.0,0.0,-1.0]);
    mat4.multiply(aux, transformations, aux);
    that.wheel1.draw(aux);

    aux = mat4.create();
    mat4.rotate(aux, wheel2_transformations, angle, [0.0,0.0,1.0]);
    mat4.multiply(aux, transformations, aux);
    that.wheel2.draw(aux);
  }

}