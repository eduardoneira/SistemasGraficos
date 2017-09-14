function Object3d(){

	this.texture = null;
	this.index_buffer = [];

	this.position_buffer = [];
	this.texture_buffer = [];

	this.webgl_position_buffer = null;
	this.webgl_texture_buffer = null;
	this.webgl_index_buffer = null;

	this.M = mat4.create();
	this.childs = [];

	this.translate = function (tVect)
	{
		mat4.translate(this.M, this.M, tVect);
	}

	this.scale = function(sVect)
	{
		mat4.scale(this.M, this.M, sVect);
	}

	this.rotate = function(rad, axis)
	{
		mat4.rotate(this.M, this.M, rad, axis);
	}


	this.getCirclePoints(N)
	{
		//returns array of x,y pairs of points
		//of an N sided regular polygon

		//format is: [x0, y0, x1, y1, ..., xN-1, yN-1]

		//version alternativa: points.x = [x0, ..., xN-1]
		//                     points.y = [y0, ..., yN-1]
		//cual conviene mas? 

		var points = {
			x: [];
			y: [];
		};
		var STEP = 2*Math.PI/N;

		for(var i = 0; i < N; i++)
		{
			points.x.push(Math.cos(i*STEP));
			points.y.push(Math.sin(i*STEP));
		}

		return points;
	}

}

//lo pongo aca suelto antes de olvidarme:

function ExtrudedObject(polygon, depth, Nsteps)
{
	//polygon es un array en 2D con las coords de un
	//poligono arbitrario en 2D -puede haber venido de 
	//algun constructor primitivo-, con el formato:
	
	//[x0,y0,x1,y1,...,xM-1,yM-1],
	//donde M = polygon.length

	this.position_buffer = [];

}

ExtrudedObject.prototype = Object3d;

function CylinderObject(Nsides, depth, Ndepth)
{
	this.Nsi
}











