goog.provide('helloworld.Character');

goog.require('helloworld.Aliveable');
goog.require('lime.scheduleManager');

helloworld.Character = function() {
	helloworld.Aliveable.call(this);
	this.movingSpeed.x = 8;
	this.movingSpeed.y = 8;
	this.setSize(40,100);
	this.setFill('#0fc');
	this.setAnchorPoint(0,0);

	this.life = 100;
	this.collision_radius = 40;
	this.collision_damage = 100;

	this.temporal_immunity = false;

	// Hotfix! Repeated maps initialization from superclass
	this.observers_damage = new goog.structs.Map();
	this.observers_died = new goog.structs.Map();
};

goog.inherits(helloworld.Character, helloworld.Aliveable);


helloworld.Character.prototype.doDamage = function(damage) {
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

helloworld.Character.prototype.setTemporalImmunity = function(value,delay) {
	if (!value) {
		this.temporal_immunity = false;
		console.log('immunity end');
	} else {
		this.temporal_immunity = true;
		console.log('immunity start');
		lime.scheduleManager.callAfter(function(delay) {
			this.setTemporalImmunity(false);
		}, this, delay)
	};
};
