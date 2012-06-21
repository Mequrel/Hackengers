goog.provide('helloworld.Score');
goog.require('lime.Label');


helloworld.Score = function() {
	lime.Label.call(this);
	this.setText("0");
	this.value = 0;
	this.setAnchorPoint(0,0);
	this.setFontSize(35);
};

goog.inherits(helloworld.Score, lime.Label);


helloworld.Score.prototype.addScore = function(score) {
	this.value += score;
	this.setText(this.value);
};


helloworld.Score.prototype.getScore = function() {
	return this.value;
};