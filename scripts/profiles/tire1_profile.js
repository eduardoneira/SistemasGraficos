function Tire1Profile(){
  this.radius = [];
  this.axis = [];
  this.normals = [];
  this.positions = [];

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
                           // [0.6176, 0.3857, 0],
                           [0.6176, 0.4675, 0],
                           [0.6408, 0.6026, 0],
                           [0.6828, 0.6678, 0],
                           [0.7495, 0.7713, 0],
                           [0.8539, 0.7166, 0],
                           [0.9614, 0.6564, 0],
                           [0.9838, 0.6439, 0],
                           [0.9900, 0.6056, 0],
                           [0.9907, 0.5999, 0]];

    // var suma = 0;

    // _control_points.forEach(function(elem){
    //   suma += elem[0];
    // });

    // suma /= _control_points.length;

    // for(var i = 0; i < _control_points.length; i++){
    //   _control_points[i][0] -= suma;
    //   _control_points[i][0] *= -1;
    //   _control_points[i][0] += suma;
    // }

    // debugger;


    _bezier_curve = new CubicBezierCurve(_control_points);


  }
  _init();

  this.travel = function(delta){
    var bezier_curve = _bezier_curve.travel(delta);

    // debugger;

    // bezier_curve.positions.forEach(function(elem,index){
    //   if(index % 3 == 1){
    //     that.radius.push(elem);
    //     that.positions.push(elem);
    //   } else if( (index + 2) % 3 == 0){
    //     that.axis.push(elem);
    //     that.positions.push(elem);
    //   }
    //   // debugger;
    // });

    for(var i = 0; i < bezier_curve.positions.length; i+=3){
      that.positions.push(bezier_curve.positions[i]);
      that.positions.push(bezier_curve.positions[i+1]);
    }

    // debugger;

    // bezier_curve.tangents.forEach(function(elem,index){
    //   if ((index + 2) % 3 == 0){
    //     that.normals.push(elem);
    //   }
    // });

    this.normals = this.positions.slice();

  }
}