function Robot(printer, bookcase) {
  this.printer = printer;
  this.bookcase = bookcase;
  
  var printed_object_position = [];
  var shelve_position = [];
  var printed_object = null;

  var possible_events = {
                          "free": { next: "calculate_positions", algorithm: do_nothing },
                          "calculate_positions": {next:"adjust_main_trunk_printer", algorithm: do_nothing }
                          "adjust_main_trunk_printer": { next: "adjust_second_trunk_printer", algorithm: adjust_main_trunk_printer },
                          "adjust_second_trunk_printer": { next: "hold_object", algorithm: adjust_second_trunk_printer },
                          "hold_object": { next: "rotate_arm", algorithm: hold_object },
                          "rotate_arm": { next: "move_to_bookcase", algorithm: rotate_arm },
                          "move_to_bookcase": { next: "adjust_main_trunk_bookcase", algorithm: move_to_bookcase },
                          "adjust_main_trunk_bookcase": { next: "adjust_second_trunk_bookcase", algorithm: adjust_main_trunk_bookcase },
                          "adjust_second_trunk_bookcase": { next: "leave_object", algorithm: adjust_second_trunk_bookcase },
                          "leave_object": { next: "rotate_arm_inverse", algorithm: leave_object },
                          "rotate_arm_inverse": { next: "move_to_printer", algorithm: rotate_arm_inverse },
                          "move_to_printer": { next: "free", algorithm: move_to_printer }
                        };

  var busy = false;
  var relax = true;
  var current_event = "free";
  var current_event_finished = false;

  var path_to_travel = [];

  this.activate = function() {
    if (busy) {
      relax = false;
    } else {
      current_event = "calculate_positions"
    }
  }

  var robot_upper_body = new RobotUpperBody(textures["metallic_white_with_holes"],
                                            light,
                                            [0.1, 0.1, 0.1]);

  this.draw = function(transformations) {
    if (current_event_finished) {
      current_event_finished = false;
      current_event = possible_events[current_event].next
    }

    possible_events[current_event].algorithm();
    
    robot_upper_body.draw(transformations);
  }

  function do_nothing() {}

  function create_path() {
    var control_points = [];
    var p1 = printed_object_position.slice();
    p1[1] = 0;

    var p5 = shelve_position.slice();
    p5[1] = 0;

    control_points.push(p1);
    control_points.push(p1);

    var p3 = p1.slice();
    p3[0] = (p1[0] + p5[0])/2.0;
    control_points.push(p3);

    p3[2] = (p1[2] + p5[2])/2.0;
    control_points.push(p3);

    control_points.push(p5);
    control_points.push(p5);

    var curve = BSplineCurve(control_points);

    path_to_travel = curve.travel(0.01);
  }

  function calculate_positions() {
    printed_object_position =  printer.position;
    shelve_position = bookcase.randomFreeSpot();
    
    create_path();

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

  function hold_object() {
    printed_object = printer.releaseObject();
    robot_upper_body.set_printed_object(printed_object);
    current_event_finished = true;
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
    //TODO: ricky mover
  }

  function adjust_main_trunk_bookcase() {
    _adjust_main_trunk(shelve_position);
  }

  function adjust_main_second_bookcase() {
    _adjust_main_second(shelve_position);
  }

  function leave_object() {
    bookcase.store_object(printed_object);
    printed_object = null;
  }

  function rotate_arm_inverse() {
    if (_rotate_arm(false)) {
      path_to_travel.reverse();
    }
  }

  function move_to_printer() {
    //TODO: ricky mover
  }
}