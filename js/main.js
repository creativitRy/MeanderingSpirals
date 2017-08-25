var input = function (p)
{
	var x = 20;
	var y = 100;
	
	p.setup = function() {
		p.createCanvas(640, 480);
		p.background(0);
	};
	
	p.draw = function() {
		p.fill(255);
		p.rect(x,y,50,50);
	};
};

var rp5 = new p5(input, "noise");
var myp5 = new p5(input, "result");