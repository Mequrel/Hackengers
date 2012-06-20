goog.provide('helloworld.StandardScene');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('helloworld.Helpers')


helloworld.StandardScene= function(director,friends) {
	lime.Scene.call(this);
	var background = new lime.Sprite().setPosition(0,0).setSize(1024,768).setFill("assets/splash_tlo.jpg").setAnchorPoint(0,0);
	var middle = new lime.Layer().setPosition(0,0).setAnchorPoint(0.5,0.5);
	var computer = new lime.Sprite().setPosition(0,0).setSize(1024,768).setFill("assets/splash_main.png").setAnchorPoint(0,0);
	var computer_background = new lime.Sprite().setPosition(170,105).setSize(695,480).setFill("#fff").setAnchorPoint(0,0);

	this.appendChild(background);
	this.appendChild(computer_background);
	this.appendChild(middle);
	this.appendChild(computer);

	this.splash = helloworld.Helpers.createStandardSplashScreen(middle);
	this.splash.setPosition(512,-100);
}

goog.inherits(helloworld.StandardScene, lime.Scene);


helloworld.StandardScene.prototype.showSplash = function() {
	this.splash.show(512,340);
	return this;
};

helloworld.StandardScene.prototype.getSplash = function() {
	return this.splash;
};