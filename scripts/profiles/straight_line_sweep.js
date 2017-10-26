function StraightLineSweep(){
  
  var _sweep_path = [];
  var M = 20;

  for(var i = 0; i < M; i++){
    _sweep_path.push(0);
    _sweep_path.push(1/M*i);
    _sweep_path.push(0);
  }

  sweep_path = new Polygon(_sweep_path);

  return sweep_path;
}