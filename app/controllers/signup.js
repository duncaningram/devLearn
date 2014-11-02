var User = require('objects/User');
var Log = require('utils/Log');
var Random = require('utils/Random');
var Window = require('utils/Window');

var args = arguments[0] || {};
var parent = args.parent;

// Basic validation only
var validateEmail = /^.*\@..*$/;
var randomPasswordLength = 8;

$.btnSignUp.addEventListener('click', function() {
	var _email = $.txtEmail.value;
	var _password = $.txtPassword.value;
	var _password_confirm = $.txtPasswordConfirm.value;
	var _first_name = $.txtFname.value;
	var _last_name = $.txtLname.value;
	
	if (_password_confirm == _password && _password_confirm.length > 3) {
		if(_email.match(validateEmail)) {
			signup(_email, _password, _first_name, _last_name, false);
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

$.btnGuest.addEventListener('click', function() {
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['OK', 'Cancel'],
		message: 'If you skip signing up, your progress will not be saved.',
		title: 'Warning!'
	});
	
	dialog.addEventListener('click', function(e) {
		if (e.index !== e.source.cancel) {
			signup(Ti.Platform.createUUID() + "@guest.invalid", Random.string(randomPasswordLength), "Guest", "Guest", true);
		} 
	});
	
	dialog.show();
});

function signup(_email, _password, _first_name, _last_name, is_guest) {
	User.create(_email, _password, _password, _first_name, _last_name, is_guest, function(user) {
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
}
