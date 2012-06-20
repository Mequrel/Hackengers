goog.provide('helloworld.CollisionManager');

goog.require('goog.structs.Map');
goog.require('goog.structs.Set');

goog.require('helloworld.Aliveable');
goog.require('helloworld.Missle');
goog.require('goog.math.Coordinate');

helloworld.CollisionManager = function(width,height,rows,cols) {
   this.groups = new goog.structs.Map();
};

helloworld.CollisionManager.prototype.checkAllCollisions = function(groupA,groupB) {
	// Simple round robin collision detection
	collisions = [];
	groupSetA = this.groups.get(groupA);
	groupSetB = this.groups.get(groupB);

	if (!groupSetA || !groupSetB) {
		return [];
	};

	manager = this;

	goog.iter.forEach(groupSetA, function(A) {
		goog.iter.forEach(groupSetB, function(B) {
			if (manager.checkIfCollide(A,B)) {
				collisions.push([A,B]);
			};
		})
	});

	return collisions;
};

helloworld.CollisionManager.prototype.addCollidable = function(group,collidable) {
	if (!this.groups.containsKey(group)) {
		this.groups.set(group,new goog.structs.Set());
	};
	groupSet = this.groups.get(group);
	groupSet.add(collidable);
};

helloworld.CollisionManager.prototype.removeCollidable = function(group,collidable) {
	groupSet = this.groups.get(group);
	return groupSet.remove(collidable);
};

helloworld.CollisionManager.prototype.checkIfCollide = function(collidableA, collidableB) {
	var dist = goog.math.Coordinate.distance(collidableA.getCenter(), collidableB.getCenter());
	return (dist<=collidableA.collisionRadius()+collidableB.collisionRadius());
}

helloworld.CollisionManager.prototype.calculateCell = function(collidable) {
	// to do
};