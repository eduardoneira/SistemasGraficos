function Scene() {
    var light = new Light([0.5, 0.5, 0.5],[-10.0, 10.0, -10.0]);

    var floor = new Plane(100,
                          100,
                          textures["floor"],
                          basicShaderHandler,
                          light,
                          [0.1, 0.1, 0.1]
                         );
    floor.init();

    var cube = new Cube(10,
                        10,
                        textures["checker"],
                        basicShaderHandler,
                        light,
                        [0.05, 0.05, 0.05]
                       );

  this.draw = function() {
    var transformations = mat4.create();
    mat4.translate(transformations,transformations,[13.0,2.0,0.0]);
    cube.draw(transformations);

    // var floor_transformations = mat4.create();
    // mat4.scale(floor_transformations,floor_transformations,[5.0,1.0,5.0]);
    // floor.activateShader();
    // floor.draw(floor_transformations);
  }
}