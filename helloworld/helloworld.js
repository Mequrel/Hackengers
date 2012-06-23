//set provided namespace
goog.provide('helloworld');

//get requirements
goog.require('lime.Director');
goog.require('helloworld.MenuScene');


// entrypoint
helloworld.start = function(){



lime.Director.prototype.pushScene = function(scene, opt_transition,
        opt_duration) {
	scene.setSize(this.getSize().clone());


    //

    var transitionclass = opt_transition || lime.transitions.Transition;

    var outgoing = null;
    if (this.sceneStack_.length)
        outgoing = this.sceneStack_[this.sceneStack_.length - 1];


    //
    this.sceneStack_.push(scene);
    scene.domElement.style['display']='none';
    this.domElement.appendChild(scene.domElement);
    scene.parent_ = this;
    scene.wasAddedToTree();



    //


    var transition = new transitionclass(outgoing, scene);
        
    // goog.events.listen(transition,'end',function() {

    //     goog.dom.removeNode(outgoing);
            
    //     },false,this);

    if (goog.isDef(opt_duration)) {
        transition.setDuration(opt_duration);
    }

    transition.start();
    return transition;

    ///

};


/**
 * Remove current scene from the stack
 */
lime.Director.prototype.popScene = function(opt_transition,
        opt_duration) {

    var transitionclass = opt_transition || lime.transitions.Transition;

    var ongoing = this.sceneStack_[this.sceneStack_.length - 2];
    var scene = this.sceneStack_[this.sceneStack_.length - 1];

    var transition = new transitionclass(scene, ongoing);
    

    if (goog.isDef(opt_duration)) {
        transition.setDuration(opt_duration);
    }

    transition.start();

        goog.events.listen(transition,'end',function() {

        if (!this.sceneStack_.length) return;
    this.sceneStack_[this.sceneStack_.length - 1].wasRemovedFromTree();
    this.sceneStack_[this.sceneStack_.length - 1].parent_ = null;
    goog.dom.removeNode(
        this.sceneStack_[this.sceneStack_.length - 1].domElement);
    this.sceneStack_.pop();
            
        },false,this);

    if(!opt_transition) {
    if (!this.sceneStack_.length) return;
    this.sceneStack_[this.sceneStack_.length - 1].wasRemovedFromTree();
    this.sceneStack_[this.sceneStack_.length - 1].parent_ = null;
    goog.dom.removeNode(
        this.sceneStack_[this.sceneStack_.length - 1].domElement);
    this.sceneStack_.pop();
    }
   

};


	var friends; // array of friends
	
	if (typeof(FB) != 'undefined' && FB != null && typeof(MyFB) != 'undefined' && MyFB != null ) {
		friends = [MyFB.friends[helloworld.Helpers.randrange(0,MyFB.friends.length-1)]];
	} else {
	   friends = [
		];
	}
	console.log(friends);
	var director = new lime.Director(document.getElementById("gamebox"),1024,768);

	var menu_scene = new helloworld.MenuScene(director, friends);
		
	director.makeMobileWebAppCapable();

	// set virus scene active
	director.replaceScene(menu_scene);

}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('helloworld.start', helloworld.start);
