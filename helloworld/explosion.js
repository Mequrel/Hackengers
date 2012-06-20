goog.provide('helloworld.Explosion');
goog.require('helloworld.Moveable');
goog.require('helloworld.ImpulsPlayer');
goog.require('lime.scheduleManager');
goog.require('lime.Sprite');
goog.require('helloworld.Piece');
goog.require('goog.iter');
goog.require('goog.structs.Map');

helloworld.Explosion = function(object,layer,duration,observer,f) {
	helloworld.Moveable.call(this);

	// Copy object position, speed, direction
	var position = object.getPosition();
	var speed = object.getMovingSpeed();
	var direction = object.getMovingDirection();

	this.setPosition(position.x,position.y);
	this.movingDirection.down = direction.down
	this.movingSpeed = speed;
	this.duration = duration;
	
	// Set parameters
	this.setSize(200,200);
	layer.appendChild(this);

	// Pieces;

	createPiece = function() {
		var height = 4+Math.random()*6;
		var width = 10;
		
		var color = {
			r: helloworld.Helpers.randrange(200,255),
			g: helloworld.Helpers.randrange(50,150),
			b: 0
		};
		var piece = new helloworld.Piece().setPosition(0,0).setSize(width,height).setFill("rgb("+color.r+","+color.g+","+color.b+")").setAnchorPoint(1,0.5);
		var speed = Math.random()*4;
		var rotation = Math.floor(Math.random()*360)
		piece.setGrowingSpeed(speed,"x");
		piece.setRotation(rotation);
		return piece;
	};

	this.count = 12+Math.floor(Math.random()*5);
	for (var i = 0; i < this.count; i++) {
		this.appendChild(createPiece());
	};

	//this.appendChild(createPiece().stop());
	
	// Observers
	this.observers = new goog.structs.Map();

	if (typeof(observer) != 'undefined' && observer!=null && typeof(f) != 'undefined' && f!=null) {
	    this.registerObserver(observer,f);
	};

	// Schedule isDone()
	lime.scheduleManager.callAfter(function(duration) {
			this.isDone();
		}, this, duration);
};

goog.inherits(helloworld.Explosion, helloworld.Moveable);

// Additional inheritance from Moveable

helloworld.Explosion.prototype.move = function(dt) {
	for (var i = 0; i < this.getNumberOfChildren(); i++) {
		var piece = this.getChildAt(i);
		piece.grow();
		var currentOpacity = piece.getOpacity();
		piece.setOpacity(currentOpacity-dt/this.duration);
	};
	return helloworld.Moveable.prototype.move.call(this,dt);
};

helloworld.Explosion.prototype.registerObserver = function(observer,f) {
	this.observers.set(observer,f);
};

helloworld.Explosion.prototype.isDone = function() {
	goog.iter.forEach(this.observers, function(f) {
		f(this);
	},this);
};
