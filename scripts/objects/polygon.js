function Polygon(points, closed=false){

	var that = this;
	// var points = points.slice();
	this.points = points.slice();

	if(closed){
		this.points.push(points[0]);
		this.points.push(points[1]);
		this.points.push(points[2]);
	}


	this.tangents = [];
	this.normals = [];
	this.binormals = [];
	this.length = this.points.length/3;
	this.closed = closed;

	function makeTgNorBi(){
		//Deben existir:
		//tangent, normal, binormal, 
		//prev_vert, curr_vert, next_vert
		tangent = vec3.create();
		vec3.sub(tangent, next_vert, curr_vert); 

		normal = vec3.create();
		vec3.sub(normal, prev_vert, curr_vert);
		vec3.add(normal, normal, tangent);

		binormal = vec3.create();
		vec3.cross(binormal, tangent, normal);

		if (vec3.length(binormal) == 0.0) {
			normal = vec3.fromValues(tangent[1],tangent[2],tangent[0]);
			vec3.cross(binormal, tangent, normal);
		}

		vec3.normalize(tangent, tangent);
		vec3.normalize(normal, normal);
		vec3.normalize(binormal, binormal);
	}


	for(var j = 0; j < this.points.length - 5; j+=3){

		var tangent, normal, binormal;
		var curr_vert, prev_vert, next_vert;

		if(j === 0){
			var dummy;

			var first_point = vec3.fromValues(this.points[0],this.points[1],this.points[2]);
			var second_point = vec3.fromValues(this.points[3],this.points[4],this.points[5]);
			var third_point = vec3.fromValues(this.points[6],this.points[7],this.points[8]);

			curr_vert = second_point;
			prev_vert = first_point;
			next_vert = third_point;

			makeTgNorBi();

			var normal2 = normal;
			var binormal2 = binormal;

			curr_vert = first_point;
			prev_vert = third_point;
			next_vert = second_point;

			makeTgNorBi();

			normal = normal2;
			binormal = binormal2;

			curr_vert = first_point;
			next_vert = second_point;
			prev_vert = null;

		}
		else{
			curr_vert = vec3.fromValues(this.points[j], this.points[j+1], this.points[j+2]);
			prev_vert = vec3.fromValues(this.points[j-3], this.points[j-2], this.points[j-1]);
			next_vert = vec3.fromValues(this.points[j+3], this.points[j+4], this.points[j+5]);

			makeTgNorBi();

		}
		concatVectorElems(this.tangents, tangent);
		concatVectorElems(this.normals, normal);
		concatVectorElems(this.binormals, binormal);

	}

	concatVectorElems(this.tangents, tangent);
	concatVectorElems(this.normals, normal);
	concatVectorElems(this.binormals, binormal);

}