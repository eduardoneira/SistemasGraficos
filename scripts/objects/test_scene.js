function TestScene() {
  var light = new Light([0.5, 0.5, 0.5],[-10.0, 10.0, -10.0]);

  var delta = 0.01;
  
  var profile = new ConstantRadiusProfile(4,20);
  profile.travel(delta);

  var lathe = new Lathe(profile,
                        Math.PI/18.0,
                        textures["checker"],
                        basicShaderHandler,
                        light,
                        [0.1, 0.1, 0.1]);
  lathe.init();

  var printer = new Printer();
  var printer_controller = new PrinterController(printer);

  this.draw = function() {
    lathe.activateShader();
    
    transformations = mat4.create();
    // mat4.rotate(transformations, transformations, time, [1.0, 1.0, 0.0]);
    mat4.translate(transformations, transformations, [0.0, -6.5, 0.0]);
    mat4.scale(transformations, transformations, [1.0,1.5,1.0]);
    
    projector.applyProjection();
    lathe.draw(transformations);
  }

}