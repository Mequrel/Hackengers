goog.provide('helloworld.Aliveable');
goog.require('helloworld.Moveable');
goog.require('goog.math.Coordinate');
goog.require('goog.iter');
goog.require('goog.structs.Map');

helloworld.Aliveable= function() {
	// Call parent constructor
	helloworld.Moveable.call(this);
	// Set's default values for life, radius,damage
	this.life = 1;
	this.collision_radius = 1;
	this.collision_damage = 1;
	// Maps mapping from observers to functions
	this.observers_damage = new goog.structs.Map();
	this.observers_died = new goog.structs.Map();
};

goog.inherits(helloworld.Aliveable, helloworld.Moveable);

// Returns collision radius for object
helloworld.Aliveable.prototype.collisionRadius = function() {
	return this.collision_radius;
};

// Returns damage GIVEN on collision
helloworld.Aliveable.prototype.collisionDamage = function() {
	return this.collision_damage;
};

// Returns actual life
helloworld.Aliveable.prototype.getLife = function() {
	return this.life;
};

// Register observers. Observers will be notified when one or two events happen
helloworld.Aliveable.prototype.registerObserver = function(key,damage_func,died_func) {
	if (typeof(damage_func) != 'undefined' && damage_func!=null) {
		this.observers_damage.set(key,damage_func);
	};
	if (died_func!=null) {
		this.observers_died.set(key,died_func);
	};
};
// Unregister observer
helloworld.Aliveable.prototype.unregisterObserver = function(key) {
	this.observers_damage.remove(key);
	this.observers_died.remove(key);
};

// Calculate coordinates for object's center
helloworld.Aliveable.prototype.getCenter = function() {
	box = this.getBoundingBox();
	size = this.getSize();
	return new goog.math.Coordinate(box.top+size.height/2,box.left+size.width/2);
};

// Damage handling
helloworld.Aliveable.prototype.doDamage = function(damage) {
	this.life -= damage;
	alive = this;
	// We notify observers, that we're damaged 
	goog.iter.forEach(this.observers_damage, function(damage_func) {
		damage_func(alive,damage);
	});
	// Check die status, if true, notify observers that we're dead
	if (this.die()) {
		goog.iter.forEach(this.observers_died, function(died_func) {
			died_func(alive);
		});
	};
	return true;
};

// Check die status
helloworld.Aliveable.prototype.die = function() {
	if(this.life<=0) {
		return true;
	} else {
		return false;
	};
};