function Camera(radius = 15, speed = 0.01) {
  this.prev_x = 0;
  this.prev_y = 0;
  this.alfa = 0;
  this.beta = 0;
  this.radius = radius;
  this.speed = speed;
  this.prev_look_at = mat4.create();

  this.is_mouse_down = false;

  this.mouse = {
    x: 0,
    y: 0
  }  

  function position_scene() {
    return [0.0,0.0,0.0];
  }

  function position_printer() {
    return [20.0,20.0,10.0];
  }

  function position_bookcase() {
    return [-20.0,-20.0,10.0];
  }

  //TODO: Add listener to robot position
  function position_robot() {
    return [10.0,10.0,10.0];
  }

  this.current_mode = "1";

  this.modes = {
    "1": position_scene,
    "2": position_printer,
    "3": position_bookcase,
    "4": position_robot
  }

  var that = this;

  $("#contenedor3d").mousemove(function(e){ 
    that.mouse.x = e.clientX || e.pageX; 
    that.mouse.y = e.clientY || e.pageY; 
  });
  
  $('#contenedor3d').mousedown(function(event){   
    that.is_mouse_down = true;        
  });

  $('body').mouseup(function(event){
    that.is_mouse_down = false;    
  });

  $('#contenedor3d').bind('mousewheel', function(e){
    if (e.originalEvent.wheelDelta / 120 > 0) {
      if (that.radius > 1){
        that.radius -= 0.2;   
      }
    } else {
        that.radius += 0.2;   
    }
  });

  $('body').on("keydown",function(event){
    var key_pressed = event.key;

    if (that.modes[key_pressed] != undefined && key_pressed != that.current_mode) {
      that.current_mode = key_pressed;
      that.switch_mode = true;
    }      
  });

  this.getViewMatrix = function() {
    if (this.switch_mode){
      this.switch_mode = false;
      var center = this.modes[this.current_mode]();

      var eye = [
        center[0] + this.radius * Math.sin(this.alfa) * Math.sin(this.beta),
        center[1] + this.radius * Math.cos(this.beta),
        center[2] + this.radius * Math.cos(this.alfa) * Math.sin(this.beta)
      ];

      this.prev_look_at = mat4.lookAt(this.prev_look_at,
                                      eye,
                                      center,
                                      [0.0,1.0,0.0]); 
      
    } else if (this.is_mouse_down ) {
      var deltaX = this.mouse.x - this.prev_x;
      var deltaY = this.mouse.y - this.prev_y;

      this.prev_x = this.mouse.x;
      this.prev_y = this.mouse.y;

      this.alfa = this.alfa + deltaX * this.speed;
      this.beta = this.beta + deltaY * this.speed;

      if (this.beta < 0) 
        this.beta = 0;
      if (this.beta > Math.PI) 
        this.beta = Math.PI;

      var center = this.modes[this.current_mode]();

      var eye = [
        center[0] + this.radius * Math.sin(this.alfa) * Math.sin(this.beta),
        center[1] + this.radius * Math.cos(this.beta),
        center[2] + this.radius * Math.cos(this.alfa) * Math.sin(this.beta)
      ];

      this.prev_look_at = mat4.lookAt(this.prev_look_at,
                                      eye,
                                      center,
                                      [0.0,1.0,0.0]); 
    }

    return this.prev_look_at;
  }

}