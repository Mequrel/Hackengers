goog.provide('helloworld.Audio');
goog.require('lime.audio.Audio');

helloworld.Audio = function(filePath,loop,autoplay,volume) {
	lime.audio.Audio.call(this,filePath);
	if (typeof(loop) != 'undefined' && loop!=null ) {
		this.baseElement.loop = loop;
	};
	if (typeof(volume) != 'undefined' && volume!=null ) {
		this.baseElement.volume = volume;
	};

	if (typeof(autoplay) != 'undefined' && autoplay!=null ) {
		this.baseElement.autoplay = autoplay;
	};
};

goog.inherits(helloworld.Audio, lime.audio.Audio);

/**
 * Returns true if audio file is playing
 * @return {boolean} Audio is playing.
 */

helloworld.Audio.prototype.setLoop = function(loop) {
	this.baseElement.loop = loop;
	return this;
};

helloworld.Audio.prototype.setVolume = function(volume) {
	this.baseElement.volume = volume;
	return this;
};

helloworld.Audio.prototype.rewind = function() {
	this.baseElement.pause();
	this.baseElement.currentTime = 0;
	return this;
};

helloworld.Audio.prototype.isPlaying = function() {
	console.log(this.baseElement.currentTime);
    return lime.audio.Audio.prototype.isPlaying(this);
};

// /**
//  * Start playing the audio
//  */
// lime.audio.Audio.prototype.play = function() {
//     if (this.isLoaded() && !this.isPlaying()) {
//         this.baseElement.play();
//         this.playing_ = true;
//     }
// };

// /**
//  * Stop playing the audio
//  */
// lime.audio.Audio.prototype.stop = function() {
//     if (this.isPlaying()) {
//         this.baseElement.pause();
//         this.playing_ = false;
//     }
// };