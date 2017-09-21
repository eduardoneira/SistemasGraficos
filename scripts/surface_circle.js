function SurfaceCircle(_radius) {
  this._circle = new CurveCircle(_radius);
  this.positions = []

  this.discretize = function(delta) {
    this._circle.travel(delta);
    this.positions = this._circle.positions.filter(function(element,index) {return ((index-2) % 3 )});
  }

}