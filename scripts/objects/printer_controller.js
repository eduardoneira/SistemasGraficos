function PrinterController(printer) {
  var printer = printer;

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
    cancel: _cancel
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

    contour_controller = configuration.add(app,'contour',possibleContours()).name("Contour");
    contour_controller.updateDisplay();

    if (app.mode == "Loft") {
      angle_controller = configuration.add(app,'angle_torsion',0,360).name("Angle");
      angle_controller.updateDisplay();
    } else {
      angle_controller = null;
    }
  }

  var gui = new dat.GUI();

  var configuration = gui.addFolder('Configuration');
  var mode_controller = configuration.add(app,'mode',["Lathe","Loft"]).name("Mode");
  var contour_controller = null;
  var angle_controller = null;

  updatePanel();
  mode_controller.onChange(updatePanel);

  var commands = gui.addFolder('Commands');
  commands.add(app,'start').name('Start/Resume');  
  commands.add(app,'stop').name('Stop');  
  commands.add(app,'cancel').name('Discard');  

}