function ConstantRadiusProfile(radius,length) {
  this._radius = radius;
  this._length = length;
  this.axis = [];
  this.radius = [];
  this.normals = [];

  this.travel = function(delta) {
    for (var t = 0; t < 1+delta; t+=delta) {
      this.radius.push(this._radius);
      this.axis.push(t*this._length);
      this.normals.push(0);
    }
  }
}