function Shelve(numberOfShelves, baseSize, texture, shader, lights, specs) {
  Object3D.call(this, null, null, null, null, null, null);
  this.drawEnabled = false;
  
  var that = this;
  
  // Base
  this.childs[0] = new Cube(10,
                            10,
                            texture,
                            shader,
                            lights,
                            specs,
                            true);

  //Shelves
  for (var i = 1; i <= numberOfShelves*5; i++) {
    if (i % 5 == 0) {
      this.childs[i] = new Cube(10,
                                10,
                                texture,
                                shader,
                                lights,
                                specs,
                                true);
    } else {
      this.childs[i] = new Cube(10,
                                10,
                                texture,
                                shader,
                                lights,
                                specs,
                                true);
    }
  }

  var deltaY = 1.0;

  this._drawChilds = function(transformations) {
    var base_transformations = mat4.create();
    mat4.scale(base_transformations,base_transformations,[1.0,baseSize,1.0]);
    mat4.multiply(base_transformations,transformations,base_transformations);
    this.childs[0].draw(base_transformations);

    var curY = baseSize;

    for (var i = 0; i < numberOfShelves; i++) {
      base_transformations = mat4.create();
      mat4.translate(base_transformations,base_transformations,[0.45,curY,0.45]);
      base_transformations = mat4.scale(base_transformations,base_transformations,[0.1,0.9,0.1]);
      mat4.multiply(base_transformations,transformations,base_transformations);
      this.childs[1+(i*5)].draw(base_transformations);

      base_transformations = mat4.create();
      mat4.translate(base_transformations,base_transformations,[-0.45,curY,0.45]);
      base_transformations = mat4.scale(base_transformations,base_transformations,[0.1,0.9,0.1]);
      mat4.multiply(base_transformations,transformations,base_transformations);
      this.childs[2+(i*5)].draw(base_transformations);

      base_transformations = mat4.create();
      mat4.translate(base_transformations,base_transformations,[0.45,curY,-0.45]);
      base_transformations = mat4.scale(base_transformations,base_transformations,[0.1,0.9,0.1]);
      mat4.multiply(base_transformations,transformations,base_transformations);
      this.childs[3+(i*5)].draw(base_transformations);

      base_transformations = mat4.create();
      mat4.translate(base_transformations,base_transformations,[-0.45,curY,-0.45]);
      base_transformations = mat4.scale(base_transformations,base_transformations,[0.1,0.9,0.1]);
      mat4.multiply(base_transformations,transformations,base_transformations);
      this.childs[4+(i*5)].draw(base_transformations);

      base_transformations = mat4.create();
      mat4.translate(base_transformations,base_transformations,[0,curY+0.90,0]);
      base_transformations = mat4.scale(base_transformations,base_transformations,[1.0,0.1,1.0]);
      mat4.multiply(base_transformations,transformations,base_transformations);
      this.childs[5+(i*5)].draw(base_transformations);

      curY += 1;
    }
  }
}

inheritPrototype(Shelve,Object3D);