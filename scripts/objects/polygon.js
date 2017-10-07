function Polygon(points, closed=false){

	this.points = points.slice();
	var that = this;


	this.tangents = [];
	this.normals = [];
	this.binormals = [];
	this.length = points.length/3;

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

		vec3.normalize(tangent, tangent);
		vec3.normalize(normal, normal);
		vec3.normalize(binormal, binormal);
	}


	for(var j = 0; j < points.length - 2; j+=3){

		var tangent, normal, binormal;
		var curr_vert, prev_vert, next_vert;

		if(j === 0){
			var dummy;

			var first_point = vec3.fromValues(points[0],points[1],points[2]);
			var second_point = vec3.fromValues(points[3],points[4],points[5]);
			var third_point = vec3.fromValues(points[6],points[7],points[8]);

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

			curr_vert = vec3.fromValues(points[j], points[j+1], points[j+2]);
			prev_vert = vec3.fromValues(points[j-3], points[j-2], points[j-1]);
			next_vert = vec3.fromValues(points[j+3], points[j+4], points[j+5]);

			makeTgNorBi();

		}
		concatVectorElems(this.tangents, tangent);
		concatVectorElems(this.normals, normal);
		concatVectorElems(this.binormals, binormal);

	}

}