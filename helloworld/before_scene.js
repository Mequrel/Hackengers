goog.provide('helloworld.BeforeScene');

goog.require('lime.Scene');
goog.require('helloworld.StandardScene');
goog.require('lime.Layer');
goog.require('lime.Node');
goog.require('lime.Sprite');
goog.require('helloworld.Helpers');
goog.require('lime.GlossyButton');
goog.require('lime.scheduleManager');
goog.require('lime.transitions.SlideInDown');


helloworld.BeforeScene= function(director,friends,nextSceneType,menuSceneType,texts) {
	helloworld.StandardScene.call(this,friends,director);
	this.showSplash();

	var currentText = 0;
	var nextActive = false;
	var overlay = new lime.Layer().setSize(400,300);
	var label = new lime.Label().setSize(400,300).setFontColor("#fff").setFontSize(28);
	overlay.appendChild(label);
	this.splash.appendChild(overlay);
	loadNextText = function() {
		nextActive = false;
		var fadeOut = new lime.animation.FadeTo(0.0).setDuration(0.2);
		overlay.runAction(fadeOut);
		goog.events.listen(fadeOut,lime.animation.Event.STOP,function(e){
			overlay.removeAllChildren();
			var text = texts[currentText++];
			if (typeof(text)=='string') {
				label.setHidden(false);
			    label.setText(text);
			    overlay.appendChild(label);
			} else {
				label.setHidden(true);
				overlay.appendChild(text);
			}
			var fadeIn = new lime.animation.FadeTo(1.0).setDuration(0.2);
			overlay.runAction(fadeIn);
			goog.events.listen(fadeIn,lime.animation.Event.STOP,function(e){
				nextActive=true;

			});
			});
		};


	loadGame = function() {
		director.replaceScene(new nextSceneType(director,friends,menuSceneType),lime.transitions.SlideInDown,2);
	};

	var nextButton =  new lime.GlossyButton("Next").setPosition(160,160).
		setSize(120,40);

	this.splash.appendChild(nextButton);

	goog.events.listen(nextButton, ['mousedown', 'touchstart'], function(e) {
		if (nextActive) {
			if (currentText==texts.length) {
				loadGame();
			} else {
				loadNextText();
				if (currentText==texts.length-1) {
					nextButton.setText("Play");
				}
			};
		};
	});

	loadNextText();

};

goog.inherits(helloworld.BeforeScene, helloworld.StandardScene);