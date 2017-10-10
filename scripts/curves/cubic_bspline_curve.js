function BSplineCurve(controlPoints = []) {

  this.controlPoints = controlPoints;

  function Base0(u) {
    return (1-3*u+3*u*u-u*u*u)*1/6;
  }  // (1 -3u +3u2 -u3)/6

  function Base1(u) {
    return (4-6*u*u+3*u*u*u)*1/6; 
  }  // (4  -6u2 +3u3)/6

  function Base2(u) {
    return (1+3*u+3*u*u-3*u*u*u)*1/6
  } // (1 -3u +3u2 -3u3)/6

  function Base3(u) {
    return (u*u*u)*1/6; 
  }  //    u3/6


  function Base0der(u) { 
    return (-3 +6*u -3*u*u)/6 
  }  // (-3 +6u -3u2)/6

  function Base1der(u) { 
    return (-12*u+9*u*u)/6 
  }   // (-12u +9u2)  /6

  function Base2der(u) { 
    return (3+6*u-9*u*u)/6;
  }  // (-3 +6u -9u2)/6

  function Base3der(u) { 
    return (3*u*u)*1/6; 
  }

  function calculatePositions(positions,u) {
    return Base0(u)*positions[0] + Base1(u)*positions[1] + Base2(u)*positions[2] + Base3(u)*positions[3];
  }

  function calculateTangents(positions,u) {
    return Base0der(u)*positions[0] + Base1der(u)*positions[1] + Base2der(u)*positions[2] + Base3der(u)*positions[3];
  }

  this.travels = function(delta = 0.01) {
    var positions = []; 
    var tangents = [];

    for (var offset = 0; offset + 3 < this.controlPoints.length; offset++) {
      x = this.controlPoints.slice(offset,offset+4).map(function(value,index){return value[0]});
      y = this.controlPoints.slice(offset,offset+4).map(function(value,index){return value[1]});
      z = this.controlPoints.slice(offset,offset+4).map(function(value,index){return value[2]});

      for (var t = 0; t <= 1; t += delta) {
        positions.push(calculatePositions(x,t));
        positions.push(calculatePositions(y,t));
        positions.push(calculatePositions(z,t));
        
        tangents.push(calculateTangents(x,t));
        tangents.push(calculateTangents(y,t));
        tangents.push(calculateTangents(z,t));
      }
    }

    return {
      positions: positions,
      tangents: tangents
    };
  }   
}