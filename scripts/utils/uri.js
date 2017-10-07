var Uri420 = {
	greet: (function (){
		console.log("hi");
		return;
	}),

	myNum: 5
};

var Uri = {
	makeCircle: (function (Nsides){
		points = [];
		for(var i = 0; i < Nsides; i++){
			points.push(Math.cos(2*Math.PI*i/Nsides));
			points.push(Math.sin(2*Math.PI*i/Nsides));
			points.push(0);
		}
	}),

	cos: (function (){
		//Memoized cosine stepped over N values

		//La primera vez que la llamo tengo que hacer el setup; 
		//dps de realizado debe cambiar la funcion.

		var memo = {};



		return (function (N, i){

			if(memo.hasOwnProperty(N)){ //si esta hasheado
				return memo[N][i];
			} 
			else{
				memo[N] = [];

				for(var j = 0; j < N; j++){
					memo[N].push(Math.cos(2*Math.PI*j/N));
				}

				return memo[N][i];
			}
		});
	})(),

	sin: (function (){
		//Memoized sine stepped over N values

		//La primera vez que la llamo tengo que hacer el setup; 
		//dps de realizado debe cambiar la funcion.

		var memo = {};



		return (function (N, i){

			if(memo.hasOwnProperty(N)){ //si esta hasheado
				return memo[N][i];
			} 
			else{
				memo[N] = [];

				for(var j = 0; j < N; j++){
					memo[N].push(Math.sin(2*Math.PI*j/N));
				}

				return memo[N][i];
			}
		});
	})()
};






