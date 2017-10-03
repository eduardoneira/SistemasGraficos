// TODO: Make getters for position, rotation and scale
// TODO: Set up buffer and webgl buffer normals. Add bind in draw
function Object3D(_rows,_cols,_texture){
  this.texture = _texture;
  this.rows = _rows;
  this.cols = _cols;
  this.drawEnabled = true;

  this.index_buffer = [];
  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_buffer = [];

  this.webgl_position_buffer = null;
  this.webgl_texture_buffer = null;
  this.webgl_index_buffer = null;
  this.webgl_normal_buffer = null;

  this.state = mat4.create();
  this.childs = {};

  var that = this;

  this._createTexturePositionBuffer = function() {
    throw "Not implemented";
  }

  this._createNormalBuffer = function() {
    throw "Not implemented";
  }

  this._createIndexBuffer = function() {
    var index_top = 0;
    var index_bottom = this.rows;
    var moveIndex = function(a) {return a+1;};

    for (var j = 0; j < this.cols - 1; j++) {
      for (var  i = 0; i < 2 * this.rows; i++) {
        if (i % 2 == 0) {
          this.index_buffer.push(index_top);
          index_top = moveIndex(index_top);
        } else {
          this.index_buffer.push(index_bottom);
          index_bottom = moveIndex(index_bottom);
        } 
      }

      moveIndex = (j % 2 != 0) ? function(a) {return a+1;} : function(a) {return a-1;};

      index_top = moveIndex(index_top + this.rows);
      index_bottom = moveIndex(index_bottom + this.rows);
    }
  }

  this._setUpBuffers = function() {
    this._createIndexBuffer();
    this._createTexturePositionBuffer();
    this._createNormalBuffer();
  }

  this._setUpWebGLBuffers = function() {
    this.webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

    this.webgl_texture_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_buffer), gl.STATIC_DRAW);   

    this.webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);   

    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
  }

  this.init = function() {
    this._setUpBuffers();
    this._setUpWebGLBuffers();
  }

  this.disableDraw = function() {
    this.drawEnabled = false;
  }

  this.enableDraw = function() {
    this.drawEnabled = true;
  }

  this.add_child = function(id,child) {
    this.childs[id] = child;
  }

  this.translate = function (tVect) {
    mat4.translate(this.state, this.state, tVect);
  }

  this.scale = function(sVect) {
    mat4.scale(this.state, this.state, sVect);
  }

  this.rotate = function(rad, axis) {
    mat4.rotate(this.state, this.state, rad, axis);
  }

  this._resetState = function () {
    // Stub. Do nothing by default
  }

  this._drawChilds = function(transformations_parent) {
    // Stub. Do nothing by default
  }

  this._draw = function() {
    var u_view_model_matrix = gl.getUniformLocation(glProgram, "uVMMatrix");
    mat4.multiply(this.state,vMatrix,this.state)
    gl.uniformMatrix4fv(u_view_model_matrix, false, this.state);

    var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aNormalVector");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    var vertexTextureAttribute = gl.getAttribLocation(glProgram, "aVertexTextureCoord");
    gl.enableVertexAttribArray(vertexTextureAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
    gl.vertexAttribPointer(vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);

    var uSampler = gl.getUniformLocation(glProgram, 'uSampler');
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,this.texture);
    gl.uniform1i(uSampler, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.LINE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
  }

  this.draw = function(transformations_parent) {    
    mat4.identity(this.state);

    if (this.drawEnabled) {
      this._resetState();
      mat4.multiply(this.state,transformations_parent,this.state);
      this._draw();
    }

    this._drawChilds(transformations_parent);
  }

}