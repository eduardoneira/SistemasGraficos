function Cube(rows, cols, texture, shader, light, diffuseColor,repeatTexture) {
  Object3D.call(this, null, null, null, null, null);
  this.drawEnabled = false;
  var that = this;
  
  for (var i = 0; i < 6; i++) {
    this.childs[i] = new Plane( rows,
                                cols,
                                texture,
                                shader,
                                light,
                                diffuseColor,
                                repeatTexture
                               );
    this.childs[i].init();
  }

  this.childs[0].rotate(degToRad(180),[1.0,0.0,0.0]);
  
  this.childs[1].rotate(degToRad(90),[0.0,0.0,1.0]);
  this.childs[1].translate([0.5,0.5,0.0]);
    
  this.childs[2].rotate(degToRad(90),[0.0,0.0,-1.0]);
  this.childs[2].translate([-0.5,0.5,0.0]);
  
  this.childs[3].rotate(degToRad(90),[-1.0,0.0,0.0]);
  this.childs[3].translate([0.0,0.5,0.5]);

  this.childs[4].rotate(degToRad(90),[1.0,0.0,0.0]);
  this.childs[4].translate([0.0,0.5,-0.5]);

  this.childs[5].translate([0.0,1.0,0.0]);

  this._drawChilds = function(transformations) {
    this.childs[0].draw(transformations);
    
    this.childs[1].draw(transformations);
    
    this.childs[2].draw(transformations);
    
    this.childs[3].draw(transformations);
    
    this.childs[4].draw(transformations);
    
    this.childs[5].draw(transformations);
  }


}

inheritPrototype(Cube, Object3D);