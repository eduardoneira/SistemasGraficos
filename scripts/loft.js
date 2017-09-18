function Loft(shape, texture){
	//Se le debe pasar un objeto forma.
	//(!) Podria tener un par de valores por default...
	//Por ahora lo defino aca adentro para ir probando

	shape = [];
	N = 12; //circulo de 12 lados
	r = 0.3;
	for(var i = 0; i < N; i++){
		shape.push(r*Uri.cos(N,i));
		shape.push(r*Uri.sin(N,i));
	}

	debugger;

}