function Scene() {

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

  delta = 0.005;
  var line = new Line(20);
  line.travel(delta);
  var goblet_profile = new GreenLanternProfile();
  goblet_profile.travel(delta);
  debugger;
  var lathe = new Lathe(line,goblet_profile,Math.PI/18.0,textures["checker"]);
  lathe.init();

  this.draw = function() {
    cylinder_transformations = mat4.create();
    mat4.rotate(cylinder_transformations, cylinder_transformations, t, [1.0, 1.0, 0.0]);
    lathe.draw(cylinder_transformations);
  }

}