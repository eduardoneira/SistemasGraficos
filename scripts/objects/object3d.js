function Object3D(_rows, _cols, _texture, shader, lights, material_specs=null, normal_map=null){
  this.texture = _texture;
  this.rows = _rows;
  this.cols = _cols;
  this.drawEnabled = true;

  this.index_buffer = [];
  this.position_buffer = [];
  this.normal_buffer = [];
  this.tangent_buffer = [];
  this.binormal_buffer = [];
  this.texture_buffer = [];

  this.webgl_position_buffer = null;
  this.webgl_texture_buffer = null;
  this.webgl_index_buffer = null;
  this.webgl_normal_buffer = null;
  this.webgl_tangent_buffer = null;
  this.webgl_binormal_buffer = null;

  this.projector = new Projector(shader);
  this.lights = lights;
  this.material_specs = material_specs;
  this.normal_map = normal_map;

  this.shader = shader;
  this.optionalParamsShader = null;

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
    
    this.webgl_tangent_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);   
    
    this.webgl_binormal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);   

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
    // Stub. Do nothing, by default
  }

  function setUpLighting() {
    var light_positions = [];
    var light_intensities = [];

    for (var i = 0; i < that.lights.lights.length; i++) {
      light_positions.push(that.lights.lights[i].position[0]);
      light_positions.push(that.lights.lights[i].position[1]);
      light_positions.push(that.lights.lights[i].position[2]);
      light_intensities.push(that.lights.lights[i].intensity);
    }

    gl.uniform3fv(that.shader.pointLightPositions,light_positions);
    gl.uniform1fv(that.shader.pointLightIntensities,light_intensities);

    gl.uniform3fv(that.shader.lightAmbientIntensity, that.lights.specs.ambient);
    gl.uniform3fv(that.shader.lightDiffuseIntensity, that.lights.specs.diffuse);
    gl.uniform3fv(that.shader.lightSpecularIntensity, that.lights.specs.specular);
  }

  function setUpCamera(){
    gl.uniform3fv(that.shader.cameraPosition, camera.position);
  }

  function setUpMaterial(){
    if (that.material_specs){
      gl.uniform3fv(that.shader.materialAmbientRefl, that.material_specs.materialReflectances.ambient);
      gl.uniform3fv(that.shader.materialDiffuseRefl, that.material_specs.materialReflectances.diffuse);
      gl.uniform3fv(that.shader.materialSpecularRefl, that.material_specs.materialReflectances.specular);
      gl.uniform1f(that.shader.materialShininess, that.material_specs.materialShininess);
    }
  }

  function setUpNormalMap() {
    if(that.normal_map){
      gl.uniform1f(that.shader.uUsesNormalMap, 1);
    }
    else{
      gl.uniform1f(that.shader.uUsesNormalMap, 0);
    }
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D,that.normal_map);
    gl.uniform1i(that.shader.normalMapSamplerUniform, 1);
  }

  this.activateShader = function() {
    this.shader.activateShader();
    if (this.optionalParamsShader)
      this.optionalParamsShader()
  }

  this.setShader = function(shader) {
    this.projector.setShader(shader);
    this.shader = shader;
  }

  this._draw = function(vMatrix,mMatrix) {
    setUpLighting();
    setUpCamera();
    setUpMaterial();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,this.texture);
    gl.uniform1i(this.shader.samplerUniform, 0);

    setUpNormalMap();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.vertexAttribPointer(this.shader.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.vertexAttribPointer(this.shader.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
    gl.vertexAttribPointer(this.shader.vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
    gl.vertexAttribPointer(this.shader.vertexBinormalAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
    gl.vertexAttribPointer(this.shader.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(this.shader.vMatrixUniform, false, vMatrix);
    gl.uniformMatrix4fv(this.shader.mMatrixUniform, false, mMatrix);

    var nMatrix = mat3.create();
    mat3.fromMat4(nMatrix, mMatrix);
    mat3.invert(nMatrix, nMatrix);
    mat3.transpose(nMatrix, nMatrix);
    gl.uniformMatrix3fv(this.shader.nMatrixUniform, false, nMatrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
  }

  this.draw = function(transformations_parent) {    
    if (this.drawEnabled) {
      this.activateShader();
      this.projector.applyProjection();
      var mMatrix = mat4.create();
      mat4.multiply(mMatrix,transformations_parent,this.initial_state);
      this._draw(camera.getViewMatrix(),mMatrix);
    }
    this._drawChilds(transformations_parent);
  }
}