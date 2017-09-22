function ConstantRadiusProfile(radius) {
  this.radius = radius;
  this.positions = [];

  this.travel = function(delta) {
    for (var t = 0; t <= 1; t+=delta) {
      this.positions.push(this.radius);
    }
  }
}