function Printer() {
  Object3D.call(this, null, null, null, null, null, null);

  var object_to_print = null;
  var printing = false;
  var height = 0;
  var sweep_angle = 0; // va a recorrer en sentido horario al plano xy 

  var lathe_contours = [];
  var loft_contours = [];

  this.startPrinting = function(config) {
    if (config.mode == "Lathe") {
      object_to_print = new Lathe(lathe_contours[config.contour],
                                  Math.PI/36.0,
                                  textures["checker"],
                                  basicShaderHandler, // TODO: change shader
                                  light,
                                  [0.1, 0.1, 0.1]
                                  )
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
  }

  function head_position() {
    var angle = time;
  }

  this._drawChilds = function() {
    if (object_to_print != null) {
      // set z through t
      object_to_print.draw(mat4.create());
    }
  }

  this.number_of_lathe_contours = lathe_contours.length;
  this.number_of_loft_contours = loft_contours.length;

}

inheritPrototype(Printer,Object3D);