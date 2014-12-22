var Device = require('utils/Device');
var User = require('objects/User');
var Log = require('utils/Log');
var Window = require('utils/Window');

var args = arguments[0] || {};
var parent = args.parent;

// Basic validation only
var validateEmail = /^.*\@..*$/;

$.btnSignIn.addEventListener('click', function() {
	var _email = $.txtEmail.value;
	var _password = $.txtPassword.value;

	if(_email.match(validateEmail)) {
		User.login(_email, _password, function(user) {
			if(user != undefined) {
				Ti.App.Properties.setString('email', _email);
				Ti.App.Properties.setString('password', _password);
				
				var view = Alloy.createController('navigation/language').getView();
				Window.open(view);
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
});

if (Device.isIOS()) {
	$.btnCancel.addEventListener('click', function() {
		$.getView().close();
	});
}
