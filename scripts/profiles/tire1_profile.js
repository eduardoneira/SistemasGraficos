function Tire1Profile(){
  this.positions = [];
  this.normals = [];

  var _bezier_curve;
  var that = this;

  function _init(){
    var _control_points = [[0.9907, 0.1714, 0],
                           [0.9900, 0.1657, 0],
                           [0.9838, 0.1274, 0],
                           [0.9614, 0.1149, 0],
                           [0.8539, 0.0547, 0],
                           [0.7495,      0, 0],
                           [0.6828, 0.1035, 0],
                           [0.6408, 0.1687, 0],
                           [0.6176, 0.3038, 0],
                           [0.6176, 0.3857, 0],
                           [0.6176, 0.4675, 0],
                           [0.6408, 0.6026, 0],
                           [0.6828, 0.6678, 0],
                           [0.7495, 0.7713, 0],
                           [0.8539, 0.7166, 0],
                           [0.9614, 0.6564, 0],
                           [0.9838, 0.6439, 0],
                           [0.9900, 0.6056, 0],
                           [0.9907, 0.5999, 0]];
    _bezier_curve = new CubicBezierCurve(_control_points);
  }

  _init();

  this.discretize = function(delta){
    var bezier_curve = _bezier_curve.travel(delta);

    for(var i = 0; i < bezier_curve.positions.length; i+=3){
      that.positions.push(bezier_curve.positions[i]);
      that.positions.push(bezier_curve.positions[i+1]);
      
      that.normals.push(bezier_curve.tangents[i+1]);
      that.normals.push(-1.0*bezier_curve.tangents[i]);
    }

    this.normals = this.positions.slice();

  }
}