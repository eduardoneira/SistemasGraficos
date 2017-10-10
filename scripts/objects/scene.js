function Scene() {
    var light = new Light([0.5, 0.5, 0.5],[-10.0, 10.0, -10.0]);

    var floor = new Plane(100,
                          100,
                          textures["floor"],
                          basicShaderHandler,
                          light,
                          [0.1, 0.1, 0.1],
                          true
                         );
    floor.init();

    var printer = new Printer(light,textures["metallic_black"]);
    var printer_controller = new PrinterController(printer);
    var bookcase = new BookCase(6,
                                3,
                                0.5,
                                textures["wood"],
                                basicShaderHandler,
                                light,
                                [0.05,0.05,0.05],
                                false);

  this.draw = function() {
    var printer_transformations = mat4.create();
    mat4.scale(printer_transformations,printer_transformations,[2.0,1.0,2.0]);
    printer.draw(printer_transformations);

    var bookcase_transformations = mat4.create();
    mat4.scale(bookcase_transformations,bookcase_transformations,[2.0,2.0,2.0]);
    mat4.translate(bookcase_transformations,bookcase_transformations,[-2.5,0.0,-10.0]);
    bookcase.draw(bookcase_transformations);

    var floor_transformations = mat4.create();
    mat4.scale(floor_transformations,floor_transformations,[200.0,1.0,200.0]);
    floor.activateShader();
    floor.draw(floor_transformations);
  }
}