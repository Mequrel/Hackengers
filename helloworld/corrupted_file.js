goog.provide('helloworld.CorruptedFile');
goog.require('helloworld.Aliveable');

helloworld.CorruptedFile= function() {
	// Call parent constructor
	helloworld.Aliveable.call(this);
	this.setSize(31,40);
	this.setFill("assets/file.png");
	this.setMovingDirection("down");
	this.setMovingSpeed(3);
};

goog.inherits(helloworld.CorruptedFile, helloworld.Aliveable);