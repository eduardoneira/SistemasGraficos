function RobotUpperBody(texture, light, diffuseColor) {
  // Cylinder
  var profile = new ConstantRadiusProfile(2,15);
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
  var line = new Line(3);
  line.travel(0.05);

  var shape = new SurfaceCircle(2.5);
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
  base.rotate(degToRad(90),[0.0,0.0,1.0]);

  // Box
  var cube = new Cube(10,
                      10,
                      textures["metallic_black2"],
                      basicShaderHandler,
                      light,
                      diffuseColor,
                      false);

  var cube_transformations = mat4.create();
  mat4.scale(cube_transformations,cube_transformations,[4.5,4.5,4.5]);

  // Arm
  var robot_arm = new RobotArm( textures["metallic_white_with_holes"],
                                light,
                                [0.1, 0.1, 0.1]);

  var robot_arm_transformations = mat4.create();
  mat4.translate(robot_arm_transformations,robot_arm_transformations,[-1.0,0.0,0.0]);
  mat4.rotate(robot_arm_transformations,robot_arm_transformations,degToRad(90),[0.0,0.0,1.0]);
  mat4.rotate(robot_arm_transformations,robot_arm_transformations,degToRad(90),[0.0,1.0,0.0]);

  // Logic
  var stretching = false;
  var current_stretch = 1.0;
  var stretch_delta = 0;
  var final_stretch = 0;
  var speed_stretch = 0.0002;
  var initial_cube_height = 12.0;
  var cube_height = 12.0;

  var angle_arm = 0;
  var angular_speed = 0.01;

  this.stretch_torso = function(position) {
    if (!stretching) {
      stretching = true;
      final_stretch = position[1]/cube_height;
      stretch_delta = (final_stretch - current_stretch) * speed_stretch;
    }

    current_stretch += stretch_delta;
    cube_height = initial_cube_height * current_stretch;

    if (Math.abs(final_stretch - stretch_delta - current_stretch) > Math.abs(final_stretch - current_stretch)) {
      stretching = false;
      return true;
    }

    return false;
  }

  this.rotate_arm = function(clock_wise) {
    if (clock_wise) {
      angle_arm += 0.01;
    } else{
      angle_arm -= 0.01;
    }

    return (Math.abs(angle_arm) > degToRad(180));
  }

  this.stretch_arm = function(position) {
    return robot_arm.stretch_arm(position);
  }

  this.close_hand = function(maxWidth) {
    return robot_arm.close_hand(maxWidth);
  }

  this.open_hand = function() {
    return robot_arm.open_hand();
  }

  this.set_printed_object = function(printed_object,maxY) {
    robot_arm.set_printed_object(printed_object,maxY);
  }

  this..releaseObject = function() {
    return robot_arm.releaseObject();
  }

  this.draw = function(transformations) {
    var aux = mat4.create();
    mat4.translate(aux,transformations,[0.0,cube_height,0.0]);
    mat4.rotate(aux,aux,angle_arm,[0.0,1.0,0.0]);
    mat4.multiply(aux,aux,cube_transformations);
    cube.draw(aux);

    mat4.identity(aux);
    mat4.translate(aux,transformations,[0.0,cube_height+2.5,0.0]);
    mat4.rotate(aux,aux,angle_arm,[0.0,1.0,0.0]);
    mat4.multiply(aux,aux,robot_arm_transformations);
    robot_arm.draw(aux);    

    base.draw(transformations);

    mat4.identity(aux);
    mat4.scale(aux,transformations,[1.0,current_stretch,1.0]);
    main_trunk.draw(aux)
  }

}