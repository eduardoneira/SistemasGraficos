function Printer(light, texture) {
  Object3D.call(this, null, null, null, null, null, null);
  this.drawEnabled = false;

  var object_to_print = null;
  var printing = false;
  var finished = false;

  var curY = -1;
  var curX = 0;
  var curZ = 0;
  var deltaX = 1;
  var deltaY = 1;
  var deltaZ = 1;
  var traveler = null;

  var vertical_scale = 2.0;

  var lathe_contours = [];
  var loft_contours = [];

  var light = light;
  var shelve = new Shelve(1,
                          2,
                          texture,
                          basicShaderHandler,
                          light,
                          [0.1,0.1,0.1],
                          false);

  this.startPrinting = function(config) {
    if (config.mode == "Lathe") {
      var profile = new ConstantRadiusProfile(2,10);
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
    
    traveler = new PrintableTraveler(deltaX,deltaZ,deltaY,object_to_print.position_buffer);
    finished = false;

    this.resumePrinting();
  }

  this.stopPrinting = function() {
    printing = false;
  }

  this.resumePrinting = function() {
    printing = true;
  }

  this.discardPrinting = function() {
    object_to_print = null;
    printing = false;
    curY = -1;
    curX = 0;
    curZ = 0;
  }

  function head_position() {
    if (printing && !finished) {
      var current;
      
      if (curY == -1) {
        curY = 0;
        current = traveler.square(curY);
        curX = current["minX"];
        curZ = current["minZ"];
      } else {
        current = traveler.square(curY);
        curZ += deltaZ;
        
        if (curZ > current["maxZ"] + deltaZ) {
          curZ = current["minZ"];
          curX += deltaX;
          if (curX > current["maxX"] + deltaX) {
            curY += deltaY;
            if (curY > traveler.maxY + deltaY) {
              finished = true;
            } else {
              current = traveler.square(curY);
              curX = current["minX"];
              curZ = current["minZ"];
            }
          }
        } 
        
      }
    } 

    gl.uniform1f(printableObjectShaderHandler.uMaxY,curY);
    gl.uniform1f(printableObjectShaderHandler.uDeltaY,deltaY);
    gl.uniform1f(printableObjectShaderHandler.uMaxX,curX);
    gl.uniform1f(printableObjectShaderHandler.uDeltaX,deltaX);
    gl.uniform1f(printableObjectShaderHandler.uMaxZ,curZ);
    gl.uniform3fv(printableObjectShaderHandler.uPositionPrinter,[0.0,0.0,0.0]);
  }

  this._drawChilds = function(transformations) {
    var printer_transformations = mat4.create();
    mat4.scale(printer_transformations,printer_transformations,[1.2,vertical_scale,1.2]);
    mat4.multiply(printer_transformations,transformations,printer_transformations);
    shelve.draw(printer_transformations);
    
    if (object_to_print != null) {
      object_to_print.activateShader();
      head_position();
      var object_to_print_transformations = mat4.create();
      mat4.translate(object_to_print_transformations,object_to_print_transformations,[0.0,vertical_scale*2,0.0]);
      mat4.scale(object_to_print_transformations,object_to_print_transformations,[1.0/traveler.maxY,1.0/traveler.maxY,1.0/traveler.maxY]);
      mat4.multiply(object_to_print_transformations,transformations,object_to_print_transformations);
      object_to_print.draw(object_to_print_transformations);
    }
  }

  this.number_of_lathe_contours = lathe_contours.length;
  this.number_of_loft_contours = loft_contours.length;

}

inheritPrototype(Printer,Object3D);