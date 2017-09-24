function GreenLanternProfile() {
  this.positions = [];

  var _bezier_curve;

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
    debugger;
    this.positions = _bezier_curve.travel(delta*_bezier_curve.number_of_curves).positions.filter(
      function(elem,index) {
        return (index % 3 == 0);
      });
  }
}