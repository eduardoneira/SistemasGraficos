function Surface(_generatePoints,delta) {
  this.points = [];
  this.default_delta = delta;

  this.generatePoints = _generatePoints;

  this.generatePoints(this.default_delta);
}

circulo = function(delta) {
  
}