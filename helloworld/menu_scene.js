goog.provide('helloworld.MenuScene');


goog.require('lime.Scene');
goog.require('lime.RoundedRect');
goog.require('helloworld.VirusScene');
goog.require('helloworld.PauseScene');
goog.require('helloworld.RunScene');
goog.require('helloworld.ImpulsScene');
goog.require('helloworld.IntroScene');

goog.require('helloworld.ImpulsSceneTest');


helloworld.MenuScene= function(director,friends) {
	lime.Scene.call(this);
	var game1 = new lime.RoundedRect().setFill('#0f0').setSize(500,100).setRadius(10).setAnchorPoint(0,0)
	.setPosition(200,100);
	var text1 = new lime.Label().setText('Game 1').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(26).setFontWeight('bold').setSize(150,30).setAnchorPoint(0,0)
	.setPosition(370,140);

	var game2 = new lime.RoundedRect().setFill('#0f0').setSize(500,100).setRadius(10).setAnchorPoint(0,0)
	.setPosition(200,250);

	var text2 = new lime.Label().setText('Game 2').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(26).setFontWeight('bold').setSize(150,30).setAnchorPoint(0,0)
	.setPosition(370,290);
	

	var game3 = new lime.RoundedRect().setFill('#0f0').setSize(500,100).setRadius(10).setAnchorPoint(0,0)
	.setPosition(200,400);
	var text3 = new lime.Label().setText('Game 3').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(26).setFontWeight('bold').setSize(150,30).setAnchorPoint(0,0)
	.setPosition(370,440);

	this.appendChild(game1);
	this.appendChild(text1);
	this.appendChild(game2);
	this.appendChild(text2);
	this.appendChild(game3);
	this.appendChild(text3);


	goog.events.listen(game1, ['mousedown', 'touchstart'], function(e) {
		var virus_scene = new helloworld.VirusScene(director,friends);
		director.replaceScene(virus_scene);
	});

	goog.events.listen(game2, ['mousedown', 'touchstart'], function(e) {
		// var run_scene = new helloworld.RunScene();
		// director.replaceScene(run_scene);
		var test = new helloworld.ImpulsSceneTest(friends);
		director.replaceScene(test);
	});

	goog.events.listen(game3, ['mousedown', 'touchstart'], function(e) {
		//var virus_scene = new helloworld.ImpulsScene(friends);
		var intro_scene = new helloworld.IntroScene(director,friends);
		director.replaceScene(intro_scene);

	});

};

goog.inherits(helloworld.MenuScene, lime.Scene);
