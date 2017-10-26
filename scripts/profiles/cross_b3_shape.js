function CrossB3Shape(){
  this.normals = [];
  this.positions = [];

  var _bezier_curve;
  var that = this;

  var _radius = 1;
  var M = 16;
  var offset = 2;

  function _init(){
    var _control_points = [];

    _control_points.push([1,0,0]);
    _control_points.push([1,1,0]);
    _control_points.push([0,1,0]);
    _control_points.push([0,0,0]);
    _control_points.push([0,-0.25,0]);
    _control_points.push([0,-0.75,0]);
    _control_points.push([0,-1,0]);
    _control_points.push([0,-2,0]);
    _control_points.push([1,-2,0]);
    _control_points.push([1,-1,0]);
    _control_points.push([1,-0.75,0]);
    _control_points.push([1,-0.25,0]);
    _control_points.push([1,0,0]);
    
    _bezier_curve = new CubicBezierCurve(_control_points);
    
    // debugger;
  }

  _init();
  this.travel = function(delta){
    var bezier_curve = _bezier_curve.travel(delta);

    for(var i = 0; i < bezier_curve.positions.length; i+=3){
      that.positions.push(bezier_curve.positions[i]);
      that.positions.push(bezier_curve.positions[i+1]);
    }

    that.normals = that.positions.slice();
  }

}