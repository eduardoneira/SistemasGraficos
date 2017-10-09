function Scene() {
    var light = new Light([0.5, 0.5, 0.5],[-10.0, 10.0, -10.0]);

    var floor = new Plane( 100,
                          100,
                          textures["floor"],
                          basicShaderHandler,
                          light,
                          [0.1, 0.1, 0.1]
                         );
    floor.init();

    this.draw = function() {
    // lathe.activateShader();

    // transformations = mat4.create();
    // mat4.rotate(transformations, transformations, time, [1.0, 1.0, 0.0]);
    // mat4.translate(transformations, transformations, [0.0, -6.5, 0.0]);
    // mat4.scale(transformations, transformations, [1.0,1.5,1.0]);

    // lathe.draw(transformations);
    var floor_transformations = mat4.create();
    mat4.scale(floor_transformations,floor_transformations,[200.0,0.0,200.0])
    floor.activateShader();
    floor.draw(floor_transformations);
  }
}