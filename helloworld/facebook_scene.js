goog.provide('helloworld.FacebookScene');

goog.require('lime.Scene');
goog.require('helloworld.StandardScene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('helloworld.Helpers');
goog.require('lime.GlossyButton');
goog.require('helloworld.MenuScene');
goog.require('lime.scheduleManager');


helloworld.FacebookScene= function(director,friends,previousScene,previousSceneType) {
	helloworld.StandardScene.call(this,friends,director);
	var input = document.createElement('input');
	this.showSplash
	this.showSplash();

};

goog.inherits(helloworld.FacebookScene, helloworld.StandardScene);