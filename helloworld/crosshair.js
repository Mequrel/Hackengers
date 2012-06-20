goog.provide('helloworld.Crosshair');
goog.require('helloworld.Aliveable');
goog.require('helloworld.Missle');

helloworld.Crosshair = function() {
	helloworld.Aliveable.call(this);
	this.movingSpeed = 0;
	this.setSize(150,150);
	this.setFill('assets/crosshair.png');
	this.setAnchorPoint(0,0);

	this.max = 100; //max hp
	this.life = 100;
	this.collision_radius = 30;
	this.collision_damage = 10;
	
	this.firing = false;
};


goog.inherits(helloworld.Crosshair, helloworld.Aliveable);

helloworld.Crosshair.prototype.getFullLife = function() {
	return this.max;
};

helloworld.Aliveable.prototype.makeInjury = function(damage) {
	this.life=this.getLife()-damage;
};