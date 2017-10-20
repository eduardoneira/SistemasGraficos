function Robot(printer, bookcase, light) {
  this.printer = printer;
  this.bookcase = bookcase;
  
  var printed_object_position = [];
  var shelve_position = [];
  var width_printer_object = 0;
  var max_height_printed_object = 0;

  var path_counter = 0;

  var possible_events = {
                          "free": { next: "calculate_positions", algorithm: do_nothing },
                          "calculate_positions": {next:"adjust_main_trunk_printer", algorithm: calculate_positions },
                          "adjust_main_trunk_printer": { next: "adjust_second_trunk_printer", algorithm: adjust_main_trunk_printer },
                          "adjust_second_trunk_printer": { next: "hold_object", algorithm: adjust_second_trunk_printer },
                          "hold_object": { next: "retract_second_trunk_printer", algorithm: hold_object },
                          "retract_second_trunk_printer": { next: "rotate_arm", algorithm: retract_second_trunk_printer },
                          "rotate_arm": { next: "move_to_bookcase", algorithm: rotate_arm },
                          "move_to_bookcase": { next: "adjust_main_trunk_bookcase", algorithm: move_to_bookcase },
                          "adjust_main_trunk_bookcase": { next: "adjust_second_trunk_bookcase", algorithm: adjust_main_trunk_bookcase },
                          "adjust_second_trunk_bookcase": { next: "leave_object", algorithm: adjust_second_trunk_bookcase },
                          "leave_object": { next: "retract_second_trunk_bookcase", algorithm: leave_object },
                          "retract_second_trunk_bookcase": { next: "rotate_arm_inverse", algorithm: retract_second_trunk_bookcase },
                          "rotate_arm_inverse": { next: "move_to_printer", algorithm: rotate_arm_inverse },
                          "move_to_printer": { next: "free", algorithm: move_to_printer }
                        };

  var busy = false;
  var relax = true;
  var current_event = "free";
  var current_event_finished = false;

  var path_to_travel = [];
  var current_position = null;

  var robot_upper_body = new RobotUpperBody(textures["metallic_white_with_holes"],
                                            light,
                                            [0.1, 0.1, 0.1]);

  var robot_lower_body = new LowerBody();

  var offset_upper = [0,2,0];
  var offset_lower = [0,0.4,0];

  this.activate = function() {
    if (busy) {
      relax = false;
    } else {
      current_event_finished = true;
    }
  }

  this.position = function() {
    return current_position;
  }

  this.draw = function(transformations) {
    if (current_event_finished) {
      current_event_finished = false;
      current_event = possible_events[current_event].next
    }

    possible_events[current_event].algorithm();
    
    if (!current_position) {
      current_position = printer.position.slice();
      current_position[1] = 0;
      current_position[2] -= 5;
    }

    var aux = mat4.create();
    mat4.translate(aux,aux,current_position);
    mat4.translate(aux,aux,offset_upper);
    mat4.multiply(aux,aux,transformations);
    robot_upper_body.draw(aux);

    aux = mat4.create();
    mat4.translate(aux,aux,current_position);
    mat4.translate(aux,aux,offset_lower);
    mat4.multiply(aux,aux,transformations);
    robot_lower_body.draw(aux);
  }

  function do_nothing() {}

  function create_path() {
    var control_points = [];
    var p1 = printed_object_position.slice();
    p1[1] = 0;
    p1[2] -= 5;

    var p5 = shelve_position.slice();
    p5[1] = 0;
    p5[2] += 5; 

    control_points.push(p1);
    control_points.push(p1);

    var p3 = p1.slice();
    p3[0] = (p1[0] + p5[0])/2.0;
    control_points.push(p3);

    p3[2] = (p1[2] + p5[2])/2.0;
    control_points.push(p3);

    control_points.push(p5);
    control_points.push(p5);

    var curve = new CuadraticBSplineCurve(control_points);
    path_to_travel = curve.travel(0.01);

    // debugger;
  }

  function calculate_positions() {
    printed_object_position =  printer.position.slice();
    shelve_position = bookcase.randomFreeSpot();
    // debugger;

    create_path();
    width_printer_object = printer.getWidthObject(20);
    max_height_printed_object = printer.getHeightObject();

    busy = true;
    current_event_finished = true;
  }

  function _adjust_main_trunk(position) {
    if (robot_upper_body.stretch_torso(position)) { //TODO: calcular cuanto tiene que estirarse
      current_event_finished = true;
    }
    return current_event_finished;
  }

  function _adjust_second_trunk(position) {
    if (robot_upper_body.stretch_arm(position)) { //TODO: calcular cuanto tiene que estirarse
      current_event_finished = true;
    }
    return current_event_finished;
  }

  function adjust_main_trunk_printer() {    
    _adjust_main_trunk(printed_object_position);
  }

  function adjust_second_trunk_printer() {
    _adjust_second_trunk(printed_object_position);
  }

  function retract_second_trunk_printer() {
    printed_object_position[2] -= 5;
    _adjust_second_trunk(printed_object_position)
  }

  function hold_object() {
    if (robot_upper_body.close_hand(width_printer_object)){
      robot_upper_body.set_printed_object(printer.releaseObject(),max_height_printed_object);
      printer.unlock();
      current_event_finished = true;
    }
  }

  function _rotate_arm(clockwise) {
    if (robot_upper_body.rotate_arm(clockwise)) {
      current_event_finished = true;
    }
    return current_event_finished;
  }

  function rotate_arm() {
    _rotate_arm(true);
  }

  function move_to_bookcase() {
    if(path_counter < path_to_travel.positions.length){
      current_position[0] = path_to_travel.positions[path_counter];
      current_position[1] = path_to_travel.positions[path_counter+1];
      current_position[2] = path_to_travel.positions[path_counter+2];

      path_counter += 3;
    }
    else{
      path_counter = 0;
      current_position = shelve_position.slice();
      current_position[1] = 0;
      current_position[2] += 5;
      current_event_finished = true;
    }


    //TODO: ricky mover
  }

  function adjust_main_trunk_bookcase() {
    // debugger; 
    _adjust_main_trunk(shelve_position);
  }

  function adjust_second_trunk_bookcase() {
    _adjust_second_trunk(shelve_position);
  }

  function leave_object() {
    if (robot_upper_body.open_hand()) {
      bookcase.store_object(robot_upper_body.releaseObject(),max_height_printed_object);
      current_event_finished = true;
    }
  }

  function retract_second_trunk_bookcase() {
    shelve_position[2] += 5;
    _adjust_second_trunk(shelve_position)
  }


  function rotate_arm_inverse() {
    if (_rotate_arm(false)) {
      path_to_travel.positions.reverse();
      path_to_travel.tangents.reverse();
    }
  }

  function move_to_printer() {
    //TODO: ricky mover
    current_position = null;
    current_event_finished = true;

    if (!relax) {
      current_event = "free";
    } else {
      busy = false;
    }

  }
}