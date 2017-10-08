function Printer(light) {
  Object3D.call(this, null, null, null, null, null, null);
  this.drawEnabled = false;

  var object_to_print = null;
  var printing = false;
  var height = 0;
  var deltaHeight = 1;
  var sweep_angle = 0; // va a recorrer en sentido horario al plano xy 

  var lathe_contours = [];
  var loft_contours = [];

  var light = light;

  this.startPrinting = function(config) {
    if (config.mode == "Lathe") {
      var profile = new ConstantRadiusProfile(4,20);
      profile.travel(0.01);
      object_to_print = new Lathe(profile,
                                  Math.PI/36.0,
                                  textures["checker"],
                                  printableObjectShaderHandler,
                                  light,
                                  [0.1, 0.1, 0.1]
                                  );
      object_to_print.init();
    } else if (config.mode == "Loft") {
      //TODO: ricky
    }

    this.resumePrinting();
  }

  this.stopPrinting = function() {
    printing = false;
  }

  this.resumePrinting = function() {
    printing = true;
  }

  this.discardPrinting = function() {
    printing = false;
    object_to_print = null;
    height = 0;
    sweep_angle = 0;
  }

  function head_position() {
    if (printing) {
      sweep_angle += degToRad(5);
      
      if (sweep_angle > Math.PI) {
        sweep_angle = -1.0 * Math.PI;
        height += deltaHeight;
      }
    }

    gl.uniform1f(printableObjectShaderHandler.uMaxY,height);
    gl.uniform1f(printableObjectShaderHandler.uDeltaY,deltaHeight);
    gl.uniform1f(printableObjectShaderHandler.uMaxAngle,sweep_angle);
    gl.uniform3fv(printableObjectShaderHandler.uPositionPrinter,[0.0,0.0,0.0]);
  }

  this._drawChilds = function(transformations) {
    if (object_to_print != null) {
      object_to_print.activateShader();
      head_position();
      object_to_print.draw(transformations);
    }
  }

  this.number_of_lathe_contours = lathe_contours.length;
  this.number_of_loft_contours = loft_contours.length;

}

inheritPrototype(Printer,Object3D);