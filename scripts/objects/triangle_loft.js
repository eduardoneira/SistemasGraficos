function TriangleLoft(texture, shader, light, diffuseColor) {
  var line = new CurvePath( [[0.0,0.0,0.0],
                            [1.0,0.0,0.0],
                            [3.0,0.0,0.0],
                            [4.0,0.0,0.0]]);

  line.travel(0.01);

  var shape = new TriangleSurface();
  shape.discretize(0.01);  

  var sweep_path = new Polygon(line.positions);

  var loft = new Loft(shape, 
                      sweep_path, 
                      texture, 
                      0, 
                      shader, 
                      light, 
                      diffuseColor);
  loft.init();
  debugger;

  this.draw = function(transformations) {
    loft.draw(transformations);
  }

}