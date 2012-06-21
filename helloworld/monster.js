goog.provide('helloworld.Monster');
goog.require('helloworld.Aliveable');
goog.require('helloworld.EvilMissle');

helloworld.Monster = function(collidableManager) {
	helloworld.Aliveable.call(this);
	this.movingSpeed.y = 2;
	this.movingSpeed.x = 2;
	this.movingDirection["down"] = true;
	this.setSize(65,65);
	var num = 1+Math.floor(Math.random()*4);
	this.setFill('assets/wirus'+num+'.png');
	//this.setAnchorPoint(0,0);
	this.collision_radius = 32;
	this.collision_damage = 2000;
	this.life = 40;
	this.bouncing = false;
	this.timeout = 2000;
	this.time = 0;
	this.shooting = false;
};

goog.inherits(helloworld.Monster, helloworld.Aliveable);

helloworld.Monster.prototype.doDamage = function(damage) {
	helloworld.Aliveable.prototype.doDamage.call(this,damage);
	var flash = helloworld.Helpers.flashingAnimation(0.5,0.15,1);
	this.runAction(flash);
	return true;
};

helloworld.Monster.prototype.shoot = function(dt) {
	var missles = [];
	var radius = 0;
	var number_of_missles = 8;
	for (var i = 0; i < number_of_missles; i++) {
		missles.push(new helloworld.EvilMissle(this,radius));
		radius += 360/number_of_missles;
	};
	return missles;
};

helloworld.Monster.prototype.move = function(dt) {
	helloworld.Aliveable.prototype.move.call(this,dt);
	if (this.bouncing) {
		this.time += dt;
		if (this.time>=this.timeout) {
			this.time = this.time % this.timeout;
			if (this.movingDirection["left"]) {
				this.setMovingDirection("right");
			} else {
				this.setMovingDirection("left");
			}
		};
	}
};

helloworld.Monster.prototype.setBouncing = function(bouncing) {
	this.bouncing = bouncing;
	if (bouncing) {
		this.setMovingDirection("right");
	} else {
		this.unsetMovingDirection("right");
		this.unsetMovingDirection("left");
	};
	return this;
};