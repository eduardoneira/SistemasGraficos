function CurveCircle(_radius) {
  var that = this;

  this.radius = _radius;
  this.points = [];
  this.tangents = [];
  this.normals = [];
  this.binormals = [];
  this.length = 0;
  this.closed = false;

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
    this.points = points.positions;
    
    for(var i = 0; i < points.positions.length; i+=3){
      that.tangents.push(points.tangents[i]);
      that.tangents.push(points.tangents[i+1]);
      that.tangents.push(points.tangents[i+2]);
      
      that.normals.push(-1.0*points.tangents[i+1]);
      that.normals.push(points.tangents[i]);
      that.normals.push(0);

      var binormal = vec3.create();
      vec3.cross(binormal,that.tangents.slice(-3),that.normals.slice(-3));
      that.binormals.push(binormal[0]);
      that.binormals.push(binormal[1]);
      that.binormals.push(binormal[2]);
      
    }

    this.length = points.positions.length / 3.0;
  }
}