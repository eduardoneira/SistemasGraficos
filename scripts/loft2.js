function Loft2(shape, sweep_path, texture){

	var rows = shape.length/2;
	var cols = sweep_path.length/3;

	Object3D.call(this,rows,cols,texture);
	var that = this;
	that.sweep_path = sweep_path;
	that.shape = shape;

	this._createNormalBuffer = function() {
    	//TODO: implement
  	}

	this._createTexturePositionBuffer = function(){

		function concatVectorElems(arr, vect){
			Array.prototype.forEach.call(vect, function(elem){
				arr.push(elem);
			})
		}

		function makeTgNorBi(tangent, normal, binormal, 
							 prev_vert, curr_vert, next_vert){

			tangent = vec3.create();
			vec3.sub(tangent, next_vert, curr_vert);

			normal = vec3.create();
			vec3.sub(normal, curr_vert, prev_vert); //el vec que va de curr a prev
			vec3.add(normal, normal, tangent);

			binormal = vec3.create();
			vec3.cross(binormal, tangent, normal);

			vec3.normalize(tangent, tangent);
			vec3.normalize(normal, normal);
			vec3.normalize(binormal, binormal);

			console.log("me llamaron");

		}

		function makeTransformMatrix(transform_matrix, curr_vert,
									 tangent, normal, binormal){

			var matrix_values = [];

			concatVectorElems(matrix_values, normal);
			matrix_values.push(0);
			concatVectorElems(matrix_values, tangent);
			matrix_values.push(0);
			concatVectorElems(matrix_values, binormal);
			matrix_values.push(0);
			concatVectorElems(matrix_values, [0,0,0,1]);

			transform_matrix.forEach(function(elem, index){
				transform_matrix[index] = elem;
			});

			mat4.translate(matrix_values, matrix_values, curr_vert);
		}

		function transformShape(new_shape, old_shape, transform_matrix){

			var curr_vert;

			new_shape = [];

			for(i = 0; i < old_shape.length; i+=2){
				curr_vert = vec3.fromValues(old_shape[i], old_shape[i+1], 0);
				vec3.transformMat4(curr_vert, curr_vert, transform_matrix);

				concatVectorElems(new_shape, curr_vert);
			}
		}

		//Empieza el "main"

		for(var j = 0; j < sweep_path.length; j+=3){
			var tangent, normal, binormal;
			var curr_vert, prev_vert, next_vert;

			if(j === 0){
				var dummy;

				var first_point = sweep_path.slice(0,3);
				var second_point = sweep_path.slice(3,6);
				var third_point = sweep_path.slice(6,9);

				makeTgNorBi(tangent, normal, binormal, 
					        first_point, second_point, third_point);
				debugger;
				makeTgNorBi(tangent, dummy, dummy, 
					        third_point, first_point, second_point);

				curr_vert = first_point;
				next_vert = second_point;
				prev_vert = null;

			}
			else{

				curr_vert = sweep_path.slice(j, j+3);
				prev_vert = sweep_path.slice(j-3, j);
				next_vert = sweep_path.slice(j+3, j+6);

				makeTgNorBi(tangent, normal, binormal, 
					        prev_vert, curr_vert, next_vert);

			}

			debugger;

			var transform_matrix = mat4.create();

			makeTransformMatrix(transform_matrix, curr_vert, 
				                tangent, normal, binormal);

			var transformed_shape = [];
			transformShape(transformed_shape, shape, transform_matrix);

			transformed_shape.forEach(function(elem){
				that.position_buffer.push(elem);
			})
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