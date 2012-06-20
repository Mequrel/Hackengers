goog.provide('helloworld.LifeBar');
goog.require('lime.RoundedRect');


helloworld.LifeBar= function(max_life,length) {
	lime.RoundedRect.call(this);
	this.setStroke("#000");
	this.max_life = max_life;
	this.life = max_life;
	this.length = length;
	this.rect = new lime.RoundedRect().setFill('#0f0').setSize(this.length,20).setRadius(0).setAnchorPoint(1,0).setStroke(2,"#000");
	this.appendChild(this.rect);
	this.setSize(this.length,20).setRadius(0).setAnchorPoint(1,0).setStroke(2,"#000");
}

goog.inherits(helloworld.LifeBar, lime.RoundedRect);

helloworld.LifeBar.prototype.setLife = function(life) {
	this.life = life;
	var sizeF = (this.life/this.max_life);
	this.rect.setSize(this.length*sizeF,20);
	if (sizeF > 0.5){
		this.rect.setFill('#0f0');
	} else if (sizeF > 0.25 ) {
		this.rect.setFill('rgb(255,255,0)');
	} else {
		this.rect.setFill('rgb(255,0,0)');
	}
};