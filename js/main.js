var prob = [];
var changed = false;

var input = function(p)
{
	const WIDTH = 320;
	const HEIGHT = 180;
	
	var xSlider;
	var ySlider;
	var sizeSlider;
	
	var image;
	
	p.setup = function()
	{
		p.createCanvas(WIDTH, HEIGHT);
		
		onchange = function()
		{
			var size = 0.025 - sizeSlider.value();
			for (var x = 0; x < WIDTH; x++)
			{
				for (var y = 0; y < HEIGHT; y++)
				{
					prob[x][y] = p.map(p.noise(xSlider.value() + x * size, ySlider.value() + y * size), 0, 1, 0, 255);
					image.set(x, y, p.color(prob[x][y]));
				}
			}
			image.updatePixels();
			
			changed = true;
		};
		
		xSlider = p.createSlider(0, 1000, 0, 5);
		ySlider = p.createSlider(0, 1000, 0, 5);
		sizeSlider = p.createSlider(0.001, 0.025, 0.015, 0.001);
		
		xSlider.onchange = onchange;
		ySlider.onchange = onchange;
		sizeSlider.onchange = onchange;
		
		for (var x = 0; x < WIDTH; x++)
		{
			prob[x] = [];
			for (var y = 0; y < HEIGHT; y++)
			{
				prob[x][y] = 0;
				
			}
		}
		
		image = p.createImage(WIDTH, HEIGHT);
		
		onchange();
	};
	
	p.draw = function()
	{
		p.background(0);
		
		if (changed)
			change();
		
		p.image(image, 0, 0);
		//p.rect(xSlider.value(), ySlider.value(), 50, 50);
	};
};

new p5(input, "noise");

var output = function(p)
{
	const WIDTH = 320;
	const HEIGHT = 180;
	
	var image;
	
	p.setup = function()
	{
		p.createCanvas(WIDTH, HEIGHT);
		
		image = p.createImage(WIDTH, HEIGHT);
	};
	
	p.draw = function()
	{
		p.background(0);
		
		if (changed)
		{
			changed = false;
			processs();
			image.updatePixels();
		}
		
		p.image(image, 0, 0);
		//p.rect(xSlider.value(), ySlider.value(), 50, 50);
	};
	
	function processs()
	{
		changed = false;
		if (image === undefined)
			return;
		
		//1
		var numPoints = p.floor(p.random(1000, 5000));
		var points = [];
		for (var i = 0; i < numPoints; i++)
		{
			points[i] = p.createVector(p.floor(p.random(0, WIDTH)), p.floor(p.random(0, HEIGHT)));
			image.set(points[i].x, points[i].y, p.color(255, 0, 0));
			p.point(points[i].x, points[i].y);
		}
	}
};

new p5(output, "result");