goog.provide('helloworld.FacebookScene');

goog.require('lime.Scene');
goog.require('helloworld.StandardScene');
goog.require('lime.Layer');
goog.require('lime.Node');
goog.require('lime.Sprite');
goog.require('helloworld.Helpers');
goog.require('lime.GlossyButton');
goog.require('lime.scheduleManager');


helloworld.FacebookScene= function(director,friends,previousSceneType,menuSceneType,score,isFacebookActive,default_text) {
	helloworld.StandardScene.call(this,friends,director);
	var node = new lime.Node().setSize(200,200);
	var input = document.createElement('textarea');
	console.log(default_text);
	input.setAttribute('rows',6);
	input.setAttribute('cols',33);
	input.setAttribute('style',"font-size:22px");
	input.value = default_text;
	node.appendChild(input);
	node.setPosition(-224,-50);

	_this = this;

	lime.GlossyButton.prototype.setFontColor = function(clr) {
	    this.upstate.label.setFontColor(clr);
	    this.downstate.label.setFontColor(clr);
	    return this;
	};

	backToMainMenu = function(e) {
		handler = function() {
			director.popScene();
			director.replaceScene(new menuSceneType(director,friends));
		}
		_this.splash.registerOnClose(handler);
		_this.splash.close(1);
	};

	publishOnFacebook = function(text) {
		FB.api('/me/feed', 'post', { message: text }, function(response) {
			  if (!response || response.error) {
			  	console.log(response);
			    alert('Ups. There is something wrong with your Facebook connection.');
			  } else {
			  	backToMainMenu(null);
			  }
		});
	}

	var facebookButton =  new lime.GlossyButton("Post on Facebook").
		setSize(200,40).setColor("#133783").setFontColor("#fff").setPosition(120,150);

	var menuButton = new lime.GlossyButton("Back to menu").
		setSize(200,40).setPosition(-120,150);

	if (isFacebookActive) {
		this.splash.appendChild(node);
		this.splash.appendChild(facebookButton);
	};

	this.splash.appendChild(menuButton);
	this.showSplash();

	goog.events.listen(this, ['mousedown', 'touchstart'], function(e) {
		input.focus();
	});

	goog.events.listen(menuButton, ['mousedown', 'touchstart'], backToMainMenu);
	goog.events.listen(facebookButton, ['mousedown', 'touchstart'], function(e) {
		publishOnFacebook(input.value);
	});
	
};

goog.inherits(helloworld.FacebookScene, helloworld.StandardScene);