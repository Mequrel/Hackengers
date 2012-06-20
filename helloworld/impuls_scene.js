goog.provide('helloworld.ImpulsScene');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.scheduleManager');
goog.require('lime.CanvasContext')
goog.require('helloworld.KeyObject');
goog.require('goog.events.KeyCodes');
goog.require('goog.math.Box');
goog.require('lime.RoundedRect');
goog.require('goog.structs.Set');
goog.require('helloworld.Audio');
goog.require('helloworld.Helpers');
goog.require('helloworld.Moveable');
goog.require('helloworld.Monster');
goog.require('helloworld.Missle');
goog.require('helloworld.CollisionManager');
goog.require('helloworld.Crosshair');
goog.require('helloworld.Tunnel');
goog.require('helloworld.ImpulsPlayer');
goog.require('helloworld.KeyObject');

helloworld.ImpulsScene= function(friends) {
	lime.Scene.call(this);
	this.friends = friends;

	var viewMode=1;
	var target = new lime.Layer().setPosition(0,0);
	var background = new lime.Layer().setPosition(0,0);
	var impuls = new helloworld.ImpulsPlayer().setPosition(420,250);
	var crosshair = new helloworld.Crosshair().setPosition(445,550);
	var cc = new lime.CanvasContext().setSize(640,480).setScale(1.6).setAnchorPoint(0,0).setPosition(0,-25);
	var tunnel = new helloworld.Tunnel(cc.getDeepestDomElement());
	var score=0;

	var sampleKey = new helloworld.KeyObject().setPosition(1024,620);
	sampleKey.setFill('assets/left.png');

	//lifebar stuff here
	var lifebar = new lime.RoundedRect().setFill('#0f0').setSize(500,20).setRadius(0).setAnchorPoint(0,0).setPosition(500,18);
	var hpText = new lime.Label().setText('Health: 100%').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(20).setFontWeight('bold').setSize(200,100).setAnchorPoint(0,0).setPosition(310,15);

    var scoreText = new lime.Label().setText('Score: 0').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(20).setFontWeight('bold').setSize(200,100).setAnchorPoint(0,0).setPosition(100,15);

    var hudBG = new lime.RoundedRect().setFill('#000').setSize(1024,50).setRadius(00).setAnchorPoint(0,0).setPosition(0,0);

	//end of lifebar stuff

	//groups for Coll Manager
	var crosshairs = new goog.structs.Set();
	var crosshairs_info = helloworld.Helpers.createGroupInfo(crosshairs,"Crosshairs",collisionManager,target);
	crosshairs.add(crosshair);

	var keyObjects =  helloworld.Helpers.createGroupInfo(new goog.structs.Set(),"keyObjects",collisionManager,target);
	keyObjects.iterable.add(sampleKey);


	var googlesFrame = new lime.Sprite().setSize(1024,768).setPosition(512,384).setFill('assets/bg_impuls1.png');

	background.appendChild(cc);
	background.appendChild(googlesFrame);

	var audios = {
		lose: new helloworld.Audio("assets/lose.wav",false,false,0.6),
		hit: new helloworld.Audio("assets/laser4.wav",false,false,0.6),
		background: new helloworld.Audio("assets/impulsbg.wav",true,true,0.2)
	};

	impuls.setMovingBounds(75,1024-65,768-110,65);
	var collisionManager = new helloworld.CollisionManager();

	collisionManager.addCollidable("keyObjects",sampleKey);
	collisionManager.addCollidable("Crosshair",crosshair);

	target.appendChild(crosshair);
	this.appendChild(background);
	target.appendChild(sampleKey);
	this.appendChild(hudBG);
	this.appendChild(target);
	this.appendChild(lifebar);
	this.appendChild(hpText);
	this.appendChild(scoreText);


	keydown = function(e){
		switch(e.event.keyCode) {
			case goog.events.KeyCodes.LEFT:
				serveKeyPress(e.event.keyCode);
				break;
			case goog.events.KeyCodes.RIGHT:
				serveKeyPress(e.event.keyCode);
				break;
			case goog.events.KeyCodes.UP:
				serveKeyPress(e.event.keyCode);
				break;
			case goog.events.KeyCodes.DOWN:
				serveKeyPress(e.event.keyCode);
				break;
			case goog.events.KeyCodes.V:
				changeView();
				break;
		}
	};

	keyup = function(e){ 
		switch(e.event.keyCode) {
			case goog.events.KeyCodes.LEFT:
				serveKeyPress(e.event.keyCode);
				break;
			case goog.events.KeyCodes.RIGHT:
				serveKeyPress(e.event.keyCode);
				break;
			case goog.events.KeyCodes.UP:
				serveKeyPress(e.event.keyCode);
				break;
			case goog.events.KeyCodes.DOWN:
				serveKeyPress(e.event.keyCode);
				break;
		}
	}


   moving = function(dt) {
		impuls.move();
		sampleKey.move();

		goog.iter.forEach(keyObjects.iterable, function(ko) {
			ko.move(dt);
		});
	};

	collisionsCheck = function(dt) {
		crosshair.setFill('assets/crosshair.png');
		collisions = collisionManager.checkAllCollisions("Crosshair","keyObjects");
		for (var i = collisions.length - 1; i >= 0; i--) {
			console.log(collisions[i][1]);
			crosshair.setFill('assets/crosshair_locked.png');
		};
	};

	lifebarUpdate = function(dt) {
		var sizeF = crosshair.getLife() / crosshair.getFullLife();
		lifebar.setSize(500*sizeF,20);
		
		if (sizeF > 0.5){
			lifebar.setFill('#0f0');
		} else if (sizeF > 0.25 ) {
			lifebar.setFill('rgb(255,255,0)');
		} else {
			lifebar.setFill('rgb(255,0,0)');
		}

		hpText.setText('Health: '+ Math.round(sizeF*100).toString()+'%');
		if (sizeF<0){
			alert("jubidubidu");
		}
	};

	generateKey = function(dt){
		var nk = new helloworld.KeyObject().setPosition(1024,620).setFill('assets/left.png').move();

		var n = Math.floor((Math.random()*100)+1); 
		if ( n % 2 == 0){
			nk.setFill('assets/left.png');
			nk.keyval=37;
		} else if ( n % 3 == 0){
			nk.setFill('assets/right.png');
			nk.keyval=39;
		} else if ( n % 4 == 0){
			nk.setFill('assets/up.png');
			nk.keyval=38;
		} else {
			nk.setFill('assets/down.png');
			nk.keyval=40;
		}
		target.appendChild(nk);
		collisionManager.addCollidable("keyObjects",nk);
		keyObjects.iterable.add(nk);
	};

	serveKeyPress = function(keypresed){
		crosshair.setFill('assets/crosshair.png');
		collisions = collisionManager.checkAllCollisions("Crosshair","keyObjects");
		if (typeof collisions[0] != 'undefined'){
			console.log(collisions[0][1].keyval);
		} else {		
			return ;
		}

		if (collisions[0][1].keyval == keypresed){
			audios.hit.play();
			//helloworld.Helpers.cleanMoveable(collisions[0][1],keyObjects);
			score+=10;
			collisions[0][1].movingSpeed.y = 15;
			collisions[0][1].movingSpeed.x = 15;
			//if (keypresed == )
			collisions[0][1].movingDirection["left"] = true;
			collisions[0][1].movingDirection["down"] = true;
		}
		scoreText.setText('Score: '+ score.toString());
	};

	changeView = function()
	{
		if (viewMode == 0){
			viewMode = 1;
			console.log('to fp');
			background.appendChild(googlesFrame);
			target.removeChild(impuls);
		} else {
			viewMode = 0;
			console.log('to tpp');
			background.removeChild(googlesFrame);
			target.appendChild(impuls);
		}
	};

	cleanup = function(dt){
		keys_all = helloworld.Helpers.cleanup(keyObjects.iterable);
		keyObjects.iterable = keys_all[0];
		helloworld.Helpers.cleanEachMoveable(keys_all[1],keyObjects);
	}

	checkOutOfRange = function(dt){
		goog.iter.forEach(keyObjects.iterable, function(element) {
			console.log(element.getPosition().x);

		if ( element.getPosition().x < 350){
			switch (element.keyval) {
				case 37:
					element.setFill('assets/leftic.png');
					break;
				case 38:
					element.setFill('assets/upic.png');
					break;
				case 39:
					element.setFill('assets/rightic.png');
					break;
				case 40:
					element.setFill('assets/downic.png');
					break;
			}
			audios.lose.play();
			element.movingSpeed.y = 20;
			element.movingSpeed.x = 20;
			element.movingDirection["left"] = true;
			element.movingDirection["up"] = true;
			crosshair.makeInjury(8);
			lifebarUpdate();
		}
	});
	}

	// listening for key stroke
	goog.events.listen(target,['keydown'],keydown);
	goog.events.listen(target,['keyup'],keyup);
	//  moving
	lime.scheduleManager.schedule(moving,target);
	//collisions
	lime.scheduleManager.schedule(collisionsCheck,target);
	lime.scheduleManager.scheduleWithDelay(checkOutOfRange,target,1000);
	lime.scheduleManager.scheduleWithDelay(generateKey,target,800);;
	lime.scheduleManager.scheduleWithDelay(lifebarUpdate,target,1000);
	lime.scheduleManager.scheduleWithDelay(cleanup,target,1000);
	lime.scheduleManager.scheduleWithDelay(function(dt) {
		tunnel.draw();
	},background,75);

};


goog.inherits(helloworld.ImpulsScene, lime.Scene);
