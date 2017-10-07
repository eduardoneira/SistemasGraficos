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
