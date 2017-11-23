function SceneController(printer, lights) {
  var printer = printer;
  var lights = lights;

  var _start = function() {
    if (!printer.busy()) {
      printer.startPrinting(app);
    } 
  }

  var _resume = function() {
    printer.resumePrinting();
  }

  var _stop = function() {
    printer.stopPrinting();
  }

  var _cancel = function() {
    printer.discardPrinting();
  }

  var app = {
    mode: "Lathe",
    contour: 1,
    angle_torsion: 0,
    start: _start,
    stop: _stop,
    cancel: _cancel,
    lights: [1.0, 1.0, 1.0, 1.0],
    maps: 1,
    color: 1.0,
    diffuseMapIntensity: 1.0,
    glossiness: 50,
    specularIntensity: 1.0 
  }

  function possibleContours() {
    if (app.mode == "Lathe") {
      return generateArrayAlpha(printer.number_of_lathe_contours);
    } else if (app.mode == "Loft") {
      return generateArrayAlpha(printer.number_of_loft_contours);
    } else {
      return generateArrayAlpha(1);
    }
  }

  function updatePanel() {
    if (contour_controller != null)
      contour_controller.remove();

    if (angle_controller != null)
      angle_controller.remove();

    app.contour = 1;

    contour_controller = shape_configuration.add(app,'contour',possibleContours()).name("Contour");
    contour_controller.updateDisplay();

    if (app.mode == "Loft") {
      angle_controller = shape_configuration.add(app,'angle_torsion',0,360).name("Angle");
      angle_controller.updateDisplay();
    } else {
      angle_controller = null;
    }
  }

  var gui = new dat.GUI();

  var intensity_lights = gui.addFolder('Lights');
  var lights_controller = [];

  for (var i = 0; i < app.lights.length; i++) {
    lights_controller.push(intensity_lights.add(app.lights,i.toString(),0.0,1.0).name((i+1).toString()));
  }
  
  for (var i = 0; i < lights_controller.length; i++) {
    lights_controller[i].onChange(function() {
      for (var i = 0; i < lights_controller.length; i++) {
        lights.lights[i].intensity = app.lights[i];
      }
      debugger; 
    });
  }


  var shape_configuration = gui.addFolder('Shape Configuration');
  var mode_controller = shape_configuration.add(app,'mode',["Lathe","Loft"]).name("Mode");
  var contour_controller = null;
  var angle_controller = null;

  updatePanel();
  mode_controller.onChange(updatePanel);

  var light_configuration = gui.addFolder('Light Configuration');
  light_configuration.add(app,'maps',generateArrayAlpha(4)).name('Map');
  light_configuration.add(app,'color',0.0,1.0).name('Base Color');
  light_configuration.add(app,'diffuseMapIntensity',0.0,1.0).name('Diffuse Map Intensity');
  light_configuration.add(app,'glossiness',1,100).name('Glossiness');
  light_configuration.add(app,'specularIntensity',0.0,1.0).name('Specular Intensity');

  var commands = gui.addFolder('Commands');
  commands.add(app,'start').name('Start/Resume');  
  commands.add(app,'stop').name('Stop');  
  commands.add(app,'cancel').name('Discard');
}