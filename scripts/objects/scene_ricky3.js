function SceneRicky3() {
  var light = new Light([0.5, 0.5, 0.5],[-5.0, 5.0, -5.0]);

  var wheel = new Wheel();
  var r = 0.1;
  var pelvis = new Pelvis(0.1, 100, 0.2, light);


  this.draw = function() {
    
    var transformations = mat4.create();
    mat4.rotate(transformations, transformations, time, [0.0, 0.0, 1.0]);
    // mat4.rotate(transformations, transformations, 90, [0.0, 0.0, 1.0]);
    // mat4.translate(transformations, transformations, [0.0, 0.0, 1*Math.sin(time)]);
    // mat4.scale(transformations, transformations, [5.0,5.0,5.0]);
    time += 0.1;
    wheel.draw(transformations);
    pelvis.draw(transformations);
  }

}