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
		
		p.image(image, 0, 0);
	};
};

new p5(input, "noise");

var output = function(p)
{
	const WIDTH = 320;
	const HEIGHT = 180;
	
	var image;
	var gray = [];
	var processed = [];
	
	p.setup = function()
	{
		p.createCanvas(WIDTH, HEIGHT);
		
		image = p.createImage(WIDTH, HEIGHT);
		
		for (var i = 0; i < WIDTH * HEIGHT; i++)
		{
			gray[i] = 0;
			processed[i] = false;
		}
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
	};
	
	function processs()
	{
		changed = false;
		if (image === undefined)
			return;
		
		//clear
		for (var x = 0; x < WIDTH; x++)
		{
			for (var y = 0; y < HEIGHT; y++)
			{
				image.set(x, y, p.color(0));
			}
		}
		for (var i = 0; i < WIDTH * HEIGHT; i++)
		{
			gray[i] = 0;
			processed[i] = false;
		}
		
		//1 and 2
		var numPoints = p.floor(p.random(100, 500));
		var points = [];
		for (var i = 0; i < numPoints; i++)
		{
			points[i] = p.createVector(p.floor(p.random(0, WIDTH)), p.floor(p.random(0, HEIGHT)));
			var w = p.floor(p.map(prob[points[i].x][points[i].y], 0, 255, 25, 5) + p.random(-5, 5));
			var h = p.floor(w + p.randomGaussian(0, 1));
			
			for (var x = -w; x <= w; x++)
			{
				for (var y = -h; y <= h; y++)
				{
					var xx = points[i].x + x;
					var yy = points[i].y + y;
					
					if (isBad(xx, yy))
						continue;
					
					if (x === -w || x === w || y === -h || y === h)
					{
						set(xx, yy, 255);
						//image.set(xx, yy, p.color(255));
					}
				}
			}
		}
		
		//3
		for (var x = 0; x < WIDTH; x++)
		{
			for (var y = 0; y < HEIGHT; y++)
			{
				if (get(x, y) !== 255)
				{
					var area = flood(x, y);
					console.log(area);
				}
			}
		}
		
	}
	
	function flood(x, y)
	{
		if (isBad(x, y))
			return 0;
		
		if (get(x, y) === 255)
			return 0;
		
		process(x, y);
		
		return 1 +
			flood(x - 1, y) +
			flood(x + 1, y) +
			flood(x, y - 1) +
			flood(x, y + 1);
	}
	
	function isBad(x, y)
	{
		return x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT;
	}
	
	function get(x, y)
	{
		return gray[y * WIDTH + x];
	}
	
	function set(x, y, value)
	{
		gray[y * WIDTH + x] = value;
	}
	
	function isProcessed(x, y)
	{
		return processed[y * WIDTH + x];
	}
	
	function process(x, y)
	{
		processed[y * WIDTH + x] = true;
	}
};

new p5(output, "result");
