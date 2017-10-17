function Robot(printer, bookcase) {
  this.printer = printer;
  this.bookcase = bookcase;
  var printed_object = null;

  var printed_object_position = null;
  var shelve_position = null;
  
  var possible_events = {
                          "free": { next: "adjust_main_trunk_printer", algorithm: do_nothing },
                          "adjust_main_trunk_printer": { next: "adjust_second_trunk_printer", algorithm: adjust_main_trunk_printer },
                          "adjust_second_trunk_printer": { next: "hold_object", algorithm: adjust_second_trunk_printer },
                          "hold_object": { next: "move_to_bookcase", algorithm: hold_object },
                          "move_to_bookcase": { next: "adjust_main_trunk_bookcase", algorithm: move_to_bookcase },
                          "adjust_main_trunk_bookcase": { next: "adjust_second_trunk_bookcase", algorithm: adjust_main_trunk_bookcase },
                          "adjust_second_trunk_bookcase": { next: "leave_object", algorithm: adjust_second_trunk_bookcase },
                          "leave_object": { next: "move_to_printer", algorithm: leave_object },
                          "move_to_printer": { next: "free", algorithm: move_to_printer }
                        };

  var more_objects = false;
  var current_event = "free";

  this.activate = function() {
    if (printed_object) {
      more_objects = true;
    } else {
      current_event = possible_events[current_event].next
    }
  }

  var robot_upper_body = new RobotUpperBody(textures["metallic_white_with_holes"],
                                            light,
                                            [0.1, 0.1, 0.1]);

  this.draw = function(transformations) {
    robot_upper_body.draw(transformations);
  }

  function do_nothing() {}

  function adjust_main_trunk_printer() {

  }
}

