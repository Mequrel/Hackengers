goog.provide('helloworld.TypeWritingLabel');

goog.require('lime.Sprite');
goog.require('lime.Label');

goog.require('lime.animation.Event');
goog.require('helloworld.TypeWritingAnimation');

helloworld.TypeWritingLabel = function() {
	lime.Label.call(this);

	this._speed = undefined;
	this._textToSay = undefined;

	this._endHandlers = []
};

helloworld.TypeWritingLabel.prototype.setSpeed = function(speed) {
	this._speed = speed;
};

helloworld.TypeWritingLabel.prototype.setText = function(text) {
	this._textToSay = text;
};

helloworld.TypeWritingLabel.prototype.startTypeWriting = function(text) {
	var typeWrite = new helloworld.TypeWritingAnimation(this._textToSay, this._speed);
			
	goog.events.listen(typeWrite,lime.animation.Event.STOP,function(){
		for (i in this._endHandlers) {
			this._endHandlers[i]();
		}
	});

	textLabel.runAction(typeWrite);	
}

goog.inherits(helloworld.TypeWritingLabel, lime.Label);
