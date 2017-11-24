function SurfaceCircle(_radius) {
  this._circle = new CurveCircle(_radius);
  this.positions = [];
  this.normals = [];

  this.discretize = function(delta) {
    this._circle.travel(delta);
    this.positions = this._circle.points.filter(
    	function(element,index) {
    		return (index-2) % 3;
    	});

    this.normals = this.positions.slice();
    this.tangents = [];

    for(var i = 0; i < this.positions.length; i+=2){
      this.tangents.push = -this.positions[i+1];
      this.tangents.push = this.positions[i];
    }
  }

}