function RobotHand(texture, light, diffuseColor) {
  var initial_holding_position = [0.0,0.0,5.5];
  this.holding_position = [];
  var printed_object = null;
  var maxYObject = 0;

  // Centre cube
  var cube = new Cube(10,
                      10,
                      texture,
                      basicShaderHandler,
                      light,
                      diffuseColor,
                      false,
                      true);
  var cube_transformations = mat4.create();
  mat4.scale(cube_transformations,cube_transformations,[4,2,2]);

  // Left finger
  var triangleLoftLeft = new SideBaseRobotHand( texture,
                                                light,
                                                diffuseColor);
  var left_transformations = mat4.create();
  mat4.translate(left_transformations,left_transformations,[2,0,-1]);
  mat4.rotate(left_transformations,left_transformations,degToRad(90),[0,0,1]);

  // Right finger
  var triangleLoftRight = new SideBaseRobotHand( texture,
                                                 light,
                                                 diffuseColor);
  var right_transformations = mat4.create();
  mat4.translate(right_transformations,right_transformations,[-2,2,-1]);
  mat4.rotate(right_transformations,right_transformations,degToRad(270),[0,0,1]);

  // Logic
  var current_width = 10;
  var length_finger = 6;
  var current_angle = 0;
  var delta_angle = 0.01;
  var open_angle = null;

  this.close_hand = function(maxWidth) {
    if (current_width > maxWidth) {
      current_angle += delta_angle;
      current_width = current_width - (length_finger * Math.cos(angle));
      triangleLoftRight.setAngle(current_angle);
      triangleLoftLeft.setAngle(current_angle);
      return false;
    }

    return true;
  }

  this.open_hand = function() {
    if (!open_angle) {
      open_angle = current_angle - degToRad(10);
    }

    if (current_angle > open_angle) {
      current_angle -= delta_angle;
      triangleLoftRight.setAngle(current_angle);
      triangleLoftLeft.setAngle(current_angle);
      return false;
    }

    open_angle = null;
    return true;
  }

  this.set_printed_object = function(obj, maxY) {
    printed_object = obj;
    maxYObject = maxY;
  }

  this.releaseObject = function() {
    var copy = printed_object;
    printed_object = null;
    
    return copy;
  }

  this.draw = function(transformations) {
    var aux = mat4.create();
    mat4.multiply(aux, transformations, right_transformations);
    triangleLoftRight.draw(aux);

    mat4.identity(aux);
    mat4.multiply(aux, transformations, left_transformations);
    triangleLoftLeft.draw(aux);

    mat4.identity(aux);
    mat4.multiply(aux, transformations, cube_transformations);
    cube.draw(aux);

    vec3.transformMat4(this.holding_position,initial_holding_position,transformations);
    
    if (printed_object) {
      mat4.identity(aux);
      mat4.translate(aux,aux,this.holding_position)
      mat4.scale(aux,aux,[1.0/maxYObject,1.0/maxYObject,1.0/maxYObject]);

      printed_object.draw(aux);
    }
  }
}

function SideBaseRobotHand(texture, light, diffuseColor, delta_angle) {
  var triangleLoft = new TriangleLoft(2,
                                      texture,
                                      basicShaderHandler,
                                      light,
                                      diffuseColor);

  var line = new Line(2);
  line.travel(0.05);

  var shape = new SemiCircleSurface();
  shape.discretize(0.05);

  var loft = new Loft(shape, 
                      line, 
                      texture, 
                      0, 
                      basicShaderHandler, 
                      light, 
                      diffuseColor,
                      true);
  loft.init();

  loft.translate([1/6,-0.5,0.5]);
  loft.translate([0,-1,0]);
  loft.rotate(degToRad(45),[1.0,0.0,0.0]);
  loft.scale([5/6,1/2,1/2]);

  var cube = new Cube(10,
                      10,
                      textures["metallic_grey"],
                      basicShaderHandler,
                      light,
                      diffuseColor,
                      true);

  var hand_transformations = mat4.create();
  mat4.translate(hand_transformations, hand_transformations, [0,0,3]);
  mat4.rotate(hand_transformations,hand_transformations,degToRad(90),[0.0,1.0,0.0]);
  mat4.rotate(hand_transformations,hand_transformations,degToRad(90),[-1.0,0.0,0.0]);
  mat4.scale(hand_transformations,hand_transformations,[6,1.5,1/4]);

  var hand_angle = 0;

  function setAngle(angle) {
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