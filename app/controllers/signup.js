var User = require('objects/User');
var Log = require('utils/Log');

var args = arguments[0] || {};
var parent = args.parent;

// Basic validation only
var validateEmail = /^.*\@..*$/;

$.btnSignUp.addEventListener('click', function() {
	var _email = $.txtEmail.value;
	var _password = $.txtPassword.value;
	var _password_confirm = $.txtPasswordConfirm.value;
	
	if (_password_confirm == _password && _password_confirm.length > 3) {
		if(_email.match(validateEmail)) {
			User.create(_email, _password, _password, function(user) {
				if(user != undefined) {
					Ti.App.Properties.setString('email', _email);
					Ti.App.Properties.setString('password', _password);
					
					Alloy.createController('navigation/language').getView().open();	
					parent.getView().close();
					$.getView().close();
				} else {
					
				}
		});
		} else {
			// Email is not valid
			//TODO toss some kind of error
			Log.info("Invalid Email");
		}
	} else {
		// Passwords don't match or less then 4 characters
		//TODO toss some kind of error
		Log.info("Passwords don't match or no password entered");
	}
});