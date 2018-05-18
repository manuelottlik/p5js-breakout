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
			level = new generateLevel(1);
			ball = new Ball(width/2, height-200);
		}

		noStroke();
		ellipse(this.x, this.y, ballgroesse, ballgroesse);

		if(collideLineRect(this.x, this.y-ballgroesse/2+5, this.x, this.y+ballgroesse/2-5, slider.x, slider.y, slider.width, slider.height)) {
			this.yspeed = this.yspeed*-1;
			//ändert den Abprallwinkel des Balls abhängig von der Stelle, an der er auf dem Slider auftrifft
			this.xspeed = ((collideLineRect(this.x, this.y-ballgroesse/2+5, this.x, this.y+ballgroesse/2-5, slider.x, slider.y, slider.width, slider.height, true).top.x - slider.x)/slider.width-0.5)*10;
		} else if(collideLineRect(this.x-ballgroesse/2+5, this.y, this.x+ballgroesse/2-5, this.y, slider.x, slider.y, slider.width, slider.height)) {
			this.xspeed = this.xspeed*-1;
		}

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
