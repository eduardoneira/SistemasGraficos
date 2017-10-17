function RobotArm(texture, light, diffuseColor) {
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

  var stretch_factor = 1.0;

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

  var robot_hand = new RobotHand( textures["metallic_white"],
                                  light,
                                  [0.1, 0.1, 0.1]);

  var robot_hand_transformations = mat4.create();
  mat4.rotate(robot_hand_transformations,robot_hand_transformations,degToRad(270),[1.0,0.0,0.0]);
  mat4.scale(robot_hand_transformations,robot_hand_transformations,[1/2,1.3,1/2]);

  var hand_height = 10.5;

  var update_arm = _stretch;

  function _stretch() {
    if (stretch_factor < 1.2) {
      hand_height = 10.2 * stretch_factor;
      stretch_factor += 0.001;
    } else {
      update_arm = _shrink;
    }
  }

  function _shrink() {
    if (stretch_factor > 1) {
      hand_height = 10.2 * stretch_factor; 
      stretch_factor -= 0.001;
    } else {
      update_arm =_stretch;
    }
  }

  this.stretch = function() {
    update_arm = _stretch;
  }

  this.shirnk = function() {
    update_arm = _shrink;
  }

  this.draw = function(transformations) {
    if (update_arm != undefined) {
      update_arm();
    }

    var aux = mat4.create();
    mat4.translate(aux,transformations,[0.0,hand_height,1.3]);
    mat4.multiply(aux,aux,robot_hand_transformations);
    robot_hand.draw(aux);

    base.draw(transformations);
   
    mat4.identity(aux);
    mat4.scale(aux,transformations,[1.0,stretch_factor,1.0]);
    main_trunk.draw(aux);
  }

}