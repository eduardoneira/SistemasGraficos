function RobotBaseHand(texture, light, diffuseColor) {
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

  var triangleLoftLeft = new SideBaseRobotHand( texture,
                                                light,
                                                diffuseColor);

  var left_transformations = mat4.create();
  mat4.translate(left_transformations,left_transformations,[2,0,-1]);
  mat4.rotate(left_transformations,left_transformations,degToRad(90),[0,0,1]);

  var triangleLoftRight = new TriangleLoft( 2,
                                            texture,
                                            basicShaderHandler,
                                            light,
                                            diffuseColor);

  var right_transformations = mat4.create();
  mat4.translate(right_transformations,right_transformations,[-2,2,-1]);
  mat4.rotate(right_transformations,right_transformations,degToRad(270),[0,0,1]);


  this.draw = function(transformations) {
    var aux = mat4.create();
    // mat4.multiply(aux, transformations, right_transformations);
    // triangleLoftRight.draw(aux);

    // mat4.identity(aux);
    // mat4.multiply(aux, transformations, left_transformations);
    triangleLoftLeft.draw(aux);

    // mat4.identity(aux);
    // mat4.multiply(aux, transformations, cube_transformations);
    // cube.draw(aux)
  }
}

function SideBaseRobotHand(texture, light, diffuseColor) {

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



  // loft.translate();

  this.draw = function(transformations) {
    triangleLoft.draw(transformations);

    loft.draw(transformations);
  }
}