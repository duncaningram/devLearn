var User = require('objects/User');
var Log = require('utils/Log');

// Basic validation only
var validateEmail = /^.*\@..*$/;

$.btnSignUp.addEventListener('click', function() {
	var _email = $.txtEmail.value;
	var _password = $.txtPassword.value;
	var _password_confirm = $.txtPasswordConfirm.value;
	
	if (_password_confirm == _password && _password_confirm.length > 3) {
		if(_email.match(validateEmail)) {
			User.create(_email, _password, _password, function(languages) {
				Log.info("User Created (Hopefully)");
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