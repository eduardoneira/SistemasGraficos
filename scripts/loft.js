function Loft(shape, sweep_path, texture){
	//Se le debe pasar un objeto forma.
	//(!) Podria tener un par de valores por default...
	//Por ahora lo defino aca adentro para ir probando

	shape = [];
	N = 12; //circulo de 12 lados
	r = 0.3;
	for(var i = 0; i < N; i++){
		shape.push(r*Uri.cos(N,i));
		shape.push(r*Uri.sin(N,i));
	}

	shape[0] = 1;
	shape[1] = 1;

	sweep_path = [];
	sweep_path.push(0);
	sweep_path.push(0);
	sweep_path.push(0);	
	sweep_path.push(.7);
	sweep_path.push(.7);
	sweep_path.push(0);

	var rows = shape.length/2;
	var cols = sweep_path.length/3;

	Object3D.call(this,rows,cols,texture);

	//how do we handle corners?
	//-> could round them up, bevel...
	//otherwise just use average angle
	//-> maybe enlarge so lines are kept straight?

	this.sweep_path = sweep_path;
	this.shape = shape;

	function getCenter3v(arr){
		//espera array de vec3 compacto
		var x = 0, y = 0, z = 0;

		for(var i = 0; i < arr.length; i+=3){
			x += arr[i];
			y += arr[i+1];
			z += arr[i+2];
		}

		//return [x,y,z]/arr.length;
		return [x,y,z].map(function(elem){return elem/arr.length*3});
	}

	this.initial_twist = 0;
	var path_transforms = mat4.create();
	var current_slice = vec3.create();
	var path_tangent = vec3.create();
	var path_normal = vec3.create();
	var path_binormal = vec3.create();
	var angle1 = 0, angle2 = 0;
	var current_vertex = [];

	//first row

	vec3.sub(path_tangent, sweep_path.slice(3,6), sweep_path.slice(0,3));
	vec3.sub(path_normal, sweep_path.slice(6,9), sweep_path.slice(0,3));

	current_slice = shape.slice(0,2).concat(0);

	vec3.cross(path_normal, path_normal, path_tangent);
	vec3.cross(path_binormal, path_normal, path_tangent);

	angle1 = vec3.angle(path_normal, [1,0,0]);
	angle2 = vec3.angle(path_binormal, [0,1,0]);

	mat4.rotate(path_transforms, path_transforms, angle1, path_tangent);
	mat4.rotate(path_transforms, path_transforms, angle2, path_normal);
	mat4.translate(path_transforms, path_transforms, sweep_path.slice(0,3));

	for(var i = 0; i < shape.length; i+=2){

		current_vertex = vec3.fromValues(shape[i], shape[i+1], 0);
		vec3.transformMat4(current_vertex, current_vertex, path_transforms);

		Array.prototype.forEach.call(current_vertex, function(elem){
			current_slice.push(elem);
		});
	}


//transformMat4(out, a, m)

	//should there be shape.getCenter()?

	for(var i = 0; i < this.rows; i++){

		//first get tangent direction


		this.position_buffer

	}	

	// for(var i = 0; i < this.cols - 1; i++){
	// 	for(var j = 0; j < this.rows; j++){

	// 	}
	// }


}