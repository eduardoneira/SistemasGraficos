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

    var circulo = makeFlatCircle(_radius, M);

    for(var i = 0; i < Math.floor(circulo.length/2)+1; i+=3){
      _control_points.push([circulo[i],
                            circulo[i+1],
                            circulo[i+2]]);
    }

    var i_xmax = i - 3;

    for(var i = 0; i < 4; i++){
      _control_points.push([circulo[i_xmax],
                            circulo[i_xmax+1] - offset/4*i,
                            circulo[i_xmax+2]]);
    }

    for(var i = i_xmax; i < circulo.length; i+=3){
      _control_points.push([circulo[i],
                            circulo[i+1] - offset,
                            circulo[i+2]]);
    }

    _control_points.push([circulo[0],
                         circulo[1] - offset,
                         circulo[2]]);

    for(var i = 4; i >= 0; i--){
      _control_points.push([circulo[0],
                            circulo[1] - offset/4*i,
                            circulo[2]]);
    }

    debugger;
  }

  _init();
  this.travel(delta){
    
  }

}