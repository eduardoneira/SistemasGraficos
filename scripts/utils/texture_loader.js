var textures = {};

// No se puede acceder al filesystem, vamos a tener que hardcodear a mano aca
function loadAllTextures() {
  textures["cylinder"] = loadTexture("resources/cylinder.jpg");
  textures["checker"] = loadTexture("resources/checker.jpg");
  textures["floor"] = loadTexture("resources/floor_texture.jpg");
  textures["black_wood"] = loadTexture("resources/black_texture.jpg");
  textures["metallic_black"] = loadTexture("resources/metallic_black.jpg");
  textures["metallic_black2"] = loadTexture("resources/metallic_black2.jpg");
  textures["metallic_white"] = loadTexture("resources/metallic_white.jpg");
  textures["metallic_white_with_holes"] = loadTexture("resources/english_green.jpg");
  textures["metallic_grey"] = loadTexture("resources/metallic_gery.jpg");
  textures["wood"] = loadTexture("resources/wood.png");
  textures["tire"] = loadTexture("resources/tire.png");
  textures["brushed_aluminum"] = loadTexture("resources/brushed_aluminum.jpg");
  textures["brushed_aluminum_rot"] = loadTexture("resources/brushed_aluminum_rot.png");
  textures["marble1"] = loadTexture("resources/marble1.jpeg");
  textures["marble2"] = loadTexture("resources/marble2.jpeg");
  textures["marble3"] = loadTexture("resources/marble3.jpg");
  textures["marble4"] = loadTexture("resources/marble4.jpg");
}

function loadTexture(url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue

  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}