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
