goog.provide('helloworld.Piece');
goog.require('helloworld.Moveable');

helloworld.Piece = function() {
	helloworld.Moveable.call(this);
	this.growingSpeed = {x: 0, y: 0};
};

goog.inherits(helloworld.Piece, helloworld.Moveable);


helloworld.Piece.prototype.setGrowingSpeed = function(speed,direction) {
	if (typeof(direction) != 'undefined' && direction!=null) {
		this.growingSpeed[direction] = speed;
	} else {
		 this.growingSpeed.x = this.growingSpeed.y = speed;
	}
	return this;
};


helloworld.Piece.prototype.grow = function(dt) {
	if (this.growingSpeed.x!=0 || this.growingSpeed.y!=0) {
		console.log('growing time!');
		var currentSize = this.getSize();
		var newSize = {
			width: currentSize.width+this.growingSpeed.x,
			height: currentSize.height+this.growingSpeed.y
		};
		this.setSize(newSize.width,newSize.height);
	};
	
};
