function Cylinder(rows,cols) {
  VertexGrid.call(this,rows,cols);

  var _STEP = 0.5;

  this._createPointsAxialSymmetry = function(x) {
    var points = [];
    
    for (var i = 0; i < this.rows; i++) {
      points = points.concat([x,Math.cos(i*2*Math.PI/(this.rows-1)),Math.sin(i*2*Math.PI/(this.rows-1))]);
      this.color_buffer = this.color_buffer.concat([Math.random(),Math.random(),Math.random()]);
    } 

    return points;
  }

  this.createUniformPlaneGrid = function(){
    if (this.cols < 4) {
      throw "Deben haber al menos 4 columnas";
    }

    var max_x = (this.cols-3) * _STEP / 2;
    var min_x = (-1) * max_x; 
    
    //First row
    for (var i = 0; i < this.rows; i++) {
      this.position_buffer = this.position_buffer.concat([min_x,0,0]);
      this.color_buffer = this.color_buffer.concat([Math.random(),Math.random(),Math.random()]);
    }

    //First cover
    this.position_buffer = this.position_buffer.concat(this._createPointsAxialSymmetry(min_x));

    // Cylinder 
    for (var x = min_x + _STEP; x <= max_x - _STEP; x += _STEP) { 
      this.position_buffer = this.position_buffer.concat(this._createPointsAxialSymmetry(x));
      this.color_buffer = this.color_buffer.concat([Math.random(),Math.random(),Math.random()]);
    }

    //Last cover
    this.position_buffer = this.position_buffer.concat(this._createPointsAxialSymmetry(max_x));
    
    //Last row
    for (var i = 0; i < this.rows; i++) {
      this.position_buffer = this.position_buffer.concat([max_x,0,0]);
      this.color_buffer = this.color_buffer.concat([Math.random(),Math.random(),Math.random()]);
    }
  }
}

inheritPrototype(Cylinder, VertexGrid);


