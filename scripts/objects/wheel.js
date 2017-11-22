function Wheel(lights){
  var that = this;
  var _delta = 0.1;
  var _M = 100; // # puntos del sweep_path
  var _radius_tire = 1.5;
  var _radius_spoke = 1;

  this.origin = [0,0,0];

  that.tire = new Tire(_delta, _M, _radius_tire, lights);
  that.spoke = new Spoke(_delta, _M, _radius_spoke, lights);

  var tire_transformations = mat4.create();
  mat4.translate(tire_transformations, tire_transformations, [0,0,-0.35]);

  var spoke_transformations = mat4.create();
  mat4.translate(spoke_transformations, spoke_transformations, [0, 0, 0.3]);
  mat4.scale(spoke_transformations, spoke_transformations, [0.52, 0.6, 0.52]);
  mat4.rotate(spoke_transformations,spoke_transformations,degToRad(90),[0.0,1.0,0.0]);

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