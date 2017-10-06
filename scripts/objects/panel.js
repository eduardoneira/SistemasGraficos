function Panel() {
  // Objeto actual
  var object = null;
  var height = 0;
  var sweep_angle = 0; // va a recorrer en sentido horario al plano xy 

  var finished = true;
  var stop_drawing = true;

  // Comandos
  var _start = function() {
    if (finished) {
      // crear objeto
    }
    _continue();
  }

  var _continue = function() {
    stop_drawing = false;
  }

  var _stop = function() {
    stop_drawing = true;
  }

  var _cancel = function() {
    object = null;
    finished = true;
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
  commands.add(app,'start').name('Start');  
  commands.add(app,'stop').name('Stop');  
  commands.add(app,'cancel').name('Discard');  

}

var panel = Panel();