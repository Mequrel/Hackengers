goog.provide('helloworld.Missle');
goog.require('helloworld.Aliveable');
goog.require('lime.audio.Audio');




helloworld.Missle = function(player) {
	helloworld.Aliveable.call(this);
	this.movingSpeed.y = 15;
	this.setSize(5,15);
	this.setFill('#00f');
	this.setAnchorPoint(0,0);
	var player_position = player.getPosition();
	var player_size = player.getSize();
	var my_position = {}
	my_position.x = player_position.x+player_size.width/2 + 31;
	my_position.y = player_position.y - 2;
	this.setPosition(my_position.x,my_position.y);

	this.collision_radius = 3;
	this.collision_damage = 10;
	this.life = 1;
};

goog.inherits(helloworld.Missle, helloworld.Aliveable);
