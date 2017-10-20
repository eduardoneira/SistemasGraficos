function Camera(radius = 15, speed = 0.003) {
  this.prev_x = 0;
  this.prev_y = 0;
  this.alfa = Math.PI/2;
  this.beta = Math.PI/2;
  this.radius = radius;
  this.speed = speed;
  this.prev_look_at = mat4.create();

  this.is_mouse_down = false;
  this.mouse_wheel_triggered = false;
  this.reset_position = true;
  this.switch_mode = true;

  var that = this;
  this.robot = null;

  this.mouse = {
    x: 0,
    y: 0
  }  

  function position_scene() {
    return [0.0,5.0,0.0];
  }

  function position_printer() {
    return [0.0,4,10.0];
  }

  function position_bookcase() {
    return [0.0,5.0,-20.0];
  }

  //TODO: Add listener to robot position
  function position_robot() {
    return that.robot.position();
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
  
  $('#contenedor3d').mousedown(function(event) {   
    that.is_mouse_down = true;        
  });

  $('body').mouseup(function(event) {
    that.reset_position = true;
    that.is_mouse_down = false;    
  });

  $('#contenedor3d').mousewheel(function(event) {
    that.mouse_wheel_triggered = true;
    if (event.deltaY > 0) {
      that.radius -= 0.5;   
    } else {
      that.radius += 0.5;   
    }
  });

  $('body').on("keydown",function(event){
    var key_pressed = event.key;

    if (key_pressed == "+") {
      that.radius -= 0.5;
      that.mouse_wheel_triggered = true;
    }

    if (key_pressed == "-") {
      that.radius += 0.5;
      that.mouse_wheel_triggered = true;
    }

    if (that.modes[key_pressed] != undefined && key_pressed != that.current_mode) {
      that.current_mode = key_pressed;
      that.switch_mode = true;
    }      
  });

  this.getViewMatrix = function() {
    if (this.is_mouse_down || this.mouse_wheel_triggered || this.switch_mode || this.current_mode == "4") {
      var deltaX = 0;
      var deltaY = 0;
      
      if (!this.reset_position && !this.mouse_wheel_triggered) {
        deltaX = this.mouse.x - this.prev_x;
        deltaY = this.mouse.y - this.prev_y;
      }

      if (!this.switch_mode){
        this.reset_position = false;
      }

      this.switch_mode = false;

      this.prev_x = this.mouse.x;
      this.prev_y = this.mouse.y;

      this.mouse_wheel_triggered = false;

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