goog.provide('helloworld.Helpers');

goog.require('goog.math.Box');
goog.require('goog.iter');
goog.require('goog.structs.Set');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Sequence');
goog.require('helloworld.Splash');

helloworld.Helpers= function() {
	// ?
};

helloworld.Helpers.createStandardSplashScreen = function(layer,handler) {
	var splash = new helloworld.Splash();
	splash.setSize(500,400);
	splash.setPosition(100,100);
	splash.setFill("assets/bg.jpg");
	if (handler) {
		splash.registerOnClose(handler);
	};
	layer.appendChild(splash);
	return splash;
};

helloworld.Helpers.isOnScreen = function(obj) {
	var objBox = obj.getBoundingBox();
	var layerBox = new goog.math.Box(0,1024,768,0);
	return goog.math.Box.intersects(objBox, layerBox);
};

helloworld.Helpers.cleanup = function(iterable) {
	inSet = new goog.structs.Set();
	outSet = new goog.structs.Set();

	goog.iter.forEach(iterable, function(element) {
		if (helloworld.Helpers.isOnScreen(element)) {
			inSet.add(element);
		} else {
			outSet.add(element);
		}
	});

	return [inSet,outSet];
};

helloworld.Helpers.randrange = function(a,b) {
	return a+Math.floor((Math.random()*(b-a+1)));
};

helloworld.Helpers.removeFromCollisionManager = function(object, info) {
	info.manager.removeCollidable(info.group,object);
}

helloworld.Helpers.cleanEachMoveable= function(iterable, info) {
	if (info.manager!=null) {
		goog.iter.forEach(iterable, function(to_remove) {
			console.log(info.manager.removeCollidable(info.group,to_remove));
			info.layer.removeChild(to_remove);
			delete to_remove;
		});
	} else {
		goog.iter.forEach(iterable, function(to_remove) {
			info.layer.removeChild(to_remove);
			delete to_remove;
		});
	}
	iterable.clear();
}

helloworld.Helpers.cleanMoveable = function(object,info) {
	if (info.iterable!=null) {
		console.log(info.iterable.remove(object));
	};
	if (info.manager!=null) {
		console.log(info.manager.removeCollidable(info.group,object));
	};
	
	info.layer.removeChild(object);
	delete object;
};

helloworld.Helpers.createGroupInfo = function(iterable,group,manager,layer) {
	var groupInfo = {};
	groupInfo.iterable = iterable;
	groupInfo.manager = manager;
	groupInfo.group = group;
	groupInfo.layer = layer;

	return groupInfo;
}

helloworld.Helpers.flashingAnimation = function(fade,duration,times) {
	var fadeout = new lime.animation.FadeTo(fade).setDuration(duration/2);
	var fadein = new lime.animation.FadeTo(1.0).setDuration(duration/2);
	var flash = new lime.animation.Sequence(fadeout,fadein);
	var sequence = flash;
	for (var i = 1; i <times; i++) {
		sequence = new lime.animation.Sequence(sequence,flash);
	};
	return sequence;
}



