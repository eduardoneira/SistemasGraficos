function PrinterController(printer) {
  var printer = printer;
  var printing = false;

  // Comandos
  var _start = function() {
    if (!printing) {
      printing = true;
      printer.startPrinting(app);
    } 
  }

  var _resume = function() {
    printer.resumePrinting();
    printing = true;
  }

  var _stop = function() {
    printing = false;
    printer.stopPrinting();
  }

  var _cancel = function() {
    printing = false;
    printer.discarPrinting();
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
      return generateArrayAlpha(3);
    } else if (app.mode == "Loft") {
      return generateArrayAlpha(5);
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

// var panel = Panel();