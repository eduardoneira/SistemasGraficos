function PrintableTraveler(deltaX, deltaZ, deltaY, positions) {
  var squareByY = {};
  this.maxY = 0;

  for(var offset = 0; offset < positions.length; offset += 3) {
    var x = positions[offset];
    var y = positions[offset+1];
    var z = positions[offset+2];

    if (y > this.maxY) {
      this.maxY = y;
    }

    var level = Math.ceil(y/deltaY)*deltaY;
    
    if (squareByY[level]) {
      var cur = squareByY[level];
      
      if (x > cur["maxX"]) {
        cur["maxX"] = x;
      }

      if (x < cur["minX"]) {
        cur["minX"] = x;
      }
      
      if (z > cur["maxZ"]) {
        cur["maxZ"] = z;
      }
      
      if (z < cur["minZ"]) {
        cur["minZ"] = z;
      }

      squareByY[level] = cur;
    } else {
      squareByY[level] = {
        maxX: x,
        minX: x,
        maxZ: z,
        minZ: z
      };      
    }
  }

  // debugger;
  
  this.maxWidth = function(maxY) {
    var maxWidth = 0;

    for (var level in squareByY) {
      if (squareByY.hasOwnProperty(level) && level <= maxY) {
        var cur_width = Math.abs(squareByY[level].maxZ - squareByY[level].minZ);
        
        if (cur_width > maxWidth) {
          maxWidth = cur_width;
        }
      }
    }

    return maxWidth;
  } 

  this.square = function(y) {
    return squareByY[y];
  }

}