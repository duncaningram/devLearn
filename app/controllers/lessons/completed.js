var Log = require('utils/Log');
var User = require('objects/User');

var _parent;
var _attempt;
var _user;

function init(args) {
	_parent = args.parent;
	_attempt = args.attempt;
	_user = args.user;
		
	setContinueButton(true);
	
	$.btnCancel.addEventListener("click", cancel);
	$.btnRetry.addEventListener("click", retry);
}

function cancel(e) {
	_parent.window.close();
}

function retry(e) {
	_user.custom_fields.points -= _attempt.points;
	User.save(_user);
	
	_parent.restart();
	setContinueButton(false);
}

function setContinueButton(disabled) {
	if (disabled) {
		_parent.btnContinue.visible = false;
	} else {
		_parent.btnContinue.visible = true;
		_parent.btnContinue.addEventListener('click', _parent.advance);
	}
}

init(arguments[0] || {});