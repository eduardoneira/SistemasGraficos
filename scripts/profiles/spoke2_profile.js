function Spoke2Profile(){
  this.radius = [];
  this.axis = [];
  this.normals = [];
  this.positions = [];

  var _bezier_curve;
  var that = this;


  function _init(){
    var _control_points = [[1.0000-0.15,  0.0537, 0],
                           [1.0000-0.15,  0.1160, 0],
                           [0.8886-0.15,  0.1511, 0],
                           [0.7968-0.15,  0.1511, 0],
                           [0.6442-0.15,  0.1511, 0],
                           [0.4972-0.15,  0.0931, 0],
                           [0.3487-0.15,  0.0580, 0],
                           [0.2559-0.15,  0.0361, 0],
                           [0.1582-0.15,  0.0494, 0],
                           [0.0629-0.15,  0.0494, 0],
                           [0.0082-0.15,  0.0494, 0],
                           [0.0001-0.15,  0.0537, 0],
                           [0.0001-0.15,  0.0002, 0]];

          
 
    _bezier_curve = new CubicBezierCurve(_control_points);


  }
  _init();

  this.travel = function(delta){
    var bezier_curve = _bezier_curve.travel(delta);

    // debugger;

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