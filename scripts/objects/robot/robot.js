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
  var previous_current_position = null;
  var current_tangent = null;

  var robot_upper_body = new RobotUpperBody(textures["metallic_white_with_holes"],
                                            light,
                                            [0.1, 0.1, 0.1]);

  var robot_lower_body = new LowerBody();

  var offset_upper = [0,2,0];
  var offset_lower = [0,0.4,0];

  var is_first = true;

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

    p2 = p1.slice();
    p2[2] -= 5;
    control_points.push(p2);

    var p3 = p1.slice();
    p3[0] = (p1[0] + p5[0])/2.0;
    // control_points.push(p3);

    p3[2] = (p1[2] + p5[2])/2.0;
    control_points.push(p3);
    // control_points.push(p3);

    p4 = p5.slice();
    p4[2] += 5;
    control_points.push(p4);

    control_points.push(p5);
    control_points.push(p5);

    // debugger;

    var curve = new CuadraticBSplineCurve(control_points);
    path_to_travel = curve.travel(0.01);
    path_to_travel2 = curve.travel(0.01);
    // debugger;
  }

  function calculate_positions() {
    printed_object_position =  printer.position.slice();
    shelve_position = bookcase.randomFreeSpot();

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
    _adjust_main_trunk(printed_object_position.slice());
  }

  function adjust_second_trunk_printer() {
    _adjust_second_trunk(printed_object_position.slice());
  }

  function retract_second_trunk_printer() {
    var copy = printed_object_position.slice();
    copy[2] -= 1.75;
    _adjust_second_trunk(copy)
  }

  function hold_object() {
    if (robot_upper_body.close_hand(width_printer_object)){
      robot_upper_body.set_printed_object(printer.releaseObject());
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
    if(path_counter < path_to_travel.positions.length) {
      previous_current_position = current_position.slice();

      current_position[0] = path_to_travel.positions[path_counter];
      current_position[1] = path_to_travel.positions[path_counter+1];
      current_position[2] = path_to_travel.positions[path_counter+2];

      current_tangent = vec3.create();
      current_tangent = vec3.fromValues(path_to_travel.tangents[path_counter],
                                        path_to_travel.tangents[path_counter+1],
                                        path_to_travel.tangents[path_counter+2]);                         
      vec3.normalize(current_tangent, current_tangent);

      if(!is_first){
        robot_lower_body.alignBody(current_tangent);
      } else{
        is_first = false;
      }

      robot_lower_body.rotateWheel(vec3.distance(previous_current_position,current_position), 1.0);

      path_counter += 3;
    } else{
      // path_counter = 0;
      // debugger;
      current_position = shelve_position.slice();
      current_position[1] = 0;
      current_position[2] += 5;
      current_event_finished = true;
      is_first = true;
    }
  }

  function adjust_main_trunk_bookcase() {
    _adjust_main_trunk(shelve_position.slice());
  }

  function adjust_second_trunk_bookcase() {
    _adjust_second_trunk(shelve_position.slice());
  }

  function leave_object() {
    if (robot_upper_body.open_hand()) {
      bookcase.store_object(robot_upper_body.releaseObject());
      current_event_finished = true;
    }
  }

  function retract_second_trunk_bookcase() {
    var copy = shelve_position.slice();
    copy[2] += 1.75;
    _adjust_second_trunk(copy)
  }


  function rotate_arm_inverse() {
    if (_rotate_arm(false)) {
      path_to_travel.positions.reverse();
      path_to_travel.tangents.reverse();
    }
  }

  function move_to_printer() {
    //TODO: ricky mover
    // if(path_counter < path_to_travel.positions.length){
    if(path_counter > 0){
      if(is_first){
        is_first = false;
      } else{
        previous_current_position = current_position.slice();

        current_position[0] = path_to_travel2.positions[path_counter];
        current_position[1] = path_to_travel2.positions[path_counter+1];
        current_position[2] = path_to_travel2.positions[path_counter+2];

        current_tangent = vec3.create();
        current_tangent = vec3.fromValues(path_to_travel2.tangents[path_counter],
                                          path_to_travel2.tangents[path_counter+1],
                                          path_to_travel2.tangents[path_counter+2]);                         
        vec3.normalize(current_tangent, current_tangent);

        robot_lower_body.alignBody(current_tangent);


        // console.log(previous_current_position, ", ", current_position);
        robot_lower_body.rotateWheel(vec3.distance(previous_current_position,current_position), -1.0);
      }


      path_counter -= 3;
    } else{
      // debugger;
      current_position = null;
      current_event_finished = true;
      is_first = true;
      if(!relax){
        current_event = "free";
      } else{
        busy = false;
      }
    }

    // current_position = null;
    // current_event_finished = true;



    if (!relax) {
      // current_event = "free";
    } else {
      // busy = false;
    }

  }
}