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

		function makeTgNorBi(){
			//Deben existir:
			//tangent, normal, binormal, 
			//prev_vert, curr_vert, next_vert

			tangent = vec3.create();
			vec3.sub(tangent, next_vert, curr_vert); 

			normal = vec3.create();
			vec3.sub(normal, prev_vert, curr_vert); //el vec que va de curr a prev
			vec3.add(normal, normal, tangent);

			binormal = vec3.create();
			vec3.cross(binormal, tangent, normal);

			vec3.normalize(tangent, tangent);
			vec3.normalize(normal, normal);
			vec3.normalize(binormal, binormal);

		}

		function makeTransformMatrix(){
			// transform_matrix, curr_vert,
			 // tangent, normal, binormal

			var matrix_values = [];

			concatVectorElems(matrix_values, tangent);
			matrix_values.push(0);
			concatVectorElems(matrix_values, normal);
			matrix_values.push(0);
			concatVectorElems(matrix_values, binormal);
			matrix_values.push(0);
			concatVectorElems(matrix_values, [0,0,0,1]);

			// mat4.transpose(matrix_values,matrix_values);
			mat4.translate(matrix_values, matrix_values, curr_vert);

			matrix_values.forEach(function(elem, index){
				transform_matrix[index] = elem;
			});

		}

		function transformShape(){
			// new_shape, shape, transform_matrix

			var curr_vert;

			for(i = 0; i < shape.length; i+=2){
				curr_vert = vec3.fromValues(shape[i], shape[i+1], 0);
				vec3.transformMat4(curr_vert, curr_vert, transform_matrix);

				concatVectorElems(new_shape, curr_vert);
			}

			debugger;
		}

		//Empieza el "main"

		for(var j = 0; j < sweep_path.length - 1; j+=3){
			var tangent, normal, binormal;
			var curr_vert, prev_vert, next_vert;

			if(j === 0){
				var dummy;

				var first_point = sweep_path.slice(0,3);
				var second_point = sweep_path.slice(3,6);
				var third_point = sweep_path.slice(6,9);

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

				curr_vert = sweep_path.slice(j, j+3);
				prev_vert = sweep_path.slice(j-3, j);
				next_vert = sweep_path.slice(j+3, j+6);

				makeTgNorBi();

			}

			// debugger;

			var transform_matrix = mat4.create();

			makeTransformMatrix();

			var new_shape = [];
			transformShape();

			new_shape.forEach(function(elem){
				that.position_buffer.push(elem);
			})

			// debugger;
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