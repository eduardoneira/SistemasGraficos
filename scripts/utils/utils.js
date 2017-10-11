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

function getPositionMat4(matrix) {
  return matrix.slice(12,15);
}