function Wheel(tire_points = 0){

  var that = this;
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);
  var _delta = 0.1;
  var _M = 100; // # puntos del sweep_path
  var _radius_tire = 1.5;
  var _radius_spoke = 1;

  this.origin = [0,0,0];

  this.parts = [];

  that.tire = new Tire(_delta, _M, _radius_tire, light);
  that.spoke = new Spoke(_delta, _M, _radius_spoke, light);

  var tire_transformations = mat4.create();
  var spoke_transformations = mat4.create();

  mat4.translate(tire_transformations, tire_transformations,
                 [0,0,-0.35]);

  mat4.translate(spoke_transformations, spoke_transformations, [0, 0, -0.3]);
  mat4.scale(spoke_transformations, spoke_transformations, [0.5, 0.5, 0.5]);

  // this.spoke.scale([1.3,1.3,1.3]);
  // this.spoke.translate([0,5,0.8, 0]);
  // this.spoke.applyScale();

  // this.tire.translate([0,5,-1]);
  // this.tire.scale([3,3,3]);
  // this.tire.applyScale();

  this.parts.push(this.tire);
  this.parts.push(this.spoke);

  that.cont = 0

  this.draw = function(transformations){
    var aux = mat4.create();

    mat4.multiply(aux, transformations, tire_transformations);

    that.tire.draw(aux);

    aux = mat4.create();
    mat4.multiply(aux, transformations, spoke_transformations);

    that.spoke.draw(aux);
    // this.parts.forEach(function(elem){
    //   // that.cont += 0.1;
    //   // if(that.cont >= 2*Math.pi){
    //   //   that.cont = 0;
    //   // }
    //   // elem.translate([0,0,0.1*Math.sin(that.cont)]);
    //   elem.draw(transformations);
    // });

  }

  this.translate = function(tVect){
    this.parts.forEach(function(elem){
      elem.translate(tVect);
    });
    // mat
  }

  this.rotate = function(rad, axis){
    this.parts.forEach(function(elem){
      elem.rotate(rad, axis);
    });
  }
  // this.nativeRot = function(rad, axis){
  //   this
  // }
}