function TestScene() {

  var surface_circle = new SurfaceCircle(5);
  surface_circle.discretize(0.05);

  // var cylinder = new Cylinder(40,60,textures["cylinder"],5);
  // cylinder.init();

  // var shape = [];
  // var N = 50; //circulo de 12 lados
  // var r = 0.5;
  // for(var i = 0; i < N+1; i++){
  //   shape.push(r*Math.cos(2*Math.PI*i/N));
  //   shape.push(r*Math.sin(2*Math.PI*i/N));
  // }

  // var shape = new SurfaceCircle(0.3);
  // shape.discretize(0.1);

  // var sweep_path = [];

  // var M = 100;
  // var r = 1;
  // for(var i = 0; i < M+1; i++){
  //   sweep_path.push(r*Math.cos(2*Math.PI*i/M));
  //   sweep_path.push(r*Math.sin(2*Math.PI*i/M));
  //   sweep_path.push(0);
  // }

  // var loft = new Loft2(shape, sweep_path, textures["checker"]);
  // loft.init();

  delta = 0.02;
  var goblet_profile = new Base1Profile();
  goblet_profile.travel(delta);
  var lathe = new Lathe(goblet_profile,Math.PI/18.0,textures["checker"]);
  lathe.init();

  this.draw = function() {
    cylinder_transformations = mat4.create();
    // mat4.rotate(cylinder_transformations, cylinder_transformations, t, [1.0, 1.0, 0.0]);
    mat4.translate(cylinder_transformations, cylinder_transformations, [0.0, -6.5, 0.0]);
    mat4.scale(cylinder_transformations,cylinder_transformations,[1.0,1.5,1.0]);
    lathe.draw(cylinder_transformations);
  }

}