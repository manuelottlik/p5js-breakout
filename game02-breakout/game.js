var kasten = [];
var kastenwidth = 120;
var kastenheight = 25;
var ballgroesse = 25;
var maxlevel = 10;
var levelmult = 1;
var level;
var ball;
var slider;

function setup() {
	createCanvas($('body').outerWidth(), $('body').outerHeight());

	level = new generateLevel(1);
	ball = new Ball(width/2, height-200);
	slider = new Slider();
}

function draw() {
	level.show();

	for (var i = 0; i < kasten.length; i++) {
		kasten[i].show();
	}

	slider.show();

	ball.show();
}


function generateLevel(nr) {
	this.nr = nr;
	this.clr = 100;
	kasten = [];

	if(this.nr > maxlevel) this.nr = 1;

	for (i = 0; i < this.nr*levelmult; i++) {
		var a = floor(random(0, (width/2 - kastenwidth)/kastenwidth))*kastenwidth;
		var b = floor(random(0, ((height-200)/2 - kastenheight)/kastenheight))*kastenheight;

		fill(random(100, 255),random(100, 255),random(100, 255));

		kasten.push(new Kasten(a+kastenwidth, b+kastenheight));
		kasten.push(new Kasten(width-a-kastenwidth*2, b+kastenheight));
		kasten.push(new Kasten(a+kastenwidth, (height-200)-b-kastenheight*2));
		kasten.push(new Kasten(width-a-kastenwidth*2, (height-200)-b-kastenheight*2));
	}

	this.show = function () {
		if (this.clr > 0) this.clr--;
		background(this.clr);

		//lässt die Hintergrundfarbe abhängig von der Ballposition ändern
		//fill(ball.x/width*255, ball.y/height*255, (ball.x/width+ball.y/height)/2*255);

		textSize(32);
		textAlign(CENTER);
		textWidth(width);
		textFont("monospace");
		text("Level "+this.nr+"/"+maxlevel, width/2, (height-30));
	}
	//console.log(kasten);
}
