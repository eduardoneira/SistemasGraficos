function BookCase(numberOfHorizontals, numberOfVerticals, baseSize, texture, shader, light, diffuseColor, withBorders) {
  var that = this;
  var shelves = [];
  var initial_position = [numberOfHorizontals/2,0.0,0.0];
  this.position = [];

  var rows = numberOfHorizontals;
  var cols = numberOfVerticals;
  var used_spots = new Array(rows);

  for (var i = 0; i < rows; i++) {
    used_spots = new Array(cols);
    for (var j = 0; j < Things.length; i++) {
      used_spots[i][j] = false;
    }
  }

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

  function calculatePositionShelve(row, col) {
    // TODO: calcular posta
    return row + col;
  }

  this.randomFreeSpot = function() {
    while (true) {
      var row = Math.floor(Math.random() * rows);
      var col = Math.floor(Math.random() * cols);

      if (!used_spots[row][col]) {
        return calculatePositionShelve(row,col);
      }

    }    
  }

  this.draw = function(transformations) {
    var x = 0.0;
    vec3.add(this.position,initial_position,getPositionMat4(transformations));
    
    shelves.forEach( function(shelve, index) {
      var shelves_transformations = mat4.create();
      mat4.translate(shelves_transformations,shelves_transformations,[index,0.0,0.0]);
      mat4.multiply(shelves_transformations,transformations,shelves_transformations);
      shelve.draw(shelves_transformations);
    });
  }
}