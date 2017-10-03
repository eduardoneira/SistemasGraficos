function inheritPrototype(child, parent) {
  var copyOfParent = Object.create(parent.prototype); 
  
  copyOfParent.constructor = child;
  child.prototype = copyOfParent;
}

function concatVectorElems(arr, vect){
	Array.prototype.forEach.call(vect, function(elem){
		arr.push(elem);
	})
}
