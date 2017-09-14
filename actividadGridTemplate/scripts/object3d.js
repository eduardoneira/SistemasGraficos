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

		var points = [];

		for(var i = 0; i < N; i++)
		{
			points.push({
				x: Math.cos(i*2*Math.PI/N);
				y: Math.sin(i*2*Math.PI/N);
			});
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

function CylinderObject(_radius, _Nsides, _depth, _Ndepth)
{
	this.radius = _radius;
	this.Nsides = _Nsides;
	this.depth = _depth;
	this.Ndepth = _Ndepth;

	var circlePoints = this.getCirclePoints(this.Nsides);

	//Lleno el position buffer:

	for(var i = 0; i < this.Ndepth; i++)
	{
			for(circlePoint in circlePoints)
			{
				this.position_buffer.push(circlePoint.x);
				this.position_buffer.push(circlePoint.y);
				this.position_buffer.push(i*this.depth/this.Ndepth);
			}

	}

	//Los caps:

	this.position_buffer.push(0); // centro x
	this.position_buffer.push(0); // centro y
	this.position_buffer.push(0); // centro z

	this.position_buffer.push(0); // centro x
	this.position_buffer.push(0); // centro y
	this.position_buffer.push(this.depth); // fin z


}

CylinderObject.prototype = Object3d;










