function Scene() {
  var lights = {  lights: [ new Light([-5.0, 3.0, -5.0], 10.0),
                            new Light([-5.0, 3.0,  5.0], 10.0),
                            new Light([ 5.0, 3.0, -5.0], 10.0),
                            new Light([ 5.0, 3.0,  0.0], 10.0)],
                  specs: defaultLightSpecs()
                };

  var floor = new Plane(100,
                        100,
                        textures["floor"],
                        phongShaderHandler,
                        lights,
                        defaultMaterialSpecs(),
                        true
                       );
  floor.init();

  var printer = new Printer(lights,textures["metallic_black"],defaultMaterialSpecs());
  // var scene_controller = new SceneController(printer);

  // var bookcase = new BookCase(6,
  //                             3,
  //                             1.5,
  //                             textures["wood"],
  //                             basicShaderHandler,
  //                             light,
  //                             [0.05,0.05,0.05],
  //                             false);

  // var scale_bookcase = [2.0,2.0,2.0];
  // bookcase.scale_bookcase_position(scale_bookcase);

  var robot = new Robot(null,null,lights, defaultMaterialSpecs());
  // var robot = new Robot(printer,bookcase,light, defaultMaterialSpecs());

  // printer.robot = robot;
  // camera.robot = robot;

  this.draw = function() {
    var printer_transformations = mat4.create();
    mat4.translate(printer_transformations, printer_transformations, [0.0,0.0,10.0])
    mat4.scale(printer_transformations,printer_transformations,[2.0,1.0,2.0]);
    printer.draw(printer_transformations);

    // var bookcase_transformations = mat4.create();
    // mat4.translate(bookcase_transformations,bookcase_transformations,[-5,0.0,-20.0]);
    // mat4.scale(bookcase_transformations,bookcase_transformations,scale_bookcase);
    // bookcase.draw(bookcase_transformations);

    var floor_transformations = mat4.create();
    mat4.scale(floor_transformations,floor_transformations,[50.0,1.0,50.0]);
    floor.draw(floor_transformations);

    var robot_transformations = mat4.create();
    mat4.rotate(robot_transformations,robot_transformations,degToRad(90),[0.0,1.0,0.0]);
    mat4.scale(robot_transformations,robot_transformations,[0.32,0.32,0.32]);
    robot.draw(robot_transformations);
  }
}