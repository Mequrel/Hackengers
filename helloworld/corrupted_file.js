goog.provide('helloworld.CorruptedFile');
goog.require('helloworld.Aliveable');

helloworld.CorruptedFile= function() {
	// Call parent constructor
	helloworld.Aliveable.call(this);
	this.setSize(50,56);
	this.setFill("assets/file_ill.png");
	this.setMovingDirection("down");
	this.setMovingSpeed(3);
};

goog.inherits(helloworld.CorruptedFile, helloworld.Aliveable);