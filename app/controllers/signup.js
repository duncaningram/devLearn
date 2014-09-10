var User = require('objects/User');
var Log = require('utils/Log');
var Window = require('utils/Window');

var args = arguments[0] || {};
var parent = args.parent;

// Basic validation only
var validateEmail = /^.*\@..*$/;

$.btnSignUp.addEventListener('click', function() {
	var _email = $.txtEmail.value;
	var _password = $.txtPassword.value;
	var _password_confirm = $.txtPasswordConfirm.value;
	var _first_name = $.txtFname.value;
	var _last_name = $.txtLname.value;
	
	if (_password_confirm == _password && _password_confirm.length > 3) {
		if(_email.match(validateEmail)) {
			User.create(_email, _password, _password, _first_name, _last_name, function(user) {
				if(user != undefined) {
					Ti.App.Properties.setString('email', _email);
					Ti.App.Properties.setString('password', _password);
					
					var view = Alloy.createController('navigation/language').getView();
					Window.open(view);	
					parent.getView().close();
					$.getView().close();
				} else {
					
				}
		});
		} else {
			// Email is not valid
			alert("Email is not valid");
			Log.info("Invalid Email");
		}
	} else {
		// Passwords don't match or less then 4 characters
		alert("Passwords entered do not match");
		Log.info("Passwords don't match or no password entered");
	}
});