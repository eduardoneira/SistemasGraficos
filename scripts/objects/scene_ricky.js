function SceneRicky() {
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);

  var delta = 0.01;

  var shape = new CrossB2Shape();
  shape.travel(0.1);

  var sweep_path = new StraightLineSweep();

  var spoke = new Loft(shape, sweep_path, textures["checker"], 0.05, phongShaderHandler, light, [0.1, 0.1, 0.1]);
  spoke.init();
  spoke.translate([0,0,0]);
  // spoke.translate([0,5,1.8,0]);
  spoke.scale([5,5,5]);


  this.draw = function() {
    spoke.activateShader();
    
    transformations = mat4.create();
    
    mat4.rotate(transformations, transformations, time, [0.0, 1.0, 0.0]);
    // mat4.rotate(transformations, transformations, 90, [0.0, 0.0, 1.0]);
    // mat4.translate(transformations, transformations, [0.0, -6.5, 0.0]);
    // mat4.scale(transformations, transformations, [5.0,5.0,5.0]);
    
    // debugger;
    spoke.draw(transformations);
  }

}