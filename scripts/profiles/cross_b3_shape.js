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

    // _control_points.push([1,0,0]);
    // _control_points.push([1,1,0]);
    // _control_points.push([0,1,0]);
    // _control_points.push([0,0,0]);
    // _control_points.push([0,-0.25,0]);
    // _control_points.push([0,-0.75,0]);
    // _control_points.push([0,-1,0]);
    // _control_points.push([0,-2,0]);
    // _control_points.push([1,-2,0]);
    // _control_points.push([1,-1,0]);
    // _control_points.push([1,-0.75,0]);
    // _control_points.push([1,-0.25,0]);
    // _control_points.push([1,0,0]);


    _control_points.push([1,0,0]);
    _control_points.push([1,1,0]);
    _control_points.push([0,1,0]);
    _control_points.push([0,0,0]);
    _control_points.push([0,-0.15,0]);
    _control_points.push([0,-0.45,0]);
    _control_points.push([0,-0.6,0]);
    _control_points.push([0,-1.6,0]);
    _control_points.push([1,-1.6,0]);
    _control_points.push([1,-0.6,0]);
    _control_points.push([1,-0.45,0]);
    _control_points.push([1,-0.15,0]);
    _control_points.push([1,0,0]);



    var centerx = 0;
    var centery = 0;
    var centerz = 0;

    for(var i = 0; i < _control_points.length; i++){
      centerx += _control_points[i][0];
      centery += _control_points[i][1];
      centerz += _control_points[i][2];
    }

    centerx /= _control_points.length;
    centery /= _control_points.length;
    centerz /= _control_points.length;

    for(var i = 0; i < _control_points.length; i++){
      _control_points[i][0] -= centerx;
      _control_points[i][1] -= centery;
      _control_points[i][2] -= centerz;

      _control_points[i][0]*=0.6;
      _control_points[i][1]*=0.6;
      _control_points[i][2]*=0.6;
    }

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