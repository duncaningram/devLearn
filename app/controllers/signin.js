var User = require('objects/User');
var Log = require('utils/Log');

var args = arguments[0] || {};
var parent = args.parent;

// Basic validation only
var validateEmail = /^.*\@..*$/;

$.btnSignIn.addEventListener('click', function() {
	var _email = $.txtEmail.value;
	var _password = $.txtPassword.value;

	if (_password.length > 3) {
		if(_email.match(validateEmail)) {
			User.login(_email, _password, function(user) {
				if(user != undefined) {
					Ti.App.Properties.setString('email', _email);
					Ti.App.Properties.setString('password', _password);

					Alloy.createController('navigation/language').getView().open();	
					parent.getView().close();
					$.getView().close();
				} else {
					// User Signin unsuccessful
					//TODO Code some kind of error
				}
			});
		} else {
			// Email is not valid
			alert("Email is not valid");
			Log.info("Invalid Email");
		}
	} else {
		alert("Password length must be greater then 4 characters");
		Log.info("Password is not long enough");
	}
});