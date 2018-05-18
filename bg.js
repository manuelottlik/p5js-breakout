var kasten = [];
var kastenwidth = 120;
var kastenheight = 25;
var ballgroesse = 25;
var maxlevel = 100;
var levelmult = 2;
var level;
var ball;
var slider;

function setup() {
	createCanvas($('body').outerWidth(), $('body').outerHeight());	
	
	level = new generateLevel(1);
	ball = new Ball(width/2, height/2);
	slider = new Slider();
}

function draw() {
	level.show();
	
	for (var i = 0; i < kasten.length; i++) {
		kasten[i].show();
	}
	
	//slider.show();
	
	ball.show();
}

function Kasten(x, y) {
	this.x = x;
	this.y = y;
	
	this.show = function () {
		strokeWeight(5);
		stroke(level.clr);
		rect(this.x, this.y, kastenwidth, kastenheight);
	}
}

function Ball(x,y) {
	this.x = x;
	this.y = y;
	this.xspeed = random(-10, 10);
	this.yspeed = -10;
	
	this.show = function () {
		this.x += this.xspeed;
		this.y += this.yspeed;
		
		if(this.x+ballgroesse/2 >= width || this.x-ballgroesse/2 <= 0) this.xspeed = this.xspeed*-1;
		if(this.y+ballgroesse/2 >= height || this.y-ballgroesse/2 <= 0) this.yspeed = this.yspeed*-1;
		if(this.y+ballgroesse/2 >= height) {
			//level = new generateLevel(1);
		}
		
		noStroke();
		ellipse(this.x, this.y, ballgroesse, ballgroesse);
		/*
		if(collideLineRect(this.x, this.y-ballgroesse/2+5, this.x, this.y+ballgroesse/2-5, slider.x, slider.y, slider.width, slider.height)) {
			this.yspeed = this.yspeed*-1;
			//ändert den Abprallwinkel des Balls abhängig von der Stelle, an der er auf dem Slider auftrifft
			//this.xspeed = ((collideLineRect(this.x, this.y-ballgroesse/2+5, this.x, this.y+ballgroesse/2-5, slider.x, slider.y, slider.width, slider.height, true).top.x - slider.x)/slider.width-0.5)*10;
		} else if(collideLineRect(this.x-ballgroesse/2+5, this.y, this.x+ballgroesse/2-5, this.y, slider.x, slider.y, slider.width, slider.height)) {
			this.xspeed = this.xspeed*-1;
		}
		*/
		for(var i = 0; i < kasten.length; i++) {
			if(collideLineRect(this.x, this.y-ballgroesse/2+5, this.x, this.y+ballgroesse/2-5, kasten[i].x, kasten[i].y, kastenwidth, kastenheight)) {
				this.yspeed = this.yspeed*-1;
				kasten.splice(i, 1);
			} else if(collideLineRect(this.x-ballgroesse/2+5, this.y, this.x+ballgroesse/2-5, this.y, kasten[i].x, kasten[i].y, kastenwidth, kastenheight)) {
				this.xspeed = this.xspeed*-1;
				kasten.splice(i, 1);
			}
		}
		
		if (kasten.length == 0) {
			level = new generateLevel(level.nr+1);
		}
	}
}

function Slider() {
	this.width = width/4 - level.nr/(maxlevel-1)*width/4;
	this.height = 30;
	this.x = mouseX - this.width/2;
	this.y = height-100;
	
	this.show = function() {
		this.x = mouseX - width/8;
		
		strokeWeight(5);
		stroke(level.clr);
		
		rect(this.x, this.y, this.width, this.height);
	}
}

function generateLevel(nr) {
	this.nr = nr;
	this.clr = 0;
	kasten = [];
	
	if(this.nr > maxlevel) this.nr = 1;
	
	for (i = 0; i < this.nr*levelmult; i++) {
		var a = floor(random(0, (width/2 - kastenwidth)/kastenwidth))*kastenwidth;
		var b = floor(random(0, (height/2 - kastenheight)/kastenheight))*kastenheight;
		
		fill(random(100, 255),random(100, 255),random(100, 255));
		
		kasten.push(new Kasten(a+kastenwidth, b+kastenheight));
		kasten.push(new Kasten(width-a-kastenwidth*2, b+kastenheight));
		kasten.push(new Kasten(a+kastenwidth, height-b-kastenheight*2));
		kasten.push(new Kasten(width-a-kastenwidth*2, height-b-kastenheight*2));
	}
	
	this.show = function () {
		if (this.clr > 0) this.clr--;
		background(this.clr);
		
		//lässt die Hintergrundfarbe abhängig von der Ballposition ändern
		//fill(ball.x/width*255, ball.y/height*255, (ball.x/width+ball.y/height)/2*255);
		
		//textSize(32);
		//textAlign(CENTER);
		//textWidth(width);
		//textFont("monospace");
		//text("Level "+this.nr+"/"+maxlevel, width/2, (height-30));
	} 
	//console.log(kasten);
}