function Kasten(x, y) {
	this.x = x;
	this.y = y;

	this.show = function () {
		strokeWeight(5);
		stroke(level.clr);
		rect(this.x, this.y, kastenwidth, kastenheight);
	}
}
