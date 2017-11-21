function Loft(shape, sweep_path, texture, twist = 0, shader, lights, specs=null, close = false){

	var rows = shape.positions.length/2;
	var cols = sweep_path.length;
	
	if (sweep_path.closed){
		cols += 1;
	}

	if (close) {
		cols += 2;
	}

	Object3D.call(this, rows, cols, texture, shader, lights, specs);
	var that = this;
	that.sweep_path = sweep_path;
	that.shape = shape;
	that.twist = twist;
	that.close = close;

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

		if (that.close) {
			for(var i = 0; i < that.shape.positions.length/2; i++) {
				that.position_buffer.push(sweep_path.points[0]); 
				that.position_buffer.push(sweep_path.points[1]); 
				that.position_buffer.push(sweep_path.points[2]);

				that.normal_buffer.push(-sweep_path.tangents[0]); 
				that.normal_buffer.push(-sweep_path.tangents[1]); 
				that.normal_buffer.push(-sweep_path.tangents[2]); 
				
				var tangent_vector = [sweep_path.tangents[1],-1.0*sweep_path.tangents[0],0.0];
	      that.tangent_buffer.push(tangent_vector[0]);
	      that.tangent_buffer.push(tangent_vector[1]);
	      that.tangent_buffer.push(tangent_vector[2]);

	      var binormal_vector = [];
	      vec3.cross(binormal_vector,that.normal_buffer.slice(-3),tangent_vector);
	      that.binormal_buffer.push(binormal_vector[0]);
	      that.binormal_buffer.push(binormal_vector[1]);
	      that.binormal_buffer.push(binormal_vector[2]);
			}
		}

		for(var j = 0; j < sweep_path.length; j+=1){
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

		if(sweep_path.closed){
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
			});

			new_shape_normals.forEach(function(elem){
				that.normal_buffer.push(elem);
			});

			var tangent_vector = [new_shape_normals[2],0.0,-1.0*new_shape_normals[0]];
      that.tangent_buffer.push(tangent_vector[0]);
      that.tangent_buffer.push(tangent_vector[1]);
      that.tangent_buffer.push(tangent_vector[2]);

      var binormal_vector = [];
      vec3.cross(binormal_vector,new_shape_normals,tangent_vector);
      that.binormal_buffer.push(binormal_vector[0]);
      that.binormal_buffer.push(binormal_vector[1]);
      that.binormal_buffer.push(binormal_vector[2]);
		}

		if (that.close) {
			for(var i = 0; i < that.shape.positions.length/2; i++) {
				that.position_buffer.push(sweep_path.points[sweep_path.points.length-3]); 
				that.position_buffer.push(sweep_path.points[sweep_path.points.length-2]); 
				that.position_buffer.push(sweep_path.points[sweep_path.points.length-1]);

				that.normal_buffer.push(sweep_path.tangents[sweep_path.points.length-3]); 
				that.normal_buffer.push(sweep_path.tangents[sweep_path.points.length-2]); 
				that.normal_buffer.push(sweep_path.tangents[sweep_path.points.length-1]); 

				var tangent_vector = [sweep_path.tangents[sweep_path.points.length-2],-1.0*sweep_path.tangents[sweep_path.points.length-3],0.0];
	      that.tangent_buffer.push(tangent_vector[0]);
	      that.tangent_buffer.push(tangent_vector[1]);
	      that.tangent_buffer.push(tangent_vector[2]);

	      var binormal_vector = [];
	      vec3.cross(binormal_vector,that.normal_buffer.slice(-3),tangent_vector);
	      that.binormal_buffer.push(binormal_vector[0]);
	      that.binormal_buffer.push(binormal_vector[1]);
	      that.binormal_buffer.push(binormal_vector[2]);
			}
		}

		for(j = 0; j < that.cols; j++){
			for(i = 0; i < that.rows; i++){
				that.texture_buffer.push(i/that.rows);
				that.texture_buffer.push(j/that.cols);
			}
		}
	}
}

inheritPrototype(Cylinder, Object3D);