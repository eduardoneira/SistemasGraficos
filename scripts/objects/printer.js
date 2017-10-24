function Printer(light, texture) {
  Object3D.call(this, null, null, null, null, null, null);
  this.drawEnabled = false;

  var that = this;

  this.robot = null;
  var object_to_print = null;
  var printing = false;
  var finished = false;
  var locked = false;

  var curY = -1;
  var curX = 0;
  var curZ = 0;
  var deltaX = 1;
  var deltaY = 1;
  var deltaZ = 1;
  var traveler = null;

  var vertical_scale = 2.0;
  this.position = [];

  this.busy = function() {
    return printing || locked;
  }

  this.getWidthObject = function(maxY) {
    var width = [];
    return traveler.maxWidth(maxY)/traveler.maxY;
  }  

  this.getHeightObject = function() {
    return traveler.maxY;
  }

  this.unlock = function() {
    locked = false;
    this.discardPrinting();
  }

  this.releaseObject = function() {
    var object = object_to_print;
    object_to_print = null; 
    finished = false;
    locked = false;
    object.activateShader();
    return object;
  }

  var profile1 = new ConstantRadiusProfile(2,10);
  profile1.travel(0.01);

  var profile2 = new Base1Profile();
  profile2.travel(0.01);

  var lathe_contours = [{profile: profile1, scale: [1.5,1.2,1.5]}, 
                        {profile: profile2, scale: [1.0,1.0,1.0]}];

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
    var object = null;

    if (config.mode == "Lathe") {
      object = new Lathe( lathe_contours[config.contour - 1].profile,
                          Math.PI/36.0,
                          textures["checker"],
                          printableObjectShaderHandler,
                          light,
                          [0.1, 0.1, 0.1]
                          );
      object.init();
    } else if (config.mode == "Loft") {
      //TODO: ricky
    }
    
    traveler = new PrintableTraveler(deltaX,deltaZ,deltaY,object.position_buffer);
    finished = false;
    locked = false;

    object_to_print = new PrintedObject(object,
                                        lathe_contours[config.contour - 1].scale,        
                                        traveler.maxY);

    this.resumePrinting();
  }

  this.stopPrinting = function() {
    printing = false;
  }

  this.resumePrinting = function() {
    printing = true;
  }

  this.discardPrinting = function() {
    if (!locked) {  
      object_to_print = null;
      printing = false;
      finished = false;
      curY = -1;
      curX = 0;
      curZ = 0;
    }
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
            if (curY >= traveler.maxY + deltaY) {
              if (that.robot) {
                that.robot.activate();
              }
              locked = true;
              finished = true;
              printing = false;
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
    if (this.position.length == 0) {
      vec3.add(this.position,[0,0,0],getPositionMat4(transformations));
    }

    var printer_transformations = mat4.create();
    mat4.scale(printer_transformations,printer_transformations,[1.2,vertical_scale,1.2]);
    mat4.multiply(printer_transformations,transformations,printer_transformations);
    shelve.draw(printer_transformations);
    
    if (object_to_print) {
      object_to_print.activateShader();
      head_position();
      vec3.add(this.position,getPositionMat4(transformations),[0.0,vertical_scale*2,0.0]);    
      object_to_print.draw(this.position);
    }
  }

  this.number_of_lathe_contours = lathe_contours.length;
  this.number_of_loft_contours = loft_contours.length;

}

inheritPrototype(Printer,Object3D);