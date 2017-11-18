function inheritPrototype(child, parent) {
  var copyOfParent = Object.create(parent.prototype); 
  
  copyOfParent.constructor = child;
  child.prototype = copyOfParent;
}

function concatVectorElems(arr, vect){
	Array.prototype.forEach.call(vect, function(elem){
		arr.push(elem);
	});
}

function degToRad(degrees) {
	return degrees * Math.PI / 180.0;
}

function generateArrayAlpha(n) {
  return Array.from({length: n},(v,k) => k+1);
}

function makeTransformMatrix(tangent, normal, binormal, curr_vert){
  // transform_matrix, curr_vert,
   // tangent, normal, binormal
  var matrix_values = [];

  concatVectorElems(matrix_values, normal);
  matrix_values.push(0);
  concatVectorElems(matrix_values, binormal);
  matrix_values.push(0);
  concatVectorElems(matrix_values, tangent);
  matrix_values.push(0);
  concatVectorElems(matrix_values, curr_vert);
  matrix_values.push(0);

  transform_matrix = matrix_values.slice();


  return transform_matrix;
}

function getPositionMat4(matrix) {
  return matrix.slice(12,15);
}

function makeFlatCircle(radius, M){
  var points = [];

  for(var i = 0; i < M; i++){
    points.push(radius*Math.cos(2*Math.PI*i/M));
    points.push(radius*Math.sin(2*Math.PI*i/M));
    points.push(0);
  }

  return points;
}

function print3DPos(vect_array){
  for(var i = 0; i < vect_array.length; i++){
    console.log(vect_array[i],   ", ",
                vect_array[i+1], ", ",
                vect_array[i+2], ";");
  }
}

function defaultMaterialSpecs() {
  return { materialReflectances: { ambient:  [1.0, 1.0, 1.0],
                                   diffuse:  [1.0, 1.0, 1.0],
                                   specular: [1.0, 1.0, 1.0]},
           materialShininess: 64 };
}

function defaultLightSpecs() {
  return { ambient:  [0.25, 0.25, 0.25],
           diffuse:  [1.0, 1.0, 0.0],
           specular: [1.0, 1.0, 1.0]
         };
}