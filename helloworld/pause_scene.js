goog.provide('helloworld.PauseScene');

goog.require('lime.Scene');
goog.require('helloworld.StandardScene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('helloworld.Helpers');
goog.require('lime.GlossyButton');
goog.require('helloworld.MenuScene');
goog.require('lime.scheduleManager');


helloworld.PauseScene= function(director,friends,previousScene,previousSceneType) {
	helloworld.StandardScene.call(this,friends,director);
	

	var genButton = function(text,num) {
		return new lime.GlossyButton(text).setPosition(0,-120+num*80).
		setSize(200,60);
	}
	this.resumeButton = genButton("Resume",0);
	this.playAgainButton = genButton("Play again",1);
	this.mainMenuButton = genButton("Back to main menu",2);
	this.splash.appendChild(this.resumeButton);
	this.splash.appendChild(this.playAgainButton);
	this.splash.appendChild(this.mainMenuButton);
	this.showSplash();

	var _this = this;
	
	// Resume
	goog.events.listen(this.resumeButton, ['mousedown', 'touchstart'], function(e) {
		handler = function() {
			console.log("asd");
			director.popScene();
			previousScene.schcheduleAll(true);
		};
		_this.splash.registerOnClose(handler);
		_this.splash.close(1);
	});
	// Play again
	goog.events.listen(this.playAgainButton, ['mousedown', 'touchstart'], function(e) {
		handler = function() {
			director.popScene();
			director.replaceScene(new previousSceneType(director,friends));
		}
		_this.splash.registerOnClose(handler);
		_this.splash.close(1);
	});

	// Main menu scene
	goog.events.listen(this.mainMenuButton, ['mousedown', 'touchstart'], function(e) {
		handler = function() {
			director.popScene();
			director.replaceScene(new helloworld.MenuScene(director,friends));
		}
		_this.splash.registerOnClose(handler);
		_this.splash.close(1);
	});
};

goog.inherits(helloworld.PauseScene, helloworld.StandardScene);