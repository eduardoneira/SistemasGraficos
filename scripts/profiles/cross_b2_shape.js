function CrossB2Shape(){
  this.normals = [];
  this.positions = [];

  var _bezier_curve;
  var that = this;

  var _radius = 1;
  var M = 8;
  var inset = 0.6;

  function _init(){
    var _control_points = [];

    var puntas = makeFlatCircle(_radius, M);

    var rotFW = mat4.create();
    var rotBW = mat4.create();
    var scale_inward = mat4.create();
    var is_first = true;

    mat4.rotate(rotFW, rotFW, Math.PI*2/M*0.2, [0,0,1]);    
    mat4.rotate(rotBW, rotBW, -Math.PI*2/M*0.2, [0,0,1]);    
    mat4.scale(scale_inward, scale_inward, [inset, inset, inset]);

    for(var i = 0; i < puntas.length; i+=3){

      if(!is_first){
        aux = vec3.fromValues(puntas[i],
                              puntas[i+1],
                              puntas[i+2]);

        vec3.transformMat4(aux, aux, rotBW);
        vec3.transformMat4(aux, aux, scale_inward);

        _control_points.push([aux[0],
                              aux[1],
                              aux[2]]);

      }


      var aux = vec3.fromValues(puntas[i],
                                puntas[i+1],
                                puntas[i+2]);

      vec3.transformMat4(aux, aux, rotFW);

      _control_points.push([puntas[i],
                            puntas[i+1],
                            puntas[i+2]]);

      _control_points.push([0.2*aux[0] + 0.8*puntas[i],
                            0.2*aux[1] + 0.8*puntas[i+1],
                            0.2*aux[2] + 0.8*puntas[i+2]]);

      _control_points.push([0.8*aux[0] + 0.2*puntas[i],
                            0.8*aux[1] + 0.2*puntas[i+1],
                            0.8*aux[2] + 0.2*puntas[i+2]]);

      _control_points.push([aux[0],
                            aux[1],
                            aux[2]]);

      vec3.transformMat4(aux, aux, rotFW);
      vec3.transformMat4(aux, aux, scale_inward);

      _control_points.push([aux[0],
                            aux[1],
                            aux[2]]);

      if(is_first){
        is_first = false;
      }

    }

    aux = vec3.fromValues(puntas[0],
                          puntas[1],
                          puntas[2]);

    vec3.transformMat4(aux, aux, rotBW);
    vec3.transformMat4(aux, aux, scale_inward);

    _control_points.push([aux[0],
                          aux[1],
                          aux[2]]);

    _control_points.push([puntas[0],
                          puntas[1],
                          puntas[2]]);

    for(var i = 0; i < _control_points.length; i++){
      _control_points[i][0] /= 2;
      _control_points[i][1] /= 2;
    }
    
    _bezier_curve = new CubicBezierCurve(_control_points);

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