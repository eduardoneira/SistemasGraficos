function TriangleLoft(length, texture, shader, light, diffuseColor) {
  var line = new Line(length);

  line.travel(0.01);

  var shape = new TriangleSurface();
  shape.discretize(0.01);  

  var sweep_path = new Polygon(line.points);

  var loft = new Loft(shape, 
                      sweep_path, 
                      texture, 
                      0, 
                      shader, 
                      light, 
                      diffuseColor);
  loft.init();

  //Tapas
  var triangle_left = new TriangleRectangle(20,
                                            20,
                                            texture,
                                            basicShaderHandler,
                                            light,
                                            diffuseColor,
                                            false
                                            );
  triangle_left.init();

  triangle_left.translate([0.0,0.0,2.0]);
  triangle_left.scale([1.0,2.0,2.0]);
  triangle_left.rotate(degToRad(270),[0.0,0.0,1.0]);
  triangle_left.rotate(degToRad(180),[1.0,0.0,0.0]);

  var triangle_right = new TriangleRectangle( 20,
                                              20,
                                              texture,
                                              basicShaderHandler,
                                              light,
                                              diffuseColor,
                                              false
                                              );
  triangle_right.init();

  triangle_right.translate([length,-2.0,0.0]);
  triangle_right.scale([1.0,2.0,2.0]);

  triangle_right.rotate(degToRad(180),[0.0,1.0,0.0]);
  triangle_right.rotate(degToRad(90),[1.0,0.0,0.0]);
  triangle_right.rotate(degToRad(90),[0.0,0.0,1.0]);
  triangle_right.rotate(degToRad(180),[0.0,1.0,0.0]);

  this.draw = function(transformations) {
    triangle_left.draw(transformations)
    triangle_right.draw(transformations)
    loft.draw(transformations);
  }

}