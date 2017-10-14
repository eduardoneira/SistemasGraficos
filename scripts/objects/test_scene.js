function TestScene() {
  var light = new Light([0.5, 0.5, 0.5],[-10.0, 10.0, -10.0]);

  // var triangle = new TriangleRectangle( 20,
  //                                       20,
  //                                       textures["checker"],
  //                                       basicShaderHandler,
  //                                       light,
  //                                       [0.05,0.05,0.05],
  //                                       false
  //                                       );
  
  // triangle.init();
  
  var triangleLoft = new TriangleLoft(textures["checker"],
                                      basicShaderHandler,
                                      light,
                                      [0.1, 0.1, 0.1]);

  this.draw = function() {
    var transformations = mat4.create();
    // mat4.scale(transformations,transformations,[20.0,1.0,20.0]);
    triangleLoft.draw(transformations);
  }

}