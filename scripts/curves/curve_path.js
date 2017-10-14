function CurvePath(control_points){
	this.control_points = control_points;
	this.positions = [];
	this.tangents = [];
	this.normals = [];
	this.binormals = [];

	var _bezier_curve = new CubicBezierCurve(control_points);

	this.travel = function(delta){
		var points = _bezier_curve.travel(delta);
		this.positions = points.positions;
		this.tangents = points.tangents;
		this.normals = points.normals;
		this.binormals = points.binormals;
	}
}