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

  function _maxCountours() {
    if (app.mode == "Lathe") {
      return generateArrayAlpha(3);
    } else if (app.mode == "Loft") {
      return generateArrayAlpha(5);
    } else {
      return generateArrayAlpha(1);
    }
  }

  var gui = new dat.GUI();

  var configuration = gui.addFolder('Configuration');
  configuration.add(app,'mode',["Lathe","Loft"]).name("Mode");
  configuration.add(app,'angle_torsion',0,720).name("Angle");
  configuration.add(app,'contour',[1,_maxCountours(app.mode)]).name("Contour").listen();


  var commands = gui.addFolder('Commands');
  commands.add(app,'start').name('Start');  
  commands.add(app,'stop').name('Stop');  
  commands.add(app,'cancel').name('Discard');  

}

var panel = Panel();