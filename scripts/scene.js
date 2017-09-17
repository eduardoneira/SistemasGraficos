function Scene() {

  var cylinder = new Cylinder(40,60,textures["cylinder"],5);
  cylinder.init();

  this.draw = function() {
    cylinder_transformations = mat4.create();
    mat4.rotate(cylinder_transformations, cylinder_transformations, t, [0.0, 1.0, 0.0]);
    cylinder.draw(cylinder_transformations);
  }
}