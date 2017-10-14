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
          
    var polygon = new Polygon(data.positions);

    this.positions = polygon.points.filter(
      function(element,index) {
        return (index-2) % 3;
      });

    this.normals = polygon.normals.slice();
  }

}