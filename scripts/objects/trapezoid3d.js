function Trapezoid3D(rows, cols, shrink_length_factor, shrink_width_factor,texture, shader, light, diffuseColor, repeatTexture) {
  
  Object3D.call(this, null, null, null, null, null);

  this.drawEnabled = false;
  var that = this;
  
  this.childs[0] = new Plane( rows,
                              cols,
                              texture,
                              shader,
                              light,
                              diffuseColor,
                              repeatTexture
                            );
  this.childs[0].init();
  this.childs[0].rotate(degToRad(180),[1.0,0.0,0.0]);

  this.childs[1] = new Plane( rows,
                              cols,
                              texture,
                              shader,
                              light,
                              diffuseColor,
                              repeatTexture
                            );
  this.childs[1].init();
  this.childs[1].translate([0.0,1.0,0.0]);
  this.childs[1].scale([shrink_width_factor,1.0,shrink_length_factor]);

  var angle_length = Math.atan(1/(1 - shrink_length_factor));
  var scale_length = Math.sqrt(1 + (shrink_length_factor*shrink_length_factor));

  var angle_width = Math.atan(1/(1 - shrink_width_factor));

  this.childs[2] = new Trapezoid( rows,
                                  cols,
                                  shrink_length_factor,
                                  texture,
                                  shader,
                                  light,
                                  diffuseColor,
                                  repeatTexture
                                );
  this.childs[2].init();

  this.childs[2].translate([1.0,0.0,0.0]);
  this.childs[2].rotate(-Math.atan(angle_length),[0.0,0.0,1.0]);
  this.childs[2].scale([scale_length,1.0,scale_length]);
  this.childs[2].translate([-0.5,0.0,0.0]);
  this.childs[2].rotate(degToRad(270),[0.0,1.0,0.0]);
    
  // this.childs[2].rotate(degToRad(90),[0.0,0.0,-1.0]);
  // this.childs[2].translate([-0.5,0.5,0.0]);
  
  // this.childs[3].rotate(degToRad(90),[-1.0,0.0,0.0]);
  // this.childs[3].translate([0.0,0.5,0.5]);

  // this.childs[4].rotate(degToRad(90),[1.0,0.0,0.0]);
  // this.childs[4].translate([0.0,0.5,-0.5]);

  // this.childs[5].translate([0.0,1.0,0.0]);
  // this.childs[5].scale([,1.0,]);
  
  this._drawChilds = function(transformations) {
    this.childs[0].activateShader();
    this.childs[0].draw(transformations);
    
    this.childs[1].activateShader();
    this.childs[1].draw(transformations);
    
    this.childs[2].activateShader();
    this.childs[2].draw(transformations);
    
    // this.childs[3].activateShader();
    // this.childs[3].draw(transformations);
    
    // this.childs[4].activateShader();
    // this.childs[4].draw(transformations);
    
    // this.childs[5].activateShader();
    // this.childs[5].draw(transformations);
  }



}

inheritPrototype(Trapezoid3D,Object3D);