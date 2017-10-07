function Object3D(_rows, _cols, _texture, shader, light, diffuseColor){
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

  this.light = light;
  this.diffuseColor = diffuseColor;

  this.shader = shader;

  this.initial_state = mat4.create();
  this.childs = {};

  var that = this;

  this._createAttributesBuffers = function() {
    throw "Not implemented";
  }

  this._createIndexBuffer = function() {
    var index_top = 0;
    var index_bottom = this.rows;
    var moveIndex = function(a) { return a+1; };

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
    this._createAttributesBuffers();
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
    mat4.translate(this.initial_state, this.initial_state, tVect);
  }

  this.scale = function(sVect) {
    mat4.scale(this.initial_state, this.initial_state, sVect);
  }

  this.rotate = function(rad, axis) {
    mat4.rotate(this.initial_state, this.initial_state, rad, axis);
  }

  this._drawChilds = function(transformations_parent) {
    // Stub. Do nothing by default
  }

  function setUpLighting() {
    var light_position = vec3.create();
    vec3.transformMat4(light_position,that.light.directional_light,camera.prev_look_at);
    gl.uniform3fv(that.shader.lightingDirectionUniform, light_position);
    gl.uniform3fv(that.shader.ambientColorUniform, that.light.ambient_light);
    gl.uniform3fv(that.shader.directionalColorUniform, that.diffuseColor);
  }

  this.activateShader = function() {
    this.shader.activateShader();
  } 

  this._draw = function(mvMatrix) {
    setUpLighting();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,this.texture);
    gl.uniform1i(this.shader.samplerUniform, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.vertexAttribPointer(this.shader.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.vertexAttribPointer(this.shader.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
    gl.vertexAttribPointer(this.shader.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(this.shader.vmMatrixUniform, false, mvMatrix);

    var nMatrix = mat3.create();
    mat3.fromMat4(nMatrix, mvMatrix);
    mat3.invert(nMatrix, nMatrix);
    mat3.transpose(nMatrix, nMatrix);
    gl.uniformMatrix3fv(this.shader.nMatrixUniform, false, nMatrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    // debugger;
    gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
  }

  this.draw = function(transformations_parent) {    
    // debugger;
    if (this.drawEnabled) {
      // debugger;
      var mvMatrix = mat4.create();
      mat4.multiply(mvMatrix,transformations_parent,this.initial_state);
      mat4.multiply(mvMatrix,camera.getViewMatrix(),mvMatrix);
      this._draw(mvMatrix);
    }

    this._drawChilds(transformations_parent);
  }
}