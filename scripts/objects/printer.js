function Printer(light) {
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
    
    traveler = new PrintableTraveler(deltaX,deltaZ,deltaY,object_to_print.position_buffer);
    var current = traveler.square(curY);
    var finished = false;

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