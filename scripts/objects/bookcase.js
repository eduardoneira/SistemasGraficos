function BookCase(numberOfHorizontals, numberOfVerticals, baseSize, texture, shader, light, diffuseColor, withBorders) {
  var that = this;
  var shelves = [];
  var initial_position = [0.0, numberOfHorizontals/2,0.0];
  this.position = [];

  for (var i = 0; i < numberOfHorizontals; i++) {
    shelves.push(new Shelve(numberOfVerticals,
                            baseSize,
                            texture,
                            shader,
                            light,
                            diffuseColor,
                            withBorders
    ));
  }

  this.draw = function(transformations) {
    var x = 0.0;
    shelves.forEach( function(shelve, index) {
      vec3.add(this.position,initial_position,getPositionMat4(transformations));

      var shelves_transformations = mat4.create();
      mat4.translate(shelves_transformations,shelves_transformations,[index,0.0,0.0]);
      mat4.multiply(shelves_transformations,transformations,shelves_transformations);
      shelve.draw(shelves_transformations);
    });
  }
}