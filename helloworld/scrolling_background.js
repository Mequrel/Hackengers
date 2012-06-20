goog.provide('helloworld.ScrollingBackground');
goog.require('lime.Sprite');
goog.require('helloworld.Moveable');
goog.require('helloworld.Helpers');
goog.require('lime.scheduleManager');

helloworld.ScrollingBackground= function(width,height) {
	// Call parent constructor
	lime.Sprite.call(this);
	this.scrolling = false;
	this.setSize(width,height);
	var element1 = new helloworld.Moveable().setMovingDirection("down").
		setMovingSpeed(3,"y").setAnchorPoint(0,0).setPosition(0,0).
		setSize(width,height).setFill('assets/uklad_scalony.jpg').setStroke(null);
	var element2 = new helloworld.Moveable().setMovingDirection("down").
		setMovingSpeed(3,"y").setAnchorPoint(0,0).setPosition(0,-height).
		setSize(width,height).setFill('assets/uklad_scalony.jpg').setStroke(null);

		element1.next = element2;
		element2.next = element1;

	this.appendChild(element1);
	this.appendChild(element2);
	this.scheduledScrolling = function(dt) {
		this.scroll(dt);
	}
	
};

goog.inherits(helloworld.ScrollingBackground, lime.Sprite);

helloworld.ScrollingBackground.prototype.setScrolling = function(scrolling) {
	if (scrolling && !this.scrolling) {
		this.scrolling = true;
		lime.scheduleManager.schedule(this.scheduledScrolling,this);
	} else if (!scrolling && this.scrolling) {
		this.scrolling = false;
		lime.scheduleManager.unschedule(this.scheduledScrolling);
	}
	return this;
};
helloworld.ScrollingBackground.prototype.scroll = function(dt) {
	for (var i = 0; i < this.getNumberOfChildren(); i++) {
		var element = this.getChildAt(i);
		helloworld.Moveable.prototype.move.call(element,dt);
		if (!helloworld.Helpers.isOnScreen(element)) {
			var pos = element.next.getPosition().y-this.getSize().height+6;
			element.setPosition(0,pos);
		};
	};
	return this;
};
