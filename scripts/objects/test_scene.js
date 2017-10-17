function TestScene() {
  var light = new Light([0.5, 0.5, 0.5],[-10.0, 10.0, -10.0]);

  // var robot_hand = new RobotHand( textures["metallic_white"],
  //                                 light,
  //                                 [0.1, 0.1, 0.1]);

  var robot_upper_body = new RobotUpperBody(textures["metallic_white_with_holes"],
                                            light,
                                            [0.1, 0.1, 0.1]);

  this.draw = function() {
    var transformations = mat4.create();
    // mat4.rotate(transformations,transformations,time,[1.0,1.0,0.0]);
    // mat4.translate(transformations,transformations,[0.0,5.0,0.0]);
    // mat4.scale(transformations,transformations,[1/4,1/4,1/4]);
    robot_upper_body.draw(transformations);
  }

}