goog.provide('helloworld.Moveable');
goog.require('lime.Sprite');
goog.require('goog.math.Box');


helloworld.Moveable = function() {
	lime.Sprite.call(this);
	this.movingDirection = {"left": false, "right": false, "up" : false, "down": false};
	this.movingSpeed =  { x: 0, y: 5};
	this.bounds = undefined;
};

goog.inherits(helloworld.Moveable, lime.Sprite);

helloworld.Moveable.invDirections = { left: "right", right: "left", up: "down", down : "up"};


helloworld.Moveable.prototype.move = function(dt) {
	var scale = (dt/17);
	if (isNaN(scale)) {
		scale = 1.0;
	}
	var position = this.getPosition().clone();
	var movingFactor = {}
	movingFactor.x = (-this.movingDirection["left"]+this.movingDirection["right"]);
	movingFactor.y = (-this.movingDirection["up"]+this.movingDirection["down"]);
	position.x += Math.floor(movingFactor.x * this.movingSpeed.x * scale);
	position.y += Math.floor(movingFactor.y * this.movingSpeed.y * scale);

	var size = this.getSize();
	// Warning! Assumes that anchor point is 0,0
	var boundingBox = new goog.math.Box(position.y,position.x+size.width,position.y+size.height,position.x);

	if ((this.bounds == undefined || this.bounds.contains(boundingBox)) && (movingFactor.x || movingFactor.y)) {
		this.setPosition(position.x,position.y);
	};
	return this;
};

helloworld.Moveable.prototype.setMovingBounds = function(top,right,bottom,left) {
	this.bounds = new goog.math.Box(top,right,bottom,left);
	return this;
};

helloworld.Moveable.prototype.setMovingSpeed = function(mspeed,direction) {
	if (typeof(direction) != 'undefined' && direction!=null) {
		this.movingSpeed[direction] = mspeed;
	} else {
		 this.movingSpeed.x = this.movingSpeed.y = mspeed;
	}
	return this;
};

helloworld.Moveable.prototype.getMovingSpeed = function() {
	return this.movingSpeed;
};

helloworld.Moveable.prototype.getMovingDirection = function() {
	return this.movingDirection;
};
helloworld.Moveable.prototype.setMovingDirection = function(mdir) {
	this.unsetMovingDirection(helloworld.Moveable.invDirections[mdir]);
	this.movingDirection[mdir] = true;
	return this;
};

helloworld.Moveable.prototype.unsetMovingDirection = function(mdir) {
	this.movingDirection[mdir] = false;
	return this;
};

helloworld.Moveable.prototype.stop = function() {
	for (d in this.movingDirection) {
		this.unsetMovingDirection(d);
	}
	return this;
};









