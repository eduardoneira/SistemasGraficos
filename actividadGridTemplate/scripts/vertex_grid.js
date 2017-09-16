// OBJETO VERTEX-GRID
// Definimos un constructor para el objeto VertexGrid
function VertexGrid (_rows, _cols, _texture) {
  this.cols = _cols;
  this.rows = _rows;
  this.texture = _texture;
  this.index_buffer = [];

  this.position_buffer = [];
  this.texture_buffer = [];

  this.webgl_position_buffer = null;
  this.webgl_texture_buffer = null;
  this.webgl_index_buffer = null;

  // Index buffer for strip
  this.createIndexBuffer = function() {
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

  // Esta función inicializa el position_buffer y el color buffer de forma de 
  // crear un plano de color gris que se extiende sobre el plano XY, con Z=0
  // El plano se genera centrado en el origen.
  // El propósito de esta función es a modo de ejemplo de como inicializar y cargar
  // los buffers de las posiciones y el color para cada vértice.
  this.createUniformPlaneGrid = function() {
    this.position_buffer = [];
    this.color_buffer = [];

    for (var i = 0.0; i < this.rows; i++) { 
      for (var j = 0.0; j < this.cols; j++) {
        // Para cada vértice definimos su posición
        this.position_buffer.push(i-(this.rows-1.0)/2.0);
        this.position_buffer.push(j-(this.rows-1)/2.0);
        this.position_buffer.push(0);

        // Para cada vértice definimos su color
        this.texture_buffer.push(i * (1.0/(this.rows-1)));
        this.texture_buffer.push(j * (1.0/(this.rows-1)));
      };
    };
  }

  this.loadTexture = function() {
    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 0, 255, 255]));
     
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
   
    // Asynchronously load an image
    var image = new Image();
    image.src = this.texture;
    image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

      gl.generateMipmap(gl.TEXTURE_2D);
    });
  }


  // Esta función crea e incializa los buffers dentro del pipeline para luego
  // utlizarlos a la hora de renderizar.
  this.setupWebGLBuffers = function(){
    // 1. Creamos un buffer para las posicioens dentro del pipeline.
    this.webgl_position_buffer = gl.createBuffer();
    // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
    // hemos creado.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    // 3. Cargamos datos de las posiciones en el buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información del color
    this.webgl_texture_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_buffer), gl.STATIC_DRAW);   

    // Repetimos los pasos 1. 2. y 3. para la información de los índices
    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
    // Notar también que se usa un array de enteros en lugar de floats.
    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
  }

  // Esta función es la que se encarga de configurar todo lo necesario
  // para dibujar el VertexGrid.
  // En el caso del ejemplo puede observarse que la última línea del método
  // indica dibujar triángulos utilizando los 6 índices cargados en el Index_Buffer.
  this.drawVertexGrid = function(){
    var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    var vertexTextureAttribute = gl.getAttribLocation(glProgram, "aVertexTextureCoord");
    gl.enableVertexAttribArray(vertexTextureAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_buffer);
    gl.vertexAttribPointer(vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

    // Dibujamos.
    gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
  }
}