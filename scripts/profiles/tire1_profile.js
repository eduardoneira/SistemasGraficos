function Tire1Profile(){
  this.radius = [];
  this.axis = [];
  this.normals = [];

  var _bezier_curve;
  var that = this;

  function _init(){
    var _control_points = [[1.01264, 0, 0],
                           [1, 0.17197, 0],
                           [0.90610, 0.34393, 0],
                           [0.79371, 0.34309, 0],
                           [0.62871, 0.26935, 0],
                           [0.62871, 0.19837, 0]];

    _bezier_curve = new CubicBezierCurve(_control_points);


  }
  _init();

  this.travel = function(delta){
    var bezier_curve = _bezier_curve.travel(delta);

    bezier_curve.positions.forEach(function(elem,index){
      if(index % 3 == 0){
        that.radius.push(elem);
      } else if( (index + 2) % 3 == 0){
        that.axis.push(elem);
      }
    });

    bezier_curve.tangents.forEach(function(elem,index){
      if ((index + 2) % 3 == 0){
        that.normals.push(elem);
      }
    });
  }
}