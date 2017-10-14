function Loft(shape, sweep_path, texture, twist = 0, shader, light, diffuseColor){

	var rows = shape.positions.length/2;
	var cols = sweep_path.length/3 + 1;

	Object3D.call(this,rows,cols,texture, shader, light, diffuseColor);
	var that = this;
	that.sweep_path = sweep_path;
	that.shape = shape;
	that.twist = twist;

	this._createAttributesBuffers = function(){

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
		for(var j = 0; j < sweep_path.length; j+=3){
			var tangent, normal, binormal;
			var curr_vert, prev_vert, next_vert;

			
			curr_vert = vec3.fromValues(sweep_path.points[3*j], 
														sweep_path.points[3*j+1], 
														sweep_path.points[3*j+2]);


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

		// debugger;

		if(true){
			curr_vert = vec3.fromValues(sweep_path.points[0],
														 sweep_path.points[1],
														 sweep_path.points[2]);

			tangent = vec3.fromValues(sweep_path.tangents[0],
     			                      sweep_path.tangents[1],
     			                      sweep_path.tangents[2]);

			normal = vec3.fromValues(sweep_path.normals[0],
     			                     sweep_path.normals[1],
     			                     sweep_path.normals[2]);

			binormal = vec3.fromValues(sweep_path.binormals[0],
     			                       sweep_path.binormals[1],
     			                       sweep_path.binormals[2]);

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
				that.texture_buffer.push(j/(that.cols)*4);
			}
		}
	}

	that._resetState = function() {
	  // that.rotate(5.0*t, [1.0, 0.0, 0.0]);
  	}
}

inheritPrototype(Cylinder, Object3D);