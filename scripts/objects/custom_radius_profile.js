function CoustomRadiusProfile(points) {
  this.axis = [];
  this.radius = [];
  this.normals = [];

  this.points = points;

  this.points.forEach(function(elem){
    this.radius.push(elem[1]);
    this.axis.push(elem[0]);
    this.normals.push(0);
  });

  this.travel = function(delta) {
  }
}