function Scene() {
  var lights = {  lights: [ new Light([-7.0, 5.0, -23.0], 1.0),
                            new Light([ 7.0, 5.0, -23.0], 1.0),
                            new Light([-5.0, 4.0,  10.0], 1.0),
                            new Light([ 5.0, 4.0,  10.0], 1.0)],
                  specs: defaultLightSpecs()
                };

  var floor = new Plane(25,
                        25,
                        textures["alfombra"],
                        phongShaderHandler,
                        lights,
                        materialSpecs([1.0,1.0,1.0],
                                      [1.0,1.0,1.0],
                                      [0.0,0.0,0.0],
                                      1),
                        true,
                        textures["normal_map_alfombra"]
                       );
  floor.init();

  var printer = new Printer(lights,textures["metallic_black"],defaultMaterialSpecs());
  var scene_controller = new SceneController(printer,lights);

  var bookcase = new BookCase(6,
                              3,
                              1.5,
                              textures["madera1"],
                              phongShaderHandler,
                              lights,
                              defaultMaterialSpecs(),
                              textures['normal_map_madera1']);

  var scale_bookcase = [2.0,2.0,2.0];
  bookcase.scale_bookcase_position(scale_bookcase);

  var robot = new Robot(printer, bookcase, lights);
  printer.robot = robot;
  camera.robot = robot;

  this.draw = function() {
    var printer_transformations = mat4.create();
    mat4.translate(printer_transformations, printer_transformations, [0.0,0.0,10.0])
    mat4.scale(printer_transformations,printer_transformations,[2.0,1.0,2.0]);
    printer.draw(printer_transformations);

    var bookcase_transformations = mat4.create();
    mat4.translate(bookcase_transformations,bookcase_transformations,[-5.0,0.0,-20.0]);
    mat4.scale(bookcase_transformations,bookcase_transformations,scale_bookcase);
    bookcase.draw(bookcase_transformations);

    var floor_transformations = mat4.create();
    mat4.translate(floor_transformations,floor_transformations,[0.0,0.0,-5.0]);
    mat4.scale(floor_transformations,floor_transformations,[20.0,1.0,35.0]);
    floor.draw(floor_transformations);

    var robot_transformations = mat4.create();
    mat4.rotate(robot_transformations,robot_transformations,degToRad(90),[0.0,1.0,0.0]);
    mat4.scale(robot_transformations,robot_transformations,[0.32,0.32,0.32]);
    robot.draw(robot_transformations);
  }
}