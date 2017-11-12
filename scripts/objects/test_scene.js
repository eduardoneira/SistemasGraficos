function TestScene() {
  var lights = new Light([[-3.0, 3.0, -3.0],
                         [-3.0, 3.0,  3.0],
                         [ 3.0, 3.0, -3.0],
                         [ 3.0, 3.0,  3.0]]);

  var specs = { lightIntensities: { ambient:  [0.6, 0.3, 0.0],
                                    diffuse:  [1.0, 0.5, 0.0],
                                    specular: [0.0, 1.0, 0.0]},
                materialReflectances: { ambient:  [1.0, 1.0, 1.0],
                                        diffuse:  [1.0, 1.0, 1.0],
                                        specular: [1.0, 1.0, 1.0]},
                materialShininess: 64 };

  var profile = new ConstantRadiusProfile(1.2,10);
  profile.travel(0.01);

  var main_trunk = new Lathe( profile,
                              Math.PI/36.0,
                              textures["metallic_white_with_holes"],
                              phongShaderHandler,
                              lights,
                              specs
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