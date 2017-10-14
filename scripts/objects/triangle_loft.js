function TriangleLoft(texture) {
  var line = new CurvePath( [0.0,0.0,0.0],
                            [1.0,0.0,0.0],
                            [3.0,0.0,0.0],
                            [4.0,0.0,0.0])

  var shape = new TriangleSurface();
  shape.discretize(0.01);  

  var sweep_path = new Polygon(line.positions);

  var loft = new Loft(shape, 
                      sweep_path, 
                      textures["checker"], 
                      0, 
                      basicShaderHandler, 
                      light, 
                      [0.1, 0.1, 0.1]);
  loft.init();

}