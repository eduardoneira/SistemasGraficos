function SceneRicky() {
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);

  var delta = 0.01;

  var shape = new CrossB3Shape();
  shape.travel(0.1);

  debugger;

  var _sweep_path = [];

  var M = 100;
  var r = 1;
   for(i = 0; i < M; i++){
    _sweep_path.push(r*Math.cos(2*Math.PI*i/M));
    _sweep_path.push(r*Math.sin(2*Math.PI*i/M));
    _sweep_path.push(0);
   }

  var sweep_path = new Polygon(_sweep_path);
  // sweep_path.closed = true;

  var spoke = new Loft(shape, sweep_path, textures["checker"], 0, basicShaderHandler, light, [0.1, 0.1, 0.1]);
  spoke.init();
  spoke.translate([0,5,1.8]);
  // spoke.scale([1.3,1.3,1.3]);


  this.draw = function() {
    spoke.activateShader();
    
    transformations = mat4.create();
    
    mat4.rotate(transformations, transformations, time, [1.0, 1.0, 0.0]);
    // mat4.rotate(transformations, transformations, 90, [0.0, 0.0, 1.0]);
    // mat4.translate(transformations, transformations, [0.0, -6.5, 0.0]);
    // mat4.scale(transformations, transformations, [5.0,5.0,5.0]);
    
    // debugger;
    spoke.draw(transformations);
  }

}