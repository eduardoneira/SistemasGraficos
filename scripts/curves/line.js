function Line(length) {
  this.length = length;
  this.points = [];

  this.tangents = [];
  this.normals = [];
  this.binormals = [];

  this.closed = false;

  var _bezier_curve;

  function _init(length) {
    var control_points = [];
    
    control_points.push([0,0,0]);
    control_points.push([length/2,0,0]);
    control_points.push([length/2,0,0]);
    control_points.push([length,0,0]);
    
    _bezier_curve = new CubicBezierCurve(control_points);
  }

  _init(length);

  this.travel = function(delta) {
    var points = _bezier_curve.travel(delta);
    this.points = points.positions;
    this.length = this.points.length/3;
    this.tangents = points.tangents;

    this.normals = this.tangents.slice();
    this.normals.unshift(this.tangents[this.tangents.length-1]);
    this.normals.pop();

    this.binormals = this.normals.slice();
    this.binormals.unshift(this.normals[this.normals.length-1]);
    this.binormals.pop();
  }
 
}