goog.provide('helloworld.TypeWritingAnimation');


goog.require('goog.math.Coordinate');
goog.require('lime.Sprite');
goog.require('lime.animation.Animation');
goog.require('lime.animation.Easing');

/**
 * Move element to specific position
 * Also accepts two numbers (x and y)
 * @constructor
 * @param {(goog.math.Coordinate|number)} position New position value.
 * @param {number=} opt_y Optionaly use x,y
 * @extends lime.animation.Animation
 */
helloworld.TypeWritingAnimation = function(textToWrite, speed) {
    lime.animation.Animation.call(this);

    this._textToWrite = textToWrite;
    this.speed_ = speed;
};
goog.inherits(helloworld.TypeWritingAnimation, lime.animation.Animation);

/**
 * @inheritDoc
 */
helloworld.TypeWritingAnimation.prototype.scope = 'move';

helloworld.TypeWritingAnimation.prototype.setSpeed = function(speed) {
    this.speed_ = speed;
    this.calcDurationFromSpeed_();
    return this;
};



helloworld.TypeWritingAnimation.prototype.calcDurationFromSpeed_ = function(){
    if(!this.speed_) return;
    
    this.setDuration(this.speed_ * this._textToWrite.length);
    this.speedCalcDone_ = 1;
}

helloworld.TypeWritingAnimation.prototype.makeTargetProp = function(target) {
    if (this.useTransitions()) {
        target.addTransition(lime.Transition.POSITION,
            this.position_,
            this.duration_, this.getEasing());
        target.setDirty(lime.Dirty.POSITION);
    }

    target.setText('');

    return {currentPos: 0};
};

helloworld.TypeWritingAnimation.prototype.update = function(t, target) {
    if (this.status_ == 0) return;
    var prop = this.getTargetProp(target);

    var now = target.getText()

    lvl = Math.round(t*this._textToWrite.length)+1;
    if(lvl != target.getText().length) {
       target.setText(this._textToWrite.substring(0,lvl) + '_');

    }

};

helloworld.TypeWritingAnimation.prototype.clearTransition = function(target) {

    if (this.useTransitions()) {
        target.clearTransition(lime.Transition.POSITION);
        target.setDirty(lime.Dirty.POSITION);
    }

};

