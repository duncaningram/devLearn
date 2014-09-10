var User = require('objects/User');
var Log = require('utils/Log');
var Window = require('utils/Window');

var email = Ti.App.Properties.getString('email');
var password = Ti.App.Properties.getString('password');

Log.info("email" + email);
Log.info("password" + password);
if(email == null || password == null) {
	Alloy.createController('tutorial', {
			parent: $
		}).getView().open();
} else {
	User.login(email, password, function(user) {
		if(user != undefined) {
			Log.info("User Signed in Hopefully");
			Log.info("UserID: " + user.id);
			var view = Alloy.createController('navigation/language').getView();
			Window.open(view);
			//view.open();	
		} else {
			// Problem signing in
			//TODO code something here
			Alloy.createController('signin', {
				parent: $
			}).getView().open();
		}
	});
	
}