function RobotHand(lights) {
  var initial_holding_position = [0.0,0.0,6];
  this.holding_position = [];
  var printed_object = null;
  var maxYObject = 0;

  // Centre cube
  var cube = new Cube(10,
                      10,
                      textures["metallic_white"],
                      phongShaderHandler,
                      lights,
                      materialSpecs([1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    64),
                      false,
                      true);

  var cube_transformations = mat4.create();
  mat4.scale(cube_transformations,cube_transformations,[4,2,2]);

  // Left finger
  var triangleLoftLeft = new SideBaseRobotHand( textures["metallic_white"],
                                                lights);
  var left_transformations = mat4.create();
  mat4.translate(left_transformations,left_transformations,[2,0,-1]);
  mat4.rotate(left_transformations,left_transformations,degToRad(90),[0,0,1]);

  // Right finger
  var triangleLoftRight = new SideBaseRobotHand(textures["metallic_white"],
                                                lights);
  var right_transformations = mat4.create();
  mat4.translate(right_transformations,right_transformations,[-2,2,-1]);
  mat4.rotate(right_transformations,right_transformations,degToRad(270),[0,0,1]);

  // Logic
  var current_angle = degToRad(10);
  var delta_angle = 0.01;

  this.close_hand = function(maxWidth) {
    if (current_angle > -degToRad(5)) {
      current_angle -= delta_angle;
      return false;
    }

    return true;
  }

  this.open_hand = function() {
    if (current_angle < degToRad(10)) {
      current_angle += delta_angle;
      return false;
    }

    return true;
  }

  this.set_printed_object = function(obj, maxY) {
    printed_object = obj;
    maxYObject = maxY;
  }

  var printed_object_world_height = 0;

  this.set_height_printed_object = function(world_height) {
    printed_object_world_height = world_height;
  }

  var one_more_tick = false
  this.releaseObject = function() {
    var copy = printed_object;
    one_more_tick = true;
    
    return {object: copy, position: this.holding_position.slice()};
  }

  this.draw = function(transformations) {
    var aux = mat4.create();
    mat4.multiply(aux, transformations, right_transformations);      
    triangleLoftRight.setAngle(current_angle);
    triangleLoftRight.draw(aux);

    mat4.identity(aux);
    mat4.multiply(aux, transformations, left_transformations);
    triangleLoftLeft.setAngle(current_angle);
    triangleLoftLeft.draw(aux);

    mat4.identity(aux);
    mat4.multiply(aux, transformations, cube_transformations);
    cube.draw(aux);

    vec3.transformMat4(this.holding_position,initial_holding_position,transformations);

    if (printed_object || one_more_tick) {
      mat4.identity(aux);
      var pos = this.holding_position.slice();
      pos[1] = printed_object_world_height;
      printed_object.draw(pos);

      if (one_more_tick) {
        printed_object = false;
        one_more_tick = false;
      }
    }
  }
}

function SideBaseRobotHand(texture, lights) {
  var triangleLoft = new TriangleLoft(2,
                                      texture,
                                      phongShaderHandler,
                                      lights,
                                      materialSpecs([1.0,1.0,1.0],
                                                    [1.0,1.0,1.0],
                                                    [1.0,1.0,1.0],
                                                    64)
                                      );

  var line = new Line(2);
  line.travel(0.05);

  var shape = new SemiCircleSurface();
  shape.discretize(0.05);

  var loft = new Loft(shape, 
                      line, 
                      texture, 
                      0, 
                      phongShaderHandler, 
                      lights, 
                      materialSpecs([1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    64),
                      true);
  loft.init();

  loft.translate([1/6,-0.5,0.5]);
  loft.translate([0,-1,0]);
  loft.rotate(degToRad(45),[1.0,0.0,0.0]);
  loft.scale([5/6,1/2,1/2]);

  var cube = new Cube(10,
                      10,
                      textures["metallic_grey"],
                      phongShaderHandler,
                      lights,
                      materialSpecs([1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    [1.0,1.0,1.0],
                                    64),
                      true);

  var hand_transformations = mat4.create();
  mat4.translate(hand_transformations, hand_transformations, [0,0,3]);
  mat4.rotate(hand_transformations,hand_transformations,degToRad(90),[0.0,1.0,0.0]);
  mat4.rotate(hand_transformations,hand_transformations,degToRad(90),[-1.0,0.0,0.0]);
  mat4.scale(hand_transformations,hand_transformations,[6,1.5,1/4]);

  var hand_angle = 0;

  this.setAngle = function(angle) {
    hand_angle = angle;
  }

  this.draw = function(transformations) {
    var aux = mat4.create();
    mat4.translate(aux,aux,[1.75,-1.25,1]);
    mat4.rotate(aux,aux,hand_angle,[1.0,0.0,0.0]);
    mat4.multiply(aux,aux,hand_transformations);
    mat4.multiply(aux,transformations,aux)
    cube.draw(aux);
    
    loft.draw(transformations);
    triangleLoft.draw(transformations);
  }
}