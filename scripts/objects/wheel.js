function Wheel(tire_points = 0){

  var that = this;
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);
  var _delta = 0.1;
  var _M = 100; // # puntos del sweep_path
  var _radius_tire = 1.5;
  var _radius_spoke = 1;

  this.origin = [0,0,0];

  that.tire = new Tire(_delta, _M, _radius_tire, light);
  that.spoke = new Spoke(_delta, _M, _radius_spoke, light);

  var tire_transformations = mat4.create();
  mat4.translate(tire_transformations, tire_transformations, [0,0,-0.35]);

  var spoke_transformations = mat4.create();
  mat4.translate(spoke_transformations, spoke_transformations, [0, 0, -0.3]);
  mat4.scale(spoke_transformations, spoke_transformations, [0.5, 0.5, 0.5]);

  that.cont = 0;

  this.radius = function() {
    return _radius_tire;
  }

  this.draw = function(transformations){
    var aux = mat4.create();
    mat4.multiply(aux, transformations, tire_transformations);
    that.tire.draw(aux);

    aux = mat4.create();
    mat4.multiply(aux, transformations, spoke_transformations);
    that.spoke.draw(aux);
  }

}