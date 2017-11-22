function LowerBody(lights){
  var that = this;
  var _delta = 0.1;

  this.wheel1 = new Wheel(lights);
  this.wheel2 = new Wheel(lights);
  this.pelvis = new Pelvis(0.1, 100, 6, lights);

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

  var dir = vec3.fromValues(0,0,1);
  var dir_angle = 0.0;

  this.alignBody = function(path_tangent){
    vec3.normalize(path_tangent, path_tangent);
    dir_angle = Math.acos(vec3.dot(dir, path_tangent));
    dir_angle += Math.PI;

    if(path_tangent[0] > 0){
      dir_angle *= -1;
    }
  }

  this.rotateWheel = function(length_travelled, clockwise) {
    angle += clockwise * length_travelled / radius; 
  }

  this.draw = function(transformations){
    var align_rot = mat4.create();
    mat4.rotate(align_rot, align_rot, -dir_angle, [0, 1, 0]);

    var aux = mat4.create();
    mat4.multiply(aux, transformations, pelvis_transformations);
    mat4.multiply(aux, aux, align_rot);
    that.pelvis.draw(aux);

    aux = mat4.create();
    mat4.rotate(aux, wheel1_transformations, angle, [0.0,0.0,-1.0]);
    mat4.multiply(aux, align_rot, aux);
    mat4.multiply(aux, transformations, aux);
    that.wheel1.draw(aux);

    aux = mat4.create();
    mat4.rotate(aux, wheel2_transformations, angle, [0.0,0.0,1.0]);
    mat4.multiply(aux, align_rot, aux);
    mat4.multiply(aux, transformations, aux);
    that.wheel2.draw(aux);
  }

}