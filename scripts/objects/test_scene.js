function TestScene() {
  var light = new Light([0.5, 0.5, 0.5],[-10.0, 10.0, -10.0]);

  var trapezoid = new Trapezoid3D(20,
                                  20,
                                  0.5,
                                  0.5,
                                  textures["checker"],
                                  basicShaderHandler,
                                  light,
                                  [0.05,0.05,0.05],
                                  false
                                  );
  
  // trapezoid.init();
  
  this.draw = function() {
    // trapezoid.activateShader();
    var transformations = mat4.create();
    mat4.scale(transformations,transformations,[20.0,1.0,20.0]);
    trapezoid.draw(transformations);
  }

}