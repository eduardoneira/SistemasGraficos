function Cylinder(rows,cols,texture,radius) {
  VertexGrid.call(this,rows,cols,texture);

  this.radius = radius;
  var _STEP = 0.5;

  this._createPointsAxialSymmetry = function(x,v) {
    for (var i = 0; i < this.rows; i++) {
      this.position_buffer = this.position_buffer.concat([x,this.radius*Math.cos(i*2*Math.PI/(this.rows-1)),this.radius*Math.sin(i*2*Math.PI/(this.rows-1))]);
      this.texture_buffer = this.texture_buffer.concat([i/(this.rows-1),v]);
    } 
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
      this.texture_buffer = this.texture_buffer.concat([0.5,0]);
    }

    //First cover
    this._createPointsAxialSymmetry(min_x,1.0/(this.cols-1));

    //Cylinder 
    for (var x = min_x + _STEP, i = 2.0; x <= max_x - _STEP; x += _STEP, i++) { 
      this._createPointsAxialSymmetry(x,i/(this.cols-1));
    }

    //Last cover
    this._createPointsAxialSymmetry(max_x,1.0-(1.0/(this.cols-1)));
    
    //Last row
    for (var i = 0; i < this.rows; i++) {
      this.position_buffer = this.position_buffer.concat([max_x,0,0]);
      this.texture_buffer = this.texture_buffer.concat([0.5,1]);
    }
  }
}

inheritPrototype(Cylinder, VertexGrid);