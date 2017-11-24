function DetergentProfile() {
  this.radius = [];
  this.axis = [];
  this.normals = [];

  var _bezier_curve;
  var that = this;

  function _init() {
    var control_points = [];
    
    control_points.push([0.0,0.0,0.0]);
    control_points.push([1.0,0.0,0.0]);
    control_points.push([2.0,1.0,0.0]);
    control_points.push([3.0,2.0,0.0]);
 
    control_points.push([4.0,3.0,0.0]);
    control_points.push([2.0,5,0.0]);
    control_points.push([1.5,6.0,0.0]);
 
    control_points.push([1.0,7.0,0.0]);
    control_points.push([2.0,8.0,0.0]);
    control_points.push([3.0,9.0,0.0]);
 
    _bezier_curve = new CubicBezierCurve(control_points); 
  }

  _init();

  this.travel = function(delta) {
     var points = _bezier_curve.travel(delta);
    
    points.positions.forEach(function(elem,index) {
      if (index % 3 == 0) {
        that.radius.push(elem);
      } else if ((index + 2) % 3 == 0) {
        that.axis.push(elem);
      }
    });

    points.tangents.forEach(function(elem,index){
      if ((index + 1) % 3 == 0) {
        that.normals.push(elem);
      }
    });
  }
}