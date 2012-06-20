goog.provide('helloworld.ImpulsSceneTest');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.scheduleManager');
goog.require('lime.CanvasContext')

goog.require('goog.events.KeyCodes');
goog.require('goog.math.Box');
goog.require('goog.structs.Set');
goog.require('helloworld.Audio');
goog.require('helloworld.Helpers');
goog.require('helloworld.Moveable');
goog.require('helloworld.Monster');
goog.require('helloworld.Missle');
goog.require('helloworld.CollisionManager');
goog.require('helloworld.Crosshair');
goog.require('helloworld.TunnelTest');
goog.require('helloworld.ImpulsPlayer');

helloworld.ImpulsSceneTest= function(friends) {
	lime.Scene.call(this);
	this.friends = friends;

	var target = new lime.Layer().setPosition(0,0),
		background = new lime.Layer().setPosition(0,0);
	// 	player = new helloworld.Impuls().setPosition(512,384);
	// 	g = new helloworld.Crosshair().setPosition(395,130);
	var cc = new lime.CanvasContext().setSize(640,480).setScale(1.6).setAnchorPoint(0,0).setPosition(0,-25);

	var tunnel = new helloworld.TunnelTest(cc.getDeepestDomElement(),target);

	// //groups for Coll Manager
	// var crosshairs = new goog.structs.Set();
	// var crosshairs_info = helloworld.Helpers.createGroupInfo(crosshairs,"Crosshairs",collisionManager,target);
	// crosshairs.add(g);


	// var impulses = new goog.structs.Set();
	// var impulses_info = helloworld.Helpers.createGroupInfo(impulses,"Impulses",collisionManager,target);
	// impulses.add(player);

	// var borders = new goog.structs.Set();
	// var borders_info = helloworld.Helpers.createGroupInfo(borders,"Borders",collisionManager,target);
	// var googlesFrame = new lime.Sprite().setSize(1024,768).setPosition(512,384).setFill('assets/bg_impuls1.png');

	background.appendChild(cc);
	// background.appendChild(googlesFrame);

	// var audios = {
	// 	//missle: new helloworld.Audio("assets/laser4.wav",false,false,0.5),
	// 	background: new helloworld.Audio("assets/impulsbg.wav",true,true)
	// };

	// // Bounds for player ship
	// player.setMovingBounds(75,1024-65,768-110,65);
	// console.log(player.getCenter());

	// var collisionManager = new helloworld.CollisionManager();

	// collisionManager.addCollidable("Impuls",player);
	// collisionManager.addCollidable("Crosshair",g);

	// Parentshuip
	// target.appendChild(player);
	// target.appendChild(g);


	  this.appendChild(background);
	  this.appendChild(target);

	// add player to collision manager
	//collisionManager.addCollidable("Player",player);

	// keydown = function(e){
	// 	switch(e.event.keyCode) {
	// 		case goog.events.KeyCodes.LEFT:
				
	// 			break;
	// 		case goog.events.KeyCodes.RIGHT:
				
	// 			break;
	// 		case goog.events.KeyCodes.UP:
				
	// 			break;
	// 		case goog.events.KeyCodes.DOWN:
				
	// 			break;
	// 		case goog.events.KeyCodes.SPACE:

	// 			break;
				
	// 	}
	// };

	// keyup = function(e){ 
	// 	switch(e.event.keyCode) {
	// 		case goog.events.KeyCodes.LEFT:
	// 			player.unsetMovingDirection("left");
	// 			console.log('key press!');
	// 			break;
	// 		case goog.events.KeyCodes.RIGHT:
	// 			player.unsetMovingDirection("right");
	// 			break;
	// 		case goog.events.KeyCodes.UP:
	// 			player.unsetMovingDirection("up");
	// 			break;
	// 		case goog.events.KeyCodes.DOWN:
	// 			player.unsetMovingDirection("down");
	// 			break;
	// 		case goog.events.KeyCodes.SPACE:
	// 			player.setFiring(false);
	// 			break;
	// 	}
	// }


 //   moving = function(dt) {
	// 	player.move();
	// };

	// collisionsCheck = function(dt) {
	// 	g.setFill('assets/crosshair.png');
	// 	collisions = collisionManager.checkAllCollisions("Crosshair","Impuls");
	// 	for (var i = collisions.length - 1; i >= 0; i--) {
	// 		console.log('OK');
	// 		g.setFill('assets/crosshair_locked.png');
	// 	};
	// };


	// // listening for key stroke
	
	//goog.events.listen(target,['keyup'],keyup);
	// //  moving
	// lime.scheduleManager.schedule(moving,target);
	// //collisions
	// lime.scheduleManager.schedule(collisionsCheck,target);

	lime.scheduleManager.scheduleWithDelay(function(dt) {
		tunnel.draw();
	},background,75);

};


goog.inherits(helloworld.ImpulsSceneTest, lime.Scene);
