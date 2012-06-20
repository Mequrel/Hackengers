goog.provide('helloworld.EvilMissle');
goog.require('helloworld.Aliveable');

helloworld.EvilMissle = function(monster,radius) {
	helloworld.Aliveable.call(this);

	var sin = Math.sin(2*Math.PI*radius/360);
	var cos = Math.cos(2*Math.PI*radius/360);
	var direction = {
		y: sin>0 ? "down" : "up",
		x: cos>0 ? "right" : "left"
	};

	var r = 4;
	var speed = {
		y: Math.abs(r * sin),
		x: Math.abs(r * cos)
	};

	var R = 50;

	var monsterPosition = monster.getPosition();

	var position = {
		y: monsterPosition.y + R * sin,
		x: monsterPosition.x + R * cos
	};

	console.log(position);

	this.setMovingDirection(direction.x).setMovingDirection(direction.y);
	this.setMovingSpeed(speed.x,"x").setMovingSpeed(speed.y,"y");
	this.setPosition(position.x,position.y);

	this.setFill("#fff");
	this.setSize(10,10);

	this.collision_radius = 5;
	this.collision_damage = 10;
};

goog.inherits(helloworld.EvilMissle, helloworld.Aliveable);