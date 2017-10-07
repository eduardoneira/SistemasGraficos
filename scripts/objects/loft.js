/*
* shape debe ser un surface
* sweep_path deber ser un curve
*/

function Loft(shape, sweep_path, texture, twist = 0, shader, light, diffuseColor){

	var rows = shape.positions.length/2;
	var cols = sweep_path.length/3;

	Object3D.call(this,rows,cols,texture, shader, light, diffuseColor);
	var that = this;
	that.sweep_path = sweep_path;
	that.shape = shape;
	that.twist = twist;

	this._createAttributesBuffers = function(){

		// function makeTgNorBi(){
		// 	//Deben existir:
		// 	//tangent, normal, binormal, 
		// 	//prev_vert, curr_vert, next_vert
		// 	tangent = vec3.create();
		// 	vec3.sub(tangent, next_vert, curr_vert); 

		// 	normal = vec3.create();
		// 	vec3.sub(normal, prev_vert, curr_vert);
		// 	vec3.add(normal, normal, tangent);

		// 	binormal = vec3.create();
		// 	vec3.cross(binormal, tangent, normal);

		// 	vec3.normalize(tangent, tangent);
		// 	vec3.normalize(normal, normal);
		// 	vec3.normalize(binormal, binormal);
		// }

		// function makeTransformMatrix(){
		// 	// transform_matrix, curr_vert,
		// 	 // tangent, normal, binormal
		// 	var matrix_values = [];

		// 	concatVectorElems(matrix_values, normal);
		// 	matrix_values.push(0);
		// 	concatVectorElems(matrix_values, binormal);
		// 	matrix_values.push(0);
		// 	concatVectorElems(matrix_values, tangent);
		// 	matrix_values.push(0);
		// 	concatVectorElems(matrix_values, curr_vert);
		// 	matrix_values.push(0);

		// 	transform_matrix = matrix_values.slice();

		// }

		function transformShape(){
			// new_shape, shape, transform_matrix
			var aux_vert, rot;

			for(i = 0; i < shape.positions.length; i+=2){
				aux_vert = vec3.fromValues(shape.positions[i], shape.positions[i+1], 0);

				rot = mat4.create();
				mat4.rotateZ(rot, rot, twist*j);
				vec3.transformMat4(aux_vert, aux_vert, rot);

				vec3.transformMat4(aux_vert, aux_vert, transform_matrix);


				concatVectorElems(new_shape, aux_vert);
			}
		}


		function transformShapeNormals(){
			// new_shape, shape, transform_matrix
			var aux_vert, rot;

			transform_matrix[12] = 0;
			transform_matrix[13] = 0;
			transform_matrix[14] = 0;
			transform_matrix[15] = 1;

			for(i = 0; i < shape.normals.length; i+=2){
				aux_vert = vec3.fromValues(shape.normals[i], shape.normals[i+1], 0);

				rot = mat4.create();
				mat4.rotateZ(rot, rot, twist*j);
				vec3.transformMat4(aux_vert, aux_vert, rot);

				vec3.transformMat4(aux_vert, aux_vert, transform_matrix);


				concatVectorElems(new_shape_normals, aux_vert);
			}
		}




		//Empieza el "main"

		// for(var j = 0; j < sweep_path.length - 2; j+=3){
		// 	var tangent, normal, binormal;
		// 	var curr_vert, prev_vert, next_vert;

		// 	if(j === 0){
		// 		var dummy;

		// 		var first_point = vec3.fromValues(sweep_path[0],sweep_path[1],sweep_path[2]);
		// 		var second_point = vec3.fromValues(sweep_path[3],sweep_path[4],sweep_path[5]);
		// 		var third_point = vec3.fromValues(sweep_path[6],sweep_path[7],sweep_path[8]);

		// 		curr_vert = second_point;
		// 		prev_vert = first_point;
		// 		next_vert = third_point;

		// 		makeTgNorBi();

		// 		var normal2 = normal;
		// 		var binormal2 = binormal;

		// 		curr_vert = first_point;
		// 		prev_vert = third_point;
		// 		next_vert = second_point;

		// 		makeTgNorBi();

		// 		normal = normal2;
		// 		binormal = binormal2;

		// 		curr_vert = first_point;
		// 		next_vert = second_point;
		// 		prev_vert = null;

		// 	}
		// 	else{

		// 		curr_vert = vec3.fromValues(sweep_path[j], sweep_path[j+1], sweep_path[j+2]);
		// 		prev_vert = vec3.fromValues(sweep_path[j-3], sweep_path[j-2], sweep_path[j-1]);
		// 		next_vert = vec3.fromValues(sweep_path[j+3], sweep_path[j+4], sweep_path[j+5]);

		// 		makeTgNorBi();

		// 	}
			// var transform_matrix = mat4.create();

			// makeTransformMatrix();


			//Empieza el "main"

		// for(var j = 0; j < sweep_path.length - 2; j+=3){
		for(var j = 0; j < sweep_path.length; j++){
			var tangent, normal, binormal;
			var curr_vert, prev_vert, next_vert;

			if(j === 0){
				curr_vert = vec3.fromValues(sweep_path.points[3*j], 
																		sweep_path.points[3*j+1], 
																		sweep_path.points[3*j+2]);

				prev_vert = vec3.fromValues(sweep_path.points[3*(j+2)], 
																		sweep_path.points[3*(j+2)+1], 
																		sweep_path.points[3*(j+2)+2]);

				next_vert = vec3.fromValues(sweep_path.points[3*(j+1)], 
																		sweep_path.points[3*(j+1)+1], 
																		sweep_path.points[3*(j+1)+2]);

			}
			else{
				curr_vert = vec3.fromValues(sweep_path.points[3*j], 
																		sweep_path.points[3*j+1], 
																		sweep_path.points[3*j+2]);

				prev_vert = vec3.fromValues(sweep_path.points[3*(j-1)], 
																		sweep_path.points[3*(j-1)+1], 
																		sweep_path.points[3*(j-1)+2]);

				next_vert = vec3.fromValues(sweep_path.points[3*(j+1)], 
																		sweep_path.points[3*(j+1)+1], 
																		sweep_path.points[3*(j+1)+2]);
			}

			tangent = vec3.fromValues(sweep_path.tangents[3*j],
     			                      sweep_path.tangents[3*j+1],
     			                      sweep_path.tangents[3*j+2]);

			normal = vec3.fromValues(sweep_path.normals[3*j],
     			                     sweep_path.normals[3*j+1],
     			                     sweep_path.normals[3*j+2]);

			binormal = vec3.fromValues(sweep_path.binormals[3*j],
     			                       sweep_path.binormals[3*j+1],
     			                       sweep_path.binormals[3*j+2]);

			transform_matrix = makeTransformMatrix(tangent, normal, binormal, curr_vert);

			var new_shape = [];
			var new_shape_normals = [];
			transformShape();
			transformShapeNormals();

			new_shape.forEach(function(elem){
				that.position_buffer.push(elem);
			})


			new_shape_normals.forEach(function(elem){
				that.normal_buffer.push(elem);
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