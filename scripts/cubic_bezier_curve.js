//PRE: "value", Expects [][]
function CubicBezierCurve(_controlPoints = []) {

  this.controlPoints = _controlPoints;

  if ((this.controlPoints.length - 4) % 3 != 0 ) {
    throw "ERROR: wrong number of control points";
  } else {
    this.number_of_curves = (this.controlPoints.length - 4) / 3;
    this.number_of_curves++; 
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
    var a = 6*(points[2] - 2*points[1] + points[0])*(1-t);
    var b = 6*(points[3] - 2*points[2] + points[1])*t;
    return a+b;
  }

  function makePositions(x,y,z,t){

    var positions_vect = vec3.create();
    positions_vect[0] = _transverse_curve(x,t);
    positions_vect[1] = _transverse_curve(y,t);
    positions_vect[2] = _transverse_curve(z,t);

    return positions_vect;
  }

  function makeTangents(x,y,z,t){

    var tangents_vect = vec3.create();
    tangents_vect[0] = _transverse_tangent(x,t);
    tangents_vect[1] = _transverse_tangent(y,t);
    tangents_vect[2] = _transverse_tangent(z,t);

    vec3.normalize(tangents_vect, tangents_vect);

    return tangents_vect;
  }

  function makeNormals(x,y,z,t){

    var normals_vect = vec3.create();
    normals_vect[0] = _transverse_normal(x,t);
    normals_vect[1] = _transverse_normal(y,t);
    normals_vect[2] = _transverse_normal(z,t);

    vec3.normalize(normals_vect, normals_vect);

    return normals_vect;
  }

  function makeBinormals(tangents_vect, normals_vect){

    var binormal_vect = vec3.create();
    vec3.cross(binormal_vect, tangents_vect, normals_vect);

    vec3.normalize(binormal_vect, binormal_vect);

    return binormal_vect;
  }

  this.travel = function(delta = 0.01) {

    var positions = [];
    var tangents = [];
    var normals = [];  
    var binormals = []; 
    
    for (var offset = 0; offset + 3 < this.controlPoints.length; offset+=3) {
      x = this.controlPoints.slice(offset,offset+4).map(function(value,index){return value[0]});
      y = this.controlPoints.slice(offset,offset+4).map(function(value,index){return value[1]});
      z = this.controlPoints.slice(offset,offset+4).map(function(value,index){return value[2]});

      for (var t = 0; t <= 1; t += delta) {

        var positions_vect = makePositions(x,y,z,t);
        concatVectorElems(positions, positions_vect);

        var tangents_vect = makeTangents(x,y,z,t);
        concatVectorElems(tangents, tangents_vect);

        var normals_vect = makeNormals(x,y,z,t);
        concatVectorElems(normals, normals_vect);

        var binormal_vect = makeBinormals(tangents_vect, normals_vect);
        concatVectorElems(binormals, binormal_vect);
      }
    }
  
  return {
          positions: positions,
          tangents: tangents,
          normals: normals,
          binormals: binormals
         }
  }

}