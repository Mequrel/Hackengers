goog.provide('helloworld.IntroScene');


goog.require('lime.Scene');
goog.require('lime.RoundedRect');
goog.require('helloworld.VirusScene');
goog.require('helloworld.RunScene');
goog.require('helloworld.ImpulsScene');



helloworld.IntroScene= function(director,friends) {
	lime.Scene.call(this);
	this.friends = friends;
	this.director = director;


	var game1 = new lime.RoundedRect().setFill('#0f0').setSize(500,100).setRadius(10).setAnchorPoint(0,0).setPosition(200,100);
	var text1 = new lime.Label().setText('Play').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(26).setFontWeight('bold').setSize(150,30).setAnchorPoint(0,0).setPosition(370,140);

    goog.events.listen(game1, ['mousedown', 'touchstart'], function(e) {
		var impuls_scene = new helloworld.ImpulsScene(friends);
		director.replaceScene(impuls_scene);
	});

    this.appendChild(game1);
	this.appendChild(text1);
};

goog.inherits(helloworld.IntroScene, lime.Scene);