function Line(length) {
  this.length = length;
  this.positions = [];
  this.tangents = [];
  this.normals = [];
  this.binormals = [];

  var _bezier_curve;

  function _init(length) {
    var control_points = [];
    
    control_points.push([0,-length/2.0,0]);
    control_points.push([0,0,0]);
    control_points.push([0,0,0]);
    control_points.push([0,length/2.0,0]);
    
    _bezier_curve = new CubicBezierCurve(control_points);
  }

  _init(length);

  this.travel = function(delta) {
    var points = _bezier_curve.travel(delta);
    this.positions = points.positions;
    this.tangents = points.tangents;
    this.normals = points.tangents.concat(points.tangents[0]);
    this.normals.shift();
    this.binormals = this.normals.concat(points.normals[0]);
    this.binormals.shift();
  }
 
}