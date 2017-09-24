function GreenLanternProfile() {
  this.radius = [];
  this.axis = [];

  var _bezier_curve;
  var that = this;

  function _init() {
    var control_points = [];
    
    control_points.push([4.0,0.0,0.0]);
    control_points.push([4.0,1.0,0.0]);
    control_points.push([4.0,1.0,0.0]);
    control_points.push([4.0,2.0,0.0]);
 
    control_points.push([3.0,2.5,0.0]);
    control_points.push([3.0,2.5,0.0]);
    control_points.push([2.0,3.0,0.0]);
 
    control_points.push([3.0,3.0,0.0]);
    control_points.push([3.0,10.0,0.0]);
    control_points.push([2.0,10.0,0.0]);
 
    control_points.push([3.0,10.5,0.0]);
    control_points.push([3.0,10.5,0.0]);
    control_points.push([4.0,11.0,0.0]);
 
    control_points.push([4.0,12.0,0.0]);
    control_points.push([4.0,12.0,0.0]);
    control_points.push([4.0,13.0,0.0]);

    _bezier_curve = new CubicBezierCurve(control_points); 
  }

  _init();

  this.travel = function(delta) {
    var positions = _bezier_curve.travel(delta).positions;
    
    positions.forEach(function(elem,index) {
      if (index % 3 == 0) {
        that.radius.push(elem);
      } else if ((index + 2) % 3 == 0) {
        that.axis.push(elem);
      }
    });
  }
}