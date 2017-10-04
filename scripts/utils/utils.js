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

