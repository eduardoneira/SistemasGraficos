function SceneRicky() {
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);

  var delta = 0.01;

  var shape = new SurfaceCircle(0.3);
  shape.discretize(0.1);

  // debugger;

  var sweep_path = [];

  var M = 100;
  var r = 1;
  for(var i = 0; i < M+1; i++){
    sweep_path.push(r*Math.cos(2*Math.PI*i/M));
    sweep_path.push(r*Math.sin(2*Math.PI*i/M));
    // console.log(sweep_path[3*i+1]);
    sweep_path.push(0);
  }

   var loft = new Loft2(shape, sweep_path, textures["checker"], 0.01, basicShaderHandler, light, [0.1, 0.1, 0.1]);
   loft.init();

  

  this.draw = function() {
    loft.activateShader();
    
    transformations = mat4.create();
    // mat4.rotate(transformations, transformations, time, [1.0, 1.0, 0.0]);
    mat4.translate(transformations, transformations, [0.0, -6.5, 0.0]);
    mat4.scale(transformations, transformations, [5.0,5.0,5.0]);
    
    projector.applyProjection();
    loft.draw(transformations);
  }

}