function RobotArm(lights) {
  // Trunk
  var profile = new ConstantRadiusProfile(1.2,10);
  profile.travel(0.01);

  var main_trunk = new Lathe( profile,
                              Math.PI/36.0,
                              textures["metallic_white_with_holes"],
                              phongShaderHandler,
                              lights,
                              materialSpecs([1.0,1.0,1.0],
                                            [1.0,1.0,1.0],
                                            [1.0,1.0,1.0],
                                            32)
                              );
  main_trunk.init();

  // Base
  var line = new Line(10);
  line.travel(0.05);

  var shape = new SurfaceCircle(1.5);
  shape.discretize(0.05);

  var base = new Loft(shape, 
                      line, 
                      textures["metallic_grey"], 
                      0, 
                      phongShaderHandler, 
                      lights, 
                      materialSpecs([1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    64),
                      true);
  base.init();
  base.translate([0,-8,0]);
  base.rotate(degToRad(90),[0.0,0.0,1.0]);

  // Robot hand
  var robot_hand = new RobotHand( lights);

  var robot_hand_transformations = mat4.create();
  mat4.rotate(robot_hand_transformations,robot_hand_transformations,degToRad(270),[1.0,0.0,0.0]);
  mat4.scale(robot_hand_transformations,robot_hand_transformations,[1/2,1.3,1/2]);

  // Logic
  var current_stretch = 1.0;
  var delta_strech = 0.001;
  var initial_delta_stretch = 0.002;
  var first_time = true; 

  var initial_hand_height = 10.5;
  var current_hand_height = initial_hand_height * current_stretch;

  this.stretch_arm = function(position) {
    if (Math.abs(position[2] - robot_hand.holding_position[2]) <= Math.abs(1.5*delta_strech)) {
      if (first_time) {
        delta_strech = delta_strech / 2.0;
        first_time = false;
      } else {
        delta_strech = initial_delta_stretch;
        first_time = true;
        return true;
      }
    }

    current_stretch += Math.sign(Math.abs(position[2]) - Math.abs(robot_hand.holding_position[2])) * delta_strech;
    current_hand_height =  initial_hand_height * current_stretch;

    return false;
  }

  this.set_printed_object_angle = function(angle) {
    robot_hand.set_printed_object_angle(angle);
  }

  this.close_hand = function(maxWidth) {
    return robot_hand.close_hand(maxWidth);
  }

  this.open_hand = function() {
    return robot_hand.open_hand();
  }

  this.set_printed_object = function(printed_object) {
    robot_hand.set_printed_object(printed_object);
  }

  this.set_height_printed_object = function(world_height) {
    robot_hand.set_height_printed_object(world_height);
  }

  this.releaseObject = function() {
    return robot_hand.releaseObject();
  }

  this.robot_hand_position = function() {
    return robot_hand.holding_position;
  }

  this.draw = function(transformations) {
    var aux = mat4.create();
    mat4.translate(aux,transformations,[0.0,current_hand_height,1.3]);
    mat4.multiply(aux,aux,robot_hand_transformations);
    robot_hand.draw(aux);

    base.draw(transformations);
   
    mat4.identity(aux);
    mat4.scale(aux,transformations,[1.0,current_stretch,1.0]);
    main_trunk.draw(aux);
  }

}