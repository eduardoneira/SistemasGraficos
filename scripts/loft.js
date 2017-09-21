function Loft(shape, sweep_path, texture){
	//Se le debe pasar un objeto forma.
	//(!) Podria tener un par de valores por default...
	//Por ahora lo defino aca adentro para ir probando

	// export function angle(a, b) {
	//   let tempA = fromValues(a[0], a[1], a[2]);
	//   let tempB = fromValues(b[0], b[1], b[2]);

	//   normalize(tempA, tempA);
	//   normalize(tempB, tempB);

	//   let cosine = dot(tempA, tempB);

	//   if(cosine > 1.0) {
	//     return 0;
	//   }
	//   else if(cosine < -1.0) {
	//     return Math.PI;
	//   } else {
	//     return Math.acos(cosine);
	//   }
	// }

	function angle(a, b){
		var tempA = vec3.fromValues(a[0], a[1], a[2]);
		var tempB = vec3.fromValues(b[0], b[1], b[2]);

		vec3.normalize(tempA, tempA);
		vec3.normalize(tempB, tempB);

		var cosine = vec3.dot(tempA, tempB);
		if(cosine > 1.0) {
		    return 0;
		  }
		  else if(cosine < -1.0) {
		    return Math.PI;
		  } else {
		    return Math.acos(cosine);
		  }

	}

	shape = [];
	N = 12; //circulo de 12 lados
	r = 0.3;
	for(var i = 0; i < N+1; i++){
		shape.push(r*Math.cos(2*Math.PI*i/N));
		shape.push(r*Math.sin(2*Math.PI*i/N));
	}

	// shape[0] = 1;
	// shape[1] = 1;

	sweep_path = [];
	// sweep_path.push(0);
	// sweep_path.push(0);
	// sweep_path.push(0);	
	// sweep_path.push(.7);
	// sweep_path.push(.7);
	// sweep_path.push(0);
	// sweep_path.push(.7);
	// sweep_path.push(1.4);
	// sweep_path.push(0.7);


	M = 24;

	for(i = 0; i < M; i++){
		sweep_path.push(Uri.cos(M,i));
		sweep_path.push(Uri.sin(M,i));
		sweep_path.push(0);
	}

	var rows = shape.length/2;
	var cols = sweep_path.length/3;

	Object3D.call(this,rows,cols,texture);

	//how do we handle corners?
	//-> could round them up, bevel...
	//otherwise just use average angle
	//-> maybe enlarge so lines are kept straight?

	var that = this;

	this._createNormalBuffer = function() {
    	//TODO: implement
  	}

	this._createTexturePositionBuffer = function(){


		that.sweep_path = sweep_path;
		that.shape = shape;

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

		that.initial_twist = 0;
		var path_transforms = mat4.create();
		var path_tangent = vec3.create();
		var path_tangent2 = vec3.create();
		var path_normal = vec3.create();
		var path_binormal = vec3.create();
		var angle1 = 0, angle2 = 0;
		var current_vertex = [];
		var transform_mat_args = [];

		var cambio_base = mat4.create();

		//first row

		vec3.sub(path_tangent, sweep_path.slice(3,6), sweep_path.slice(0,3));
		vec3.sub(path_normal, sweep_path.slice(6,9), sweep_path.slice(0,3));


		vec3.cross(path_normal, path_normal, path_tangent);
		vec3.cross(path_binormal, path_normal, path_tangent);

		angle1 = angle(path_normal, [1,0,0]);
		angle2 = angle(path_binormal, [0,0,1]);

		path_transforms = mat4.create();
		mat4.rotate(path_transforms, path_transforms, angle1+that.initial_twist, path_tangent);
		mat4.rotate(path_transforms, path_transforms, angle2, path_normal);
		mat4.translate(path_transforms, path_transforms, sweep_path.slice(0,3));

		for(var i = 0; i < shape.length; i+=2){

			current_vertex = vec3.fromValues(shape[i], shape[i+1], 0);
			vec3.transformMat4(current_vertex, current_vertex, path_transforms);

			Array.prototype.forEach.call(current_vertex, function(elem){
				that.position_buffer.push(elem);
			});
		}


		//middle rows

		for(var j = 6; j < sweep_path.length; j+=3){
			vec3.copy(path_tangent2, path_tangent); // me acuerdo la tg anterior
			path_tangent = vec3.create(); // limpio variable
			vec3.sub(path_tangent, sweep_path.slice(j+3,j+6), sweep_path.slice(j,j+3));
			vec3.add(path_tangent, path_tangent, path_tangent2);
			vec3.scale(path_tangent, path_tangent, 0.5); //promedio las dos tangentes

			path_normal = vec3.create(); // limpio variable
			vec3.sub(path_normal, sweep_path.slice(j+3,j+6), sweep_path.slice(j-3,j));

			vec3.cross(path_normal, path_normal, path_tangent);
			vec3.cross(path_binormal, path_tangent, path_normal);

			angle1 = angle(path_normal, [1,0,0]);
			angle2 = angle(path_binormal, [0,0,1]);



			vec3.normalize(path_normal, path_normal);
			vec3.normalize(path_binormal, path_binormal);
			vec3.normalize(path_tangent, path_tangent);


			path_transforms = mat4.create();
			transform_mat_args = [];
			// transform_mat_args = transform_mat_args.concat(path_normal,   0,
			// 											   path_binormal, 0,
			// 											   path_tangent,  0,
			// 											   0,   0,   0,   1);

			transform_mat_args = transform_mat_args.concat(path_normal);
			transform_mat_args.push(0);
			transform_mat_args = transform_mat_args.concat(path_binormal);
			transform_mat_args.push	(0);
			transform_mat_args = transform_mat_args.concat(path_tangent);
			transform_mat_args.push	(0);
			transform_mat_args = transform_mat_args.concat([0,0,0,1]);

			


			transform_mat_args.forEach(function(elem, index){
				path_transforms[index] = elem;
			});

			// debugger;
			// mat4.rotate(path_transforms, path_transforms, angle1+that.initial_twist, path_tangent);
			// mat4.rotate(path_transforms, path_transforms, angle2, path_normal);
			mat4.translate(path_transforms, path_transforms, sweep_path.slice(j,j+3));

			for(i = 0; i < shape.length; i+=2){

				current_vertex = vec3.fromValues(shape[i], shape[i+1], 0);
				vec3.transformMat4(current_vertex, current_vertex, path_transforms);

				Array.prototype.forEach.call(current_vertex, function(elem){
					that.position_buffer.push(elem);
				});
			}

		}

		//last rows

		vec3.sub(path_tangent, sweep_path.slice(j,j+3), sweep_path.slice(j-3,j));
		vec3.sub(path_normal, sweep_path.slice(j,j+3), sweep_path.slice(j-6,j-3));


		vec3.cross(path_normal, path_normal, path_tangent);
		vec3.cross(path_binormal, path_normal, path_tangent);

		angle1 = angle(path_normal, [1,0,0]);
		angle2 = angle(path_binormal, [0,0,1]);

		path_transforms = mat4.create();
		mat4.rotate(path_transforms, path_transforms, angle1+that.initial_twist, path_tangent);
		mat4.rotate(path_transforms, path_transforms, angle2, path_normal);
		mat4.translate(path_transforms, path_transforms, sweep_path.slice(j,j+3));

		for(i = 0; i < shape.length; i+=2){

			current_vertex = vec3.fromValues(shape[i], shape[i+1], 0);
			vec3.transformMat4(current_vertex, current_vertex, path_transforms);

			Array.prototype.forEach.call(current_vertex, function(elem){
				that.position_buffer.push(elem);
			});
		}	

		for(j = 0; j < that.cols; j++){
			for(i = 0; i < that.rows; i++){
				that.texture_buffer.push(i/that.rows);
				that.texture_buffer.push(j/that.cols*4);
			}
		}
	}

	  that._resetState = function() {
	  // that.rotate(5.0*t, [1.0, 0.0, 0.0]);
  	}

}

inheritPrototype(Cylinder, Object3D);