function ConstantRadiusProfile(radius,length) {
  this._radius = radius;
  this._length = length;
  this.axis = [];
  this.radius = [];

  this.travel = function(delta) {
    for (var t = 0; t <= 1; t+=delta) {
      this.radius.push(this._radius);
      this.axis.push(t*this._length);
    }
  }
}