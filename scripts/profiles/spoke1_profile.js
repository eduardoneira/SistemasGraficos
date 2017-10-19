function Spoke1Profile(){
  this.radius = [];
  this.axis = [];
  this.normals = [];
  this.positions = [];

  var _bspline_curve;
  var that = this;


  function _init(){
    var _control_points = [[0.62348, 0.00000, 0],
                           [0.62348, 0.10383, 0],
                           [0.47810, 0.12770, 0],
                           [0.31576, 0.06714, 0],
                           [0.16009, 0.06714, 0],
                           [0.15001, 0.06310, 0],
                           [0.14266, 0.05600, 0],
                           [0.13848, 0.04627, 0],
                           [0.13848, 0.00000, 0]];

    _bspline_curve = new BSplineCurve(_control_points);


  }
  _init();

  this.travel = function(delta){
    var bspline_curve = _bspline_curve.travels(delta);

    // debugger;

    // bspline_curve.positions.forEach(function(elem,index){
    //   if(index % 3 == 0){
    //     that.radius.push(elem);
    //     that.positions.push(elem);
    //   } else if( (index + 2) % 3 == 0){
    //     that.axis.push(elem);
    //     that.positions.push(elem);
    //   }
    //   // debugger;
    // });

    bspline_curve.positions.forEach(function(elem,index){
      if(index % 3 != 2){
        that.positions.push(elem);
      }
    });

    // debugger;

    // debugger;

    // bspline_curve.tangents.forEach(function(elem,index){
    //   if ((index + 2) % 3 == 0){
    //     that.normals.push(elem);
    //   }
    // });

    this.normals = this.positions.slice();

  }
}