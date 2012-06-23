goog.provide('helloworld.MenuScene');


goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');
goog.require('helloworld.VirusScene');
goog.require('helloworld.PauseScene');
goog.require('helloworld.RunScene');
goog.require('helloworld.ImpulsScene');
goog.require('helloworld.IntroScene');
goog.require('lime.transitions.SlideInRight');
goog.require('helloworld.BeforeScene');

goog.require('helloworld.ImpulsSceneTest');


helloworld.MenuScene= function(director,friends) {
	lime.Scene.call(this);
	var game1 = new lime.RoundedRect().setFill('#0f0').setSize(500,100).setRadius(10).setAnchorPoint(0,0)
	.setPosition(200,100);
	var text1 = new lime.Label().setText('Game 1').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(26).setFontWeight('bold').setSize(150,30).setAnchorPoint(0,0)
	.setPosition(370,140);

	var game2 = new lime.RoundedRect().setFill('#0f0').setSize(500,100).setRadius(10).setAnchorPoint(0,0)
	.setPosition(200,250);

	var text2 = new lime.Label().setText('Game 2').setFontFamily('Verdana').
    setFontColor('#fff').setFontSize(26).setFontWeight('bold').setSize(150,30).setAnchorPoint(0,0)
	.setPosition(370,290);
	
	// var game3 = new lime.RoundedRect().setFill('#0f0').setSize(500,100).setRadius(10).setAnchorPoint(0,0)
	// .setPosition(200,400);
	// var text3 = new lime.Label().setText('Game 3').setFontFamily('Verdana').
 //    setFontColor('#fff').setFontSize(26).setFontWeight('bold').setSize(150,30).setAnchorPoint(0,0)
	// .setPosition(370,440);

	function createGameButton(text) {
		var game = new lime.RoundedRect().setSize(695,142).setRadius(30).setAnchorPoint(0,0);
		
	    return game;
	};

	var bg = new lime.Sprite().setFill("assets/menu.jpg").setPosition(0,0).setSize(1024,768).setAnchorPoint(0,0);
	this.appendChild(bg);

	var game1 = createGameButton("Fight with viruses!").setPosition(162,398);
	var game2 = createGameButton("Chase the data").setPosition(162,568);
	this.appendChild(game1);
	this.appendChild(game2);
	// this.appendChild(game3);
	// this.appendChild(text3);

	if (typeof(FB) != 'undefined' && FB!=null && (typeof(MyFB) == 'undefined' || MyFB==null)) {
		// Nie mamy polaczenia z FB
		var facebookButton = new lime.RoundedRect().setFill("assets/fb.png").setSize(351,45).setRadius(2).setAnchorPoint(0,0).
			setPosition(650,20);
		this.appendChild(facebookButton);

		goog.events.listen(facebookButton, ['mousedown', 'touchstart'], function(e) {
			window.location = "auth/facebook";
		});
	};

	goog.events.listen(game1, ['mousedown', 'touchstart'], function(e) {
		var virusTexts = [];

		virusTexts[0] = "As you know, Internet is great place for everybody. Unfortunately there are many people who use Internet in order to harm others. As in real world, they want to destroy or steal things we have.";

		virusTexts[1] = "The Internet is quite different when it comes to doing bad things. One can steal your property without even getting out of home. If you don't understand basic principles of Internet safety you can easily become a victim of a crime!";

		virusTexts[2] = "Here it comes. Evil people creates application which are able to get in to your computer and destroy your ones or steal everything which is stored on your computer. Those applications are named `malware` (malicious software).";

		virusTexts[3] = "There are plenty kinds of malware. The most recognizable ones are viruses. If they manage to get inside your computer they can damage many files and applications.";

		virusTexts[4] = "You should secure your computer against them using special application called simply anti-virus. It works like a guardian investigating every single file inside your PC and remove it.";

		virusTexts[5] = "Unfortunately your friend "+ (friends[0] ? friends[0].name+" " : "") +"hadn't known about that and he didn't have anti-virus on his computer when some viruses prepared massive attack on his computer.";

		virusTexts[6] =  "You are the only one who can save his computer. He can lost all his photos, music and favourite games, so turn into anti-virus hero called Protector and do your best!";
		
		virusTexts[7] = new lime.Sprite().setFill("assets/controls1.png").setSize(400,300);
		var virus_scene = new helloworld.BeforeScene(director,friends,helloworld.VirusScene,helloworld.MenuScene,virusTexts);
		director.replaceScene(virus_scene,lime.transitions.SlideInRight,2);
	});

	goog.events.listen(game2, ['mousedown', 'touchstart'], function(e) {
		var impulseTexts=new Array();

		impulseTexts[0]="The Internet is full of various data posted by people. Each time when you post something you have to remember that everything you send stays in the Internet forever.";

		impulseTexts[1]="Each acciedentally posted material can cause problems, so as you see is often good to consult with adults wheather or not publish something on your profile.";

		impulseTexts[2]="Before publishing any data you should think about your privacy and safety. Never publish sensitive data such as home address without consulting it with adults.";

		impulseTexts[3]="There are a lot of places in the Internet where publishing sensitive information could be real danger.";

		impulseTexts[4]="Sending your personal information to a stranger can make you endangered not only in virtual but even in real life.";

		impulseTexts[5]="There is an important task for you. Your friend was just posting his holiday photos but something went wrong...";

		impulseTexts[6]="Wrong photos has been sent an he cant do anything with it! He really doesn't want to publish and you are his only hope. We have to help him!";

		impulseTexts[7]="Lets try to chase his data and prevent it from being published! You have to stay as close to the impulse as possible. Dont let it go!";

		impulseTexts[8]="Control your way with arrow keys. You can change views by pressing V key. Try to keep close as long as possible. Good luck!";

		impulseTexts[9] = new lime.Sprite().setFill("assets/controls2.png").setSize(400,300);
		var impuls_scene = new helloworld.BeforeScene(director,friends,helloworld.ImpulsScene,helloworld.MenuScene,impulseTexts);
		director.replaceScene(impuls_scene,lime.transitions.SlideInRight,2);
	});



};

goog.inherits(helloworld.MenuScene, lime.Scene);
