function SceneRicky() {
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);

  var delta = 0.01;

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

  // Ahora uso shape como un polygon:

  // var shape = new SurfaceCircle(0.3);
  // shape.discretize(0.1);
  var shape = new Tire1Profile();
  shape.travel(0.1);
  // debugger;

  // console.log("hello");

  // debugger;

  // shape = new Polygon(_shape);

  var _sweep_path = [];

  var M = 100;
  var r = 1.5;
  for(var i = 0; i < M; i++){
    _sweep_path.push(r*Math.cos(2*Math.PI*i/M));
    _sweep_path.push(r*Math.sin(2*Math.PI*i/M));
    _sweep_path.push(0);
  }

  // var _sweep_path = new SurfaceCircle(1);
  // _sweep_path.discretize(0.1);

  sweep_path = new Polygon(_sweep_path);
  sweep_path.closed = true;

  // End shape as a polygon

   var tire = new Loft(shape, sweep_path, textures["tire"], 0, basicShaderHandler, light, [0.1, 0.1, 0.1]);
   tire.init();
   tire.translate([0,5,0]);
   var scale_factor = 3;
   tire.scale([scale_factor, scale_factor, scale_factor]);

   // debugger
   for(var i = 1; i < tire.texture_buffer.length; i+=2){
    tire.texture_buffer[i] *= 4;
   }

   shape = null;

   shape = new Spoke2Profile();
   shape.travel(0.1);

   _sweep_path = [];

   M = 100;
   r = 1;
   for(i = 0; i < M; i++){
    _sweep_path.push(r*Math.cos(2*Math.PI*i/M));
    _sweep_path.push(r*Math.sin(2*Math.PI*i/M));
    _sweep_path.push(0);
   }

   sweep_path = new Polygon(_sweep_path);
   sweep_path.closed = true;

   var spoke = new Loft(shape, sweep_path, textures["brushed_aluminum"], 0, basicShaderHandler, light, [0.1, 0.1, 0.1]);
   spoke.init();
   spoke.translate([0,5,1.8]);
   spoke.scale([1.3,1.3,1.3]);

   var wheel = new Wheel();


  this.draw = function() {
    tire.activateShader();
    spoke.activateShader();
    
    transformations = mat4.create();
    
    mat4.rotate(transformations, transformations, time, [0.0, 1.0, 0.0]);
    // mat4.rotate(transformations, transformations, 90, [0.0, 0.0, 1.0]);
    // mat4.translate(transformations, transformations, [0.0, -6.5, 0.0]);
    // mat4.scale(transformations, transformations, [5.0,5.0,5.0]);
    
    // debugger;
    tire.draw(transformations);
    spoke.draw(transformations);
  }

}