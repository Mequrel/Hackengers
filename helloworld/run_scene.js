goog.provide('helloworld.RunScene');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.scheduleManager');

goog.require('goog.events.KeyCodes');
goog.require('goog.math.Box');
goog.require('goog.structs.Set');

goog.require('helloworld.Helpers');
goog.require('helloworld.Character');
goog.require('helloworld.Player');
goog.require('helloworld.Moveable');
goog.require('helloworld.Monster');
goog.require('helloworld.Missle');
goog.require('helloworld.CollisionManager');


mockDebug = function(object, func) {
	object[func] = function() {
		console.log("mockDebug - " + func);
		console.log(arguments);
	};
}


helloworld.RunScene= function(friends) {
	lime.Scene.call(this);
	this.friends = friends;

	// main layer
	var target = new lime.Layer().setPosition(0,0);


	// add player
	var character = new helloworld.Character().setPosition(450,300);
	character.setMovingBounds(0,1024,768,0);

	target.appendChild(character);
	this.appendChild(target);

	//mockDebug(character,'setMovingDirection');
	//mockDebug(character, 'move');

	goog.events.listen(target,['keydown'], function(e){
		switch(e.event.keyCode) {

			case goog.events.KeyCodes.LEFT:
				character.setMovingDirection("left");
				break;
			case goog.events.KeyCodes.RIGHT:
				character.setMovingDirection("right");
				break;
			case goog.events.KeyCodes.UP:
				
				break;
			case goog.events.KeyCodes.DOWN:
				
				break;
			
		}
	});

	goog.events.listen(target,['keyup'],function(e) {
			switch(e.event.keyCode) {
				case goog.events.KeyCodes.LEFT:
					character.unsetMovingDirection("left");
					break;
				case goog.events.KeyCodes.RIGHT:
					character.unsetMovingDirection("right");
					break;
				case goog.events.KeyCodes.UP:
					
					break;
				case goog.events.KeyCodes.DOWN:
					
					break;
			}
	});


	lime.scheduleManager.schedule(function(dt) {
		character.move();
	},target);
};

goog.inherits(helloworld.RunScene, lime.Scene);
