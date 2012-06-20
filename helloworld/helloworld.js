//set provided namespace
goog.provide('helloworld');

//get requirements
goog.require('lime.Director');
goog.require('helloworld.MenuScene');


// entrypoint
helloworld.start = function(){
	var friends; // array of friends
	
	if (typeof(FB) != 'undefined' && FB != null && typeof(MyFB) != 'undefined' && MyFB != null ) {
		alert('Wygląda na to, że masz połączenie z FB! Czy jeden z Twoich znajomych to '+MyFB.friends[0]['name']+'?');
		friends = MyFB.friends;
	} else {
	   friends = [
			{'name':'Jan Kowalski'}
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
