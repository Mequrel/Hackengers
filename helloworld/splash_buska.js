// goog.provide('helloworld.Splash');

// goog.require('lime.Sprite');
// goog.require('lime.Label');
// goog.require('goog.math.Box');
// goog.require('lime.animation.Event');
// goog.require('helloworld.TypeWritingAnimation')
// goog.require('lime.animation.MoveBy');
// goog.require('lime.animation.Easing');

// helloworld.Splash = function() {
// 	lime.Sprite.call(this);
// 	this.setAnchorPoint(0,0);
// 	this.shown = false;
// 	this.closeHandlers = []
// };

// goog.inherits(helloworld.Splash, lime.Sprite);

// helloworld.Splash.prototype.show = function(x,y) {

// 	var movedown = new lime.animation.MoveTo(x, y).setEasing(lime.animation.Easing.EASEOUT);
// 	this.runAction(movedown);
// 	this.shown = true;
// };

// helloworld.Splash.prototype.registerOnClose = function(handler) {
// 	this.closeHandlers.push(handler);
// };

// helloworld.Splash.prototype.close = function(duration) {	
// 	if(duration != 0.0 && !duration) {
// 		duration = 1.0;
// 	}
// 	var moveup = new lime.animation.MoveBy(0, -600).setEasing(lime.animation.Easing.EASEIN).setDuration(duration);
// 	this.runAction(moveup);

// 	passThis = this;
// 	goog.events.listen(moveup,lime.animation.Event.STOP,function(e){
// 		for (i in this.closeHandlers) {
// 			this.closeHandlers[i]();
// 		}
// 	});
// 	this.shown = false;
// };








