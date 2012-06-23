goog.provide('helloworld.VirusScene');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.Label');
goog.require('lime.scheduleManager');
goog.require('lime.helper.PauseScene');
goog.require('lime.GlossyButton');

goog.require('goog.events.KeyCodes');
goog.require('goog.math.Box');
goog.require('goog.structs.Set');

goog.require('helloworld.Helpers');
goog.require('helloworld.Player');
goog.require('helloworld.LifeBar')
goog.require('helloworld.Moveable');
goog.require('helloworld.Monster');
goog.require('helloworld.Missle');
goog.require('lime.transitions.SlideInUp');
goog.require('helloworld.Audio');
goog.require('helloworld.Explosion');
goog.require('helloworld.CollisionManager');
goog.require('helloworld.CorruptedFile');
goog.require('helloworld.ScrollingBackground');
goog.require('helloworld.Score');
goog.require('helloworld.PauseScene');
goog.require('helloworld.FacebookScene');
goog.require('helloworld.Splash');


helloworld.VirusScene= function(director,friends,menuSceneType) {
	lime.Scene.call(this);
	this.friends = friends;
	this.director = director;
	// For closures
	var _this = this;

	var target = new lime.Layer().setPosition(0,0),
		background = new lime.Layer().setPosition(0,0),
		player = new helloworld.Player().setPosition(450,500),
		lifeBar = new helloworld.LifeBar(player.getLife(),300).setPosition(1000,20),
		scoreBar = new helloworld.Score().setPosition(100,10);


	// Scrolling background
	//var scrollingBg = new lime.Sprite().setSize(2048,1536).setPosition(0,0).setFill('#000');
	var scrollingBg = new helloworld.ScrollingBackground(1024,768).setScrolling(true).setAnchorPoint(0,0).setPosition(1,1);
	console.log(scrollingBg);
	scrollingBg.setFill("#000");
	background.appendChild(scrollingBg);

	// Bounds for player ship
	player.setMovingBounds(0,1024,768,0);

	// CollisionManager
	var collisionManager = new helloworld.CollisionManager();

	// Object Groups
	var missles = helloworld.Helpers.createGroupInfo(new goog.structs.Set(),"Missles",collisionManager,target);
	var stars = helloworld.Helpers.createGroupInfo(new goog.structs.Set(),"Stars",collisionManager,background);
	var monsters = helloworld.Helpers.createGroupInfo( new goog.structs.Set(),"Monsters",collisionManager,target);
	var shooting_monsters = new goog.structs.Set();
	var explosions = helloworld.Helpers.createGroupInfo(new goog.structs.Set(),"Explosions",null,target);

	// Parentshuip
	target.appendChild(player);

	this.appendChild(background);
	this.appendChild(target);
	this.appendChild(lifeBar);
	this.appendChild(scoreBar);

	var audios = {
		missle: new helloworld.Audio("assets/laser4.wav",false,false,0.5),
		background: new helloworld.Audio("assets/bg.ogg",true,true),
		alarm: new helloworld.Audio("assets/alarm.wav"),
		yeah: new helloworld.Audio("assets/yeah.ogg"),
		explosions: {
			soft: new helloworld.Audio("assets/soft_explosion.ogg"),
			monster: new helloworld.Audio("assets/monster_fire.wav")

		}
	};

	// add player to collision manager
	collisionManager.addCollidable("Player",player);

	keydown = function(e){
		switch(e.event.keyCode) {
			case goog.events.KeyCodes.LEFT:
				player.setMovingDirection("left");
				break;
			case goog.events.KeyCodes.RIGHT:
				player.setMovingDirection("right");
				break;
			case goog.events.KeyCodes.UP:
				player.setMovingDirection("up");
				break;
			case goog.events.KeyCodes.DOWN:
				player.setMovingDirection("down");
				break;
			case goog.events.KeyCodes.SPACE:
				if (!player.isFiring()) {
					player.setFiring(true);
					audios.missle.rewind().setLoop(true).play();
					firing();
				};
				break;
		}
	};

	keyup = function(e){ 
		switch(e.event.keyCode) {
			case goog.events.KeyCodes.LEFT:
				player.unsetMovingDirection("left");
				break;
			case goog.events.KeyCodes.RIGHT:
				player.unsetMovingDirection("right");
				break;
			case goog.events.KeyCodes.UP:
				player.unsetMovingDirection("up");
				break;
			case goog.events.KeyCodes.DOWN:
				player.unsetMovingDirection("down");
				break;
			case goog.events.KeyCodes.SPACE:
				audios.missle.setLoop(false);
				player.setFiring(false);
				break;
		}
	}

	playerDamaged = function(player,damage) {
		var life = player.getLife();
		lifeBar.setLife(life);
		audios.alarm.play();
		scoreBar.addScore(-200);
	}


	playerDied = function(player) {
		var text = "I've played Hackengers and saved "+ (friends[0] ? friends[Math.floor(Math.random()*friends.length)].name : "my friend")+ "from viruses! Play Hackengers and save your friends!";
		var text2 = "You were so close! Try again and save your friend!";
		lime.scheduleManager.callAfter(function(delay) {
			var isFacebookActive = false;
			if (typeof(FB) != 'undefined' && FB != null && typeof(MyFB) != 'undefined' && MyFB != null ) {
			    isFacebookActive = true;
			};
			director.replaceScene(new helloworld.FacebookScene(director,friends,helloworld.VirusScene,menuSceneType,scoreBar.getScore(),isFacebookActive,text,text2),lime.transitions.SlideInUp,2);
		},this,3000);
		_this.scheduleAll(false);
	};

	
	player.registerObserver(this,playerDamaged,playerDied);

	playerWon = function() {
		var text = "I've played Hackengers and saved "+ (friends[0] ? friends[0].name : "my friend")+ " from viruses! Play Hackengers and save your friends!";
		var text2 = "Congratulations! You won! You saved your friend and collected "+scoreBar.getScore()+" points!";

		var isFacebookActive = false;
		if (typeof(FB) != 'undefined' && FB != null && typeof(MyFB) != 'undefined' && MyFB != null ) {
		    isFacebookActive = true;
		};
		director.replaceScene(new helloworld.FacebookScene(director,friends,helloworld.VirusScene,menuSceneType,scoreBar.getScore(),isFacebookActive,text,text2),lime.transitions.SlideInUp,2);

		_this.scheduleAll(false);
	};


	explosionEnded = function(explosion) {
		helloworld.Helpers.cleanMoveable(explosion,explosions);
	};

	creatingStars = function (dt) {
		var star = new helloworld.CorruptedFile();
		star.setPosition(helloworld.Helpers.randrange(0,1000),0);
		background.appendChild(star);
		stars.iterable.add(star);
		collisionManager.addCollidable(stars.group,star);
   };

   monsterDied = function(monster) {
   		helloworld.Helpers.cleanMoveable(monster,monsters);
   		audios.explosions.soft.play();
   		shooting_monsters.remove(monster);
   		var explosion = new helloworld.Explosion(monster,target,2000,this,explosionEnded);
   		explosions.iterable.add(explosion);
   		scoreBar.addScore(100);
   };

   collectFile = function(corrupted_file) {
		audios.yeah.play();
		var runawaydirection = {
			x: Math.random()>0.5 ? "up" : "down",
			y: Math.random()>0.5 ? "left" : "right"
		}

		var runawayspeed = {
			x: 4+Math.random()*8,
			y: 4+Math.random()*8
		}
		corrupted_file.setMovingDirection(runawaydirection.x);
		corrupted_file.setMovingDirection(runawaydirection.y);
		corrupted_file.setMovingSpeed(runawayspeed.x,"x");
		corrupted_file.setMovingSpeed(runawayspeed.y,"y");
		scoreBar.addScore(200);
		collisionManager.removeCollidable(stars.group,corrupted_file);
		corrupted_file.setFill("assets/file.png");
		var life = player.getLife() + 5;
		player.setLife(life);
		lifeBar.setLife(life);
   }

   creatingMonsters = function (dt) {
		var monster = new helloworld.Monster();
		monster.setPosition(helloworld.Helpers.randrange(100,900),0);
		monster.registerObserver(this,null,monsterDied);
	    target.appendChild(monster);
	    collisionManager.addCollidable(monsters.group,monster);
		monsters.iterable.add(monster);
		monster.setMovingBounds(0,1024,2000,0);
		if (Math.random()<0.4) {
			monster.setBouncing(true);
		};

		if (Math.random()<0.2) {
			shooting_monsters.add(monster);
		};
   };

   monsterShoot = function() {
   		goog.iter.forEach(shooting_monsters, function(monster) {
	   		var missles = monster.shoot();
	   		audios.explosions.monster.play();
			for (var i = missles.length - 1; i >= 0; i--) {
				var missle = missles[i];
				target.appendChild(missle);
				missle.registerObserver(this,null,monsterDied);
				collisionManager.addCollidable(monsters.group,missle);
				monsters.iterable.add(missle);
			};
		});
   };

   missleDied = function(missle) {
   	   	helloworld.Helpers.cleanMoveable(missle,missles);
   };

	firing = function(dt) {
		var missle = player.fire();
		if (missle) {
			missle.setMovingDirection("up");
			missle.registerObserver(this,null,missleDied);
			missles.iterable.add(missle);
			target.appendChild(missle);
			collisionManager.addCollidable(missles.group,missle);
		};
	};

   moving = function(dt) {
   		// Player
		player.move();
		// Missles
		goog.iter.forEach(missles.iterable, function(missle) {
			missle.move(dt);
		});
		// Monsters
		goog.iter.forEach(monsters.iterable, function(monster) {
			monster.move(dt);
		});
		// Stars
		goog.iter.forEach(stars.iterable, function(star) {
			star.move(dt);
		});
		// Explosions
		goog.iter.forEach(explosions.iterable, function(explosion) {
			explosion.move(dt);
		});
	};

	cleaning = function(dt) {
		// Stars
		stars_all = helloworld.Helpers.cleanup(stars.iterable);
		stars.iterable = stars_all[0];
		helloworld.Helpers.cleanEachMoveable(stars_all[1],stars);

		// Monsters
		monsters_all = helloworld.Helpers.cleanup(monsters.iterable);
		monsters.iterable = monsters_all[0];
		helloworld.Helpers.cleanEachMoveable(monsters_all[1],monsters);

		// Missles
		missles_all = helloworld.Helpers.cleanup(missles.iterable);
		missles.iterable = missles_all[0];
		helloworld.Helpers.cleanEachMoveable(missles_all[1],missles);
	};

	collisionsCheck = function(dt) {
		// Saving corrupted files
		collisions = collisionManager.checkAllCollisions(stars.group,"Player");
		for (var i = collisions.length - 1; i >= 0; i--) {
			corrupted_file = collisions[i][0];
			player = collisions[i][1];
			collectFile(corrupted_file);
		};

		collisions = collisionManager.checkAllCollisions(monsters.group,"Player");
		for (var i = collisions.length - 1; i >= 0; i--) {
			monster = collisions[i][0];
			player = collisions[i][1];
			if (player.doDamage(monster.collisionDamage())) {
				monster.doDamage(player.collisionDamage());
			};
		};
		collisions = collisionManager.checkAllCollisions(monsters.group, missles.group);
		for (var i = collisions.length - 1; i >= 0; i--) {
			monster = collisions[i][0];
			missle = collisions[i][1];
			monster.doDamage(missle.collisionDamage());
			missle.doDamage(monster.collisionDamage());
		};
	};
	
	scoreCheck = function(dt) {
		if (scoreBar.getScore()>=10000) {
   			playerWon();
   		};
	}
	this.scheduleAll = function(schedule) {
		if (schedule) {
			goog.events.listen(target,['keydown'],keydown);
			goog.events.listen(target,['keyup'],keyup);
			// creating stars
			lime.scheduleManager.scheduleWithDelay(creatingStars, background, 8000);
			// creating monsters
			lime.scheduleManager.scheduleWithDelay(creatingMonsters, background, 2000);
			//  moving
			lime.scheduleManager.schedule(moving,target);
			// collisions
			lime.scheduleManager.schedule(collisionsCheck,target);
			// player firing
			lime.scheduleManager.scheduleWithDelay(firing, target, 180);
			// cleanup
			lime.scheduleManager.scheduleWithDelay(cleaning,target,1000);
			// shooting monsters
			lime.scheduleManager.scheduleWithDelay(monsterShoot,target,4000);

			// score Check CAN'T be scheduled with interval, because of the bug in LimeJS engine
			lime.scheduleManager.schedule(scoreCheck);


			audios.background.setLoop(true).play();


		} else {
			audios.background.setLoop(false).rewind().stop();
			audios.missle.setLoop(false).rewind().stop();
			player.setFiring(false);
			goog.events.unlisten(target,['keydown'],keydown);
			goog.events.unlisten(target,['keydown'],keyup);
			lime.scheduleManager.unschedule(creatingStars,background);
			lime.scheduleManager.unschedule(creatingMonsters,background);
			lime.scheduleManager.unschedule(moving,target);
			lime.scheduleManager.unschedule(collisionsCheck,target);
			lime.scheduleManager.unschedule(firing,target);
			lime.scheduleManager.unschedule(cleaning,target);
			lime.scheduleManager.unschedule(monsterShoot,target);
			lime.scheduleManager.unschedule(scoreCheck);
		}
	};


	// Menu button
	var menuButton = new lime.GlossyButton("MENU").setSize(50,30).setPosition(40,30);
	this.appendChild(menuButton);
	goog.events.listen(menuButton, ['mousedown', 'touchstart'], function(e) {
		_this.scheduleAll(false);
		director.pushScene(new helloworld.PauseScene(director,friends,_this,helloworld.VirusScene,menuSceneType),lime.transitions.SlideInUp,2);
	});

	this.scheduleAll(true);

};

goog.inherits(helloworld.VirusScene, lime.Scene);
