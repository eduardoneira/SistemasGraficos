function Base1Profile() {
  this.radius = [];
  this.axis = [];

  var _bezier_curve;
  var that = this;
  
  function _init() {
    var control_points = [];
    
    control_points.push([4.0,0.0,0.0]);
    control_points.push([1.0,2.0,0.0]);
    control_points.push([1.0,2.0,0.0]);
    control_points.push([1.0,2.0,0.0]);
    
    control_points.push([1.0,3.0,0.0]);
    control_points.push([1.0,3.0,0.0]);
    control_points.push([1.0,3.0,0.0]);
    
    control_points.push([2.5,4.0,0.0]);
    control_points.push([2.5,4.0,0.0]);
    control_points.push([3.5,5.0,0.0]);
    
    control_points.push([3.5,6.0,0.0]);
    control_points.push([3.5,6.0,0.0]);
    control_points.push([3.5,6.0,0.0]);
    
    control_points.push([1.0,7.0,0.0]);
    control_points.push([1.0,8.0,0.0]);
    control_points.push([1.5,9.0,0.0]);

    
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