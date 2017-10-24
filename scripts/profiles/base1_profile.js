function Base1Profile() {
  this.radius = [];
  this.axis = [];
  this.normals = [];

  var _bezier_curve;
  var that = this;
  
  function _init() {
    var control_points = [];
    
    control_points.push([4.0,0.0,0.0]);
    control_points.push([3.0,1.0,0.0]);
    control_points.push([2.2,1.8,0.0]);
    control_points.push([2.0,2.0,0.0]);
    
    control_points.push([1.8,2.2,0.0]);
    control_points.push([2.0,3.9,0.0]);
    control_points.push([2.0,4.0,0.0]);
    
    control_points.push([2.0,4.1,0.0]);
    control_points.push([3.5,4.5,0.0]);
    control_points.push([3.5,5.0,0.0]);
    
    control_points.push([3.5,5.5,0.0]);
    control_points.push([3.5,6.5,0.0]);
    control_points.push([3.5,7.0,0.0]);
    
    control_points.push([3.5,7.5,0.0]);
    control_points.push([1.0,8.0,0.0]);
    control_points.push([2.5,10.0,0.0]);
    
    _bezier_curve = new CubicBezierCurve(control_points); 
  }

  _init();

  this.travel = function(delta) {
    var bezier_curve = _bezier_curve.travel(delta);
    
    this.radius.push(0);
    this.axis.push(0);
    
    bezier_curve.positions.forEach(function(elem,index) {
      if (index % 3 == 0) {
        that.radius.push(elem);
      } else if ((index + 2) % 3 == 0) {
        that.axis.push(elem);
      }
    });

    this.normals.push(-1.0);

    bezier_curve.tangents.forEach(function(elem,index){
      if ((index + 1) % 3 == 0) {
        that.normals.push(elem);
      }
    });

  }
}