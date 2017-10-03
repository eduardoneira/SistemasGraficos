function CurveCircle(_radius) {
  this.radius = _radius;
  this.positions = [];
  this.tangents = [];
  this.normals = [];
  this.binormals = [];

  var _bezier_curve;

  function _init(radius) {
    var control_points = [];
    
    control_points.push([radius,0,0]);
    control_points.push([radius,0.552284749831*radius,0]);
    control_points.push([0.552284749831*radius,radius,0]);
    control_points.push([0,radius,0]);
    control_points.push([-0.552284749831*radius,radius,0]);
    control_points.push([-radius,0.552284749831*radius,0]);
    control_points.push([-radius,0,0]);
    control_points.push([-radius,-0.552284749831*radius,0]);
    control_points.push([-0.552284749831*radius,-radius,0]);
    control_points.push([0,-radius,0]);
    control_points.push([0.552284749831*radius,-radius,0]);
    control_points.push([radius,-0.552284749831*radius,0]);
    control_points.push([radius,0,0]);
    
    _bezier_curve = new CubicBezierCurve(control_points);
  }

  _init(_radius);

  this.travel = function(delta) {
    var points = _bezier_curve.travel(delta);
    this.positions = points.positions;
    this.tangents = points.tangents;
    this.normals = points.normals;
    this.binormals = points.binormals;
  }
}