goog.provide('helloworld.ImpulsPlayer');
goog.require('helloworld.Aliveable');
goog.require('helloworld.Missle');

helloworld.ImpulsPlayer = function() {
	helloworld.Aliveable.call(this);
	this.movingSpeed.x = 8;
	this.movingSpeed.y = 8;
	this.setSize(164,234);
	this.setFill('assets/thor.png');
	this.setAnchorPoint(0,0);

	this.life = 100;
	this.collision_radius = 15;
	this.collision_damage = 10;
	
	this.firing = false;
};

goog.inherits(helloworld.ImpulsPlayer, helloworld.Aliveable);
