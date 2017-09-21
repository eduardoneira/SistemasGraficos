function circle(_radius) {
  this.radius = _radius;
  this.positions = [];
  this.tangents = [];
  this.normals = [];

  var _bezier_curve;

  this.init = function() {
    var control_points = [];
    
    control_points.push([this.radius,0,0]);
    control_points.push([this.radius,this.radius,0]);
    control_points.push([-this.radius,this.radius,0]);
    control_points.push([-this.radius,0,0]);
    control_points.push([-this.radius,-this.radius,0]);
    control_points.push([this.radius,-this.radius,0]);
    control_points.push([this.radius,0,0]);
    
    _bezier_curve = new CubicBezierCurve(control_points);
  }

  this.travel = function(delta) {
    var points = _bezier_curve.travel(delta);
    this.positions = points.positions;
    this.tangents = points.tangents;
    this.normals = points.normals;
  }
}