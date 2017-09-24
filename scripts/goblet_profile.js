function GobletProfile() {
  this.positions = [];

  var _bezier_curve;

  function _init() {
    var control_points = [];
    
    control_points.push([4.0,0.0,0.0]);
    control_points.push([0.5,0.0,0.0]);
    control_points.push([0.5,0.0,0.0]);
    control_points.push([0.5,10.0,0.0]);
    control_points.push([0.5,11.0,0.0]);
    control_points.push([6.0,11.0,0.0]);
    control_points.push([6.0,15.0,0.0]);
    
    _bezier_curve = new CubicBezierCurve(control_points); 
  }

  _init();

  this.travel = function(delta) {
    this.positions = _bezier_curve.travel(2*delta).positions.filter(
      function(elem,index) {
        return (index % 3 == 0);
      });
  }
}