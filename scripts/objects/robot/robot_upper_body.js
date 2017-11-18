function RobotUpperBody(texture, light, diffuseColor, mat_specs) {
  // Cylinder
  var profile = new ConstantRadiusProfile(2,6);
  profile.travel(0.01);

  var main_trunk = new Lathe( profile,
                              Math.PI/36.0,
                              texture,
                              basicShaderHandler,
                              light,
                              diffuseColor,
                              mat_specs
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
                      true,
                      mat_specs);
  base.init();
  base.rotate(degToRad(90),[0.0,0.0,1.0]);

  // Box
  var cube = new Cube(10,
                      10,
                      textures["metallic_black2"],
                      basicShaderHandler,
                      light,
                      diffuseColor,
                      false,
                      mat_specs);

  var cube_transformations = mat4.create();
  mat4.scale(cube_transformations,cube_transformations,[4.5,4.5,4.5]);

  // Arm
  var robot_arm = new RobotArm( textures["metallic_white_with_holes"],
                                light,
                                [0.1, 0.1, 0.1],
                                mat_specs);

  var robot_arm_transformations = mat4.create();
  mat4.translate(robot_arm_transformations,robot_arm_transformations,[-1.0,0.0,0.0]);
  mat4.rotate(robot_arm_transformations,robot_arm_transformations,degToRad(90),[0.0,0.0,1.0]);
  mat4.rotate(robot_arm_transformations,robot_arm_transformations,degToRad(90),[0.0,1.0,0.0]);

  // Logic
  var current_stretch = 1;
  var delta_strech = 0.005;
  
  var initial_cube_height = 6;
  var cube_height = initial_cube_height * current_stretch;
  var world_cube_height = null;

  var angle_arm = 0;
  var initial_angle_arm = angle_arm;
  var angular_speed = 0.01;

  this.stretch_torso = function(position) {
    if (Math.abs(position[1] - world_cube_height) <= Math.abs(delta_strech)) {
      return true;
    }

    current_stretch += Math.sign(position[1] - world_cube_height) * delta_strech; // resto el y del lower body
    cube_height = initial_cube_height * current_stretch;
    return false;
  }

  this.rotate_arm = function(clock_wise) {
    if (clock_wise) {
      angle_arm += 0.01;
    } else{
      angle_arm -= 0.01;
    }

    if (Math.abs(angle_arm - initial_angle_arm) > degToRad(180)) {
      initial_angle_arm = angle_arm;
      return true;
    }
    
    return false;
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

  this.set_printed_object = function(printed_object) {
    robot_arm.set_printed_object(printed_object);
  }

  this.releaseObject = function() {
    return robot_arm.releaseObject();
  }

  var dir = vec3.fromValues(0,0,1);
  var dir_angle = 0.0;

  this.alignBody = function(path_tangent){
    vec3.normalize(path_tangent, path_tangent);
    dir_angle = Math.acos(vec3.dot(dir, path_tangent));
    dir_angle += Math.PI;

    if(path_tangent[0] > 0){
      dir_angle *= -1;
    }
  }

  this.draw = function(transformations) {
    var align_rot = mat4.create();
    mat4.rotate(align_rot, align_rot, -dir_angle, [0, 1, 0]);

    var aux = mat4.create();
    mat4.translate(aux,transformations,[0.0,cube_height,0.0]);
    mat4.rotate(aux,aux,angle_arm,[0.0,1.0,0.0]);
    mat4.multiply(aux,aux,cube_transformations);
    mat4.multiply(aux, aux, align_rot);
    cube.draw(aux);

    var world_cube_pos = [];
    vec3.transformMat4(world_cube_pos,[0,0,0],aux);
    world_cube_height = world_cube_pos[1];


    robot_arm.set_height_printed_object(world_cube_pos[1]);

    mat4.identity(aux);
    mat4.translate(aux,transformations,[0.0,cube_height+2.5,0.0]);
    mat4.rotate(aux,aux,angle_arm,[0.0,1.0,0.0]);
    mat4.multiply(aux, aux, align_rot);
    mat4.multiply(aux,aux,robot_arm_transformations);
    robot_arm.draw(aux);    

    mat4.identity(aux);
    mat4.multiply(aux, transformations, align_rot);
    base.draw(aux);

    mat4.identity(aux);
    mat4.scale(aux,transformations,[1.0,current_stretch,1.0]);
    mat4.multiply(aux, aux, align_rot);
    main_trunk.draw(aux)
  }

}