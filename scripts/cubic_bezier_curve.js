//PRE: "value", Expects [][]
function CubicBezierCurve(_controlPoints = []) {

  this.controlPoints = _controlPoints;

  if ((this.controlPoints.length - 4) % 3 != 0 ) {
    throw "ERROR: wrong number of control points";
  }

  function _transverse_curve(points,t) {
    var a = points[0]*((1-t)**3);
    var b = 3*points[1]*((1-t)**2)*t;
    var c = 3*points[2]*(1-t)*(t**2);
    var d = points[3]*(t**3);
    return a+b+c+d;
  }

  function _transverse_tangent(points,t) {
    var a = 3*(points[1] - points[0])*((1-t)**2);
    var b = 6*(points[2] - points[1])*(1-t)*t;
    var c = 3*(points[3] - points[2])*(t**2);
    return a+b+c;
  }
  
  function _transverse_normal(points,t) {
    var a = 6*(points[2] - 2*points[1] - points[0])*(1-t);
    var b = 6*(points[3] - 2*points[2] - points[1])*t;
    return a+b;
  }

  this.travel = function(delta = 0.01) {

    var positions = [];
    var tangents = [];
    var normals = [];   
    
    for (var offset = 0; offset + 3 < this.controlPoints.length; offset+=3) {
      x = this.control_points.slice(offset,offset+4).map(function(value,index){return value[0]});
      y = this.control_points.slice(offset,offset+4).map(function(value,index){return value[1]});
      z = this.control_points.slice(offset,offset+4).map(function(value,index){return value[2]});
 
      for (var t = 0; t <= 1; t += delta) {
        positions.push(_transverse_curve(x,t));    
        positions.push(_transverse_curve(y,t));    
        positions.push(_transverse_curve(z,t));    
        tangents.push(_transverse_tangent(x,t));    
        tangents.push(_transverse_tangent(y,t));    
        tangents.push(_transverse_tangent(z,t));    
        normals.push(_transverse_normal(x,t));    
        normals.push(_transverse_normal(y,t));    
        normals.push(_transverse_normal(z,t));    
      }
    }
  
  return {
          positions: positions,
          tangents: tangents,
          normals: normals
         }
  }

}