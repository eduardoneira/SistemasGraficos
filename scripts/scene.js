function Scene() {

  // var cylinder = new Cylinder(40,60,textures["cylinder"],5);
  // cylinder.init();

  var shape = [];
  var N = 12; //circulo de 12 lados
  var r = 0.3;
  for(var i = 0; i < N+1; i++){
    shape.push(r*Math.cos(2*Math.PI*i/N));
    shape.push(r*Math.sin(2*Math.PI*i/N));
  }

  var sweep_path = [];

  var M = 24;

  for(var i = 0; i < M+1; i++){
    sweep_path.push(Math.cos(2*Math.PI*i/M));
    sweep_path.push(Math.sin(2*Math.PI*i/M));
    // console.log(sweep_path[3*i+1]);
    sweep_path.push(0);
  }

  // debugger;

  var loft = new Loft2(shape, sweep_path, textures["checker"]);
  loft.init();
  // debugger;


  this.draw = function() {
    cylinder_transformations = mat4.create();
    mat4.rotate(cylinder_transformations, cylinder_transformations, t, [0.0, 1.0, 0.0]);
    loft.draw(cylinder_transformations);
  }

}