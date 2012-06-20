goog.provide('helloworld.Player');
goog.require('helloworld.Aliveable');
goog.require('helloworld.Missle');
goog.require('lime.scheduleManager');

helloworld.Player = function() {
	helloworld.Aliveable.call(this);
	this.movingSpeed.x = 8;
	this.movingSpeed.y = 8;
	this.setSize(100,147);
	this.setFill('assets/siliconman2.png');
	this.setAnchorPoint(0,0);

	this.life = 100;
	this.collision_radius = 50;
	this.collision_damage = 100;
	
	this.firing = false;

	this.temporal_immunity = false;

	// Hotfix! Repeated maps initialization from superclass
	this.observers_damage = new goog.structs.Map();
	this.observers_died = new goog.structs.Map();
};

goog.inherits(helloworld.Player, helloworld.Aliveable);

helloworld.Player.prototype.setFiring = function(firing) {
	this.firing = firing;
	return this;
};

helloworld.Player.prototype.isFiring = function() {
	return this.firing;
};
helloworld.Player.prototype.fire = function() {
	if (this.firing) {
		var missle = new helloworld.Missle(this);
		return missle;
	};
	return null;
};

helloworld.Player.prototype.doDamage = function(damage) {
	if (!this.temporal_immunity) {
		this.setTemporalImmunity(true,4000);
		var flash = helloworld.Helpers.flashingAnimation(0.5,0.2,20);
		this.runAction(flash);
		helloworld.Aliveable.prototype.doDamage.call(this,damage);
		return true;
	} else {
		return false;
	}
};

helloworld.Player.prototype.setTemporalImmunity = function(value,delay) {
	if (!value) {
		this.temporal_immunity = false;
		console.log('immunity end');
	} else {
		this.temporal_immunity = true;
		console.log('immunity start');
		lime.scheduleManager.callAfter(function(delay) {
			this.setTemporalImmunity(false);
		}, this, delay);
	};
};
