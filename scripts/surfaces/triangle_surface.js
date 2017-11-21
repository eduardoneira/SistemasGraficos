function TriangleSurface() {
  this.positions = [];
  this.normals = [];

  var control_points = [];

  control_points.push([0.0,0.0,0.0]);
  control_points.push([1.0,0.0,0.0]);
  control_points.push([1.0,0.0,0.0]);
  control_points.push([2.0,0.0,0.0]);
  
  control_points.push([1.0,1.0,0.0]);
  control_points.push([1.0,1.0,0.0]);
  control_points.push([0.0,2.0,0.0]);

  control_points.push([0.0,1.0,0.0]);
  control_points.push([0.0,1.0,0.0]);
  control_points.push([0.0,0.0,0.0]);

  var triangle = new CubicBezierCurve(control_points);

  this.discretize = function(delta) {
    data = triangle.travel(delta);
          
    this.positions = data.positions.filter(
      function(element,index) {
        return (index-2) % 3;
      });

    for (var i = 0; i < this.positions.length; i+=2) {
      if (this.positions[i] == 2.0 && this.positions[i+1] == 0.0) {
        this.normals.push(1);
        this.normals.push(0);
      } else if (this.positions[i] == 0.0 && this.positions[i+1] == 2.0) {
        this.normals.push(0);
        this.normals.push(1);
      } else if (this.positions[i] == 0.0 && this.positions[i+1] == 0.0) {
        this.normals.push(0);
        this.normals.push(0);
      } else if (this.positions[i+1] == 0) {
        this.normals.push(0);
        this.normals.push(-1);
      } else if (this.positions[i] == 0) {
        this.normals.push(-1);
        this.normals.push(0);
      } else {
        this.normals.push(1);
        this.normals.push(1);
      }
    }
  }

}