function Wheel(tire_points = 0){

  var that = this;
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);
  var _delta = 0.1;
  var _M = 100; // # puntos del sweep_path
  var _radius_tire = 1.5;
  var _radius_spoke = 1;

  this.parts = [];

  that.tire = new Tire(_delta, _M, _radius_tire, light);
  that.spoke = new Spoke(_delta, _M, _radius_spoke, light);

  this.spoke.translate([0,5,0.8, 0]);
  this.spoke.scale([1.3,1.3,1.3]);
  // this.spoke.applyScale();

  this.tire.translate([0,5,-1]);
  this.tire.scale([3,3,3]);
  // this.tire.applyScale();

  this.parts.push(this.tire);
  this.parts.push(this.spoke);

  that.cont = 0

  this.draw = function(transformations){
    this.parts.forEach(function(elem){
      // that.cont += 0.1;
      // if(that.cont >= 2*Math.pi){
      //   that.cont = 0;
      // }
      // elem.translate([0,0,0.1*Math.sin(that.cont)]);
      elem.draw(transformations);
    });
  }
}