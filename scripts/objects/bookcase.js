function BookCase(numberOfHorizontals, numberOfVerticals, baseSize, texture, shader, light, diffuseColor, withBorders) {
  var that = this;
  var shelves = [];
  var initial_position = [numberOfHorizontals/2,baseSize,0.0];
  var delta_horizontal = 1;
  var delta_vertical = 1;
  this.position = [];

  var rows = numberOfVerticals;
  var cols = numberOfHorizontals;
  var current_row = -1, 
      current_col = -1;
  var used_spots = new Array(rows);
  var printed_objects = [];

  for (var i = 0; i < rows; i++) {
    used_spots[i] = new Array(cols);
    for (var j = 0; j < cols; j++) {
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

  this.scale_bookcase_position = function(scale_factor) {
    delta_horizontal *= scale_factor[0];
    delta_vertical *= scale_factor[1];
    initial_position[0] *= scale_factor[0];
    initial_position[1] *= scale_factor[1];
  }

  function calculatePositionShelve(row, col) {
    var x,y,z;
    x = delta_horizontal*(col - Math.floor(cols/2));

    // if (col % 2 == 0) {
    //    x += delta_horizontal/2;
    // }

    x += that.position[0];
    y = delta_vertical*row + that.position[1];    
    z = that.position[2];
    
    return [x,y,z];
  }

  this.randomFreeSpot = function() {
    while (true) {
      var row = Math.floor(Math.random() * rows);
      var col = Math.floor(Math.random() * cols);

      if (!used_spots[row][col]) {
        current_row = row;
        current_col = col;
        return calculatePositionShelve(row,col);
      }
    }    
  }

  this.store_object = function(printed_object, maxY) {
    debugger;
    var pos = calculatePositionShelve(current_row,current_col);

    printed_objects.push({position: pos, 
                          object: printed_object,
                          maxY: maxY});

    used_spots[current_row][current_col] = true;
  }

  this.draw = function(transformations) {
    var x = 0.0;
    vec3.add(this.position,initial_position,getPositionMat4(transformations));

    printed_objects.forEach( function(printed_object) {
      var aux = mat4.create();
      debugger;
      mat4.translate(aux,aux,printed_object.position);
      mat4.scale(aux,aux,[2.0/printed_object.maxY,1.0/printed_object.maxY,2.0/printed_object.maxY]);
      printed_object.object.draw(aux);
    });
    
    shelves.forEach( function(shelve, index) {
      var shelves_transformations = mat4.create();
      mat4.translate(shelves_transformations,shelves_transformations,[index,0.0,0.0]);
      mat4.multiply(shelves_transformations,transformations,shelves_transformations);
      shelve.draw(shelves_transformations);
    });
  }
}