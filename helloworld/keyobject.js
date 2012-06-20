goog.provide('helloworld.KeyObject');
goog.require('helloworld.Aliveable');
goog.require('helloworld.EvilMissle');

helloworld.KeyObject = function(collidableManager) {
	helloworld.Aliveable.call(this);

	this.keyval = 0

	this.movingSpeed.y = 0;
	this.movingSpeed.x = 3;
	this.movingDirection["left"] = true;
	this.setSize(100,100);
	this.collision_radius = 10;
	this.collision_damage = 20;
	this.life = 40;
	this.timeout = 2000;
	this.time = 0;
	this.shooting = false;
};

goog.inherits(helloworld.KeyObject, helloworld.Aliveable);

helloworld.Aliveable.prototype.getCenter = function() {
	box = this.getBoundingBox();
	size = this.getSize();
	return new goog.math.Coordinate(box.top+size.height/2,box.left+size.width/2);
};

helloworld.KeyObject.prototype.doDamage = function(damage) {
	helloworld.Aliveable.prototype.doDamage.call(this,damage);
	var flash = helloworld.Helpers.flashingAnimation(0.5,0.15,1);
	this.runAction(flash);
	return true;
};
