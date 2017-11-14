function TestScene() {
  var lights = [  new Light([-5.0, 3.0, -5.0], 10.0),
                  new Light([-5.0, 3.0,  5.0], 1.0),
                  new Light([ 5.0, 3.0, -5.0], 1.0),
                  new Light([ 5.0, 3.0,  5.0], 10.0)];

  var specs = { lightIntensities: { ambient:  [0.4, 0.4, 0.4],
                                    diffuse:  [1.0, 1.0, 0.0],
                                    specular: [1.0, 1.0, 1.0]},
                materialReflectances: { ambient:  [1.0, 1.0, 1.0],
                                        diffuse:  [1.0, 1.0, 1.0],
                                        specular: [1.0, 1.0, 1.0]},
                materialShininess: 64 };

  var profile = new ConstantRadiusProfile(1.5,10);
  profile.travel(0.01);

  var main_trunk = new Lathe( profile,
                              Math.PI/36.0,
                              textures["blank"],
                              phongShaderHandler,
                              lights,
                              specs,
                              textures["normal_map_marmol"]
                              );
  main_trunk.init();

  this.draw = function() {
    var transformations = mat4.create();
    // mat4.rotate(transformations,transformations,time,[1.0,1.0,0.0]);
    // mat4.translate(transformations,transformations,[0.0,5.0,0.0]);
    // mat4.scale(transformations,transformations,[1/4,1/4,1/4]);
    main_trunk.draw(transformations);
  }

}