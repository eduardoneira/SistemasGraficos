function SurfaceCircle(_radius) {
  this._circle = new Circle(_radius);
  this.positions = []

  this.travel = function(delta) {
    this._circle.travel(delta);
    this.positions = this._circle.positions.filter(function(element,index) {(index-2) % 3});
  }

}