function RobotArm(texture, light, diffuseColor) {
  // Trunk
  var profile = new ConstantRadiusProfile(1.2,10);
  profile.travel(0.01);

  var main_trunk = new Lathe( profile,
                              Math.PI/36.0,
                              texture,
                              basicShaderHandler,
                              light,
                              diffuseColor
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
                      basicShaderHandler, 
                      light, 
                      diffuseColor,
                      true);
  base.init();
  base.translate([0,-8,0]);
  base.rotate(degToRad(90),[0.0,0.0,1.0]);

  // Robot hand
  var robot_hand = new RobotHand( textures["metallic_white"],
                                  light,
                                  [0.1, 0.1, 0.1]);

  var robot_hand_transformations = mat4.create();
  mat4.rotate(robot_hand_transformations,robot_hand_transformations,degToRad(270),[1.0,0.0,0.0]);
  mat4.scale(robot_hand_transformations,robot_hand_transformations,[1/2,1.3,1/2]);

  // Logic
  var stretching = false;
  var current_stretch = 1.0;
  var stretch_delta = 0;
  var final_stretch = 0;
  var speed_stretch = 0.0002; 

  var initial_hand_height = 10.5
  var current_hand_height = 10.5;

  this.stretch_arm = function(position) {
    if (!stretching) {
      stretching = true;
      final_stretch = position[0]/this.robot_hand.holding_position[0];
      stretch_delta = (final_stretch - current_stretch) * speed_stretch;
    }

    current_stretch += stretch_delta;
    current_hand_height =  initial_hand_height * current_stretch;

    if (Math.abs(final_stretch - stretch_delta - current_stretch) > Math.abs(final_stretch - current_stretch)) {
      stretching = false;
      return true;
    }

    return false;
  }

  this.close_hand = function() {
    return robot_hand.close_hand();
  }

  this.open_hand = function() {
    return robot_hand.open_hand();
  }

  this.set_printed_object = function(printed_object) {
    robot_hand.set_printed_object(printed_object);
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