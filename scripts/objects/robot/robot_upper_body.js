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
  var stretch_factor = 1.0;
  var cube_height = 12.0;
  var update_body = _stretch;

  var angle_arm = 0;
  var update_arm = _rotate_arm;
  var clock_wise = true;
  
  function _stretch() {
    if (stretch_factor < 1.5) {
      cube_height = 12 * stretch_factor;
      stretch_factor += 0.001;
    } else {
      update_body = _shrink;
    }
  }

  function _shrink() {
    if (stretch_factor > 1) {
      cube_height = 12 * stretch_factor; 
      stretch_factor -= 0.001;
    } else {
      update_body =_stretch;
    }
  }

  this.stretch = function() {
    update_body = _stretch;
  }

  this.shirnk = function() {
    update_body = _shrink;
  }

  this.rotate_arm = function() {
    update_arm = _rotate_arm;
  }

  function _rotate_arm() {
    if (clock_wise) {
      angle_arm += 0.01;
    } else{
      angle_arm -= 0.01;
    }

    if (angle_arm > degToRad(180)) {
      clock_wise = false;
      update_arm = null;
    }

    if (angle_arm < 0) {
      clock_wise = true;
      update_arm = null;
    }
  } 

  this.draw = function(transformations) {
    if (update_body) {
      update_body();
    }

    if (update_arm) {
      update_arm();
    }

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
    mat4.scale(aux,transformations,[1.0,stretch_factor,1.0]);
    main_trunk.draw(aux)
  }

}