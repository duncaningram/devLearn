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
			var view = Alloy.createController('navigation/language').getView();
			Window.open(view);
		} else {
			Alloy.createController('signin', {
				parent: $
			}).getView().open();
		}
	});
}