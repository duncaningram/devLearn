var Log = require('utils/Log');
var User = require('objects/User');

var _parent;
var _attempt;
var _user;

function init(args) {
	_parent = args.parent;
	_attempt = args.attempt;
	_user = args.user;
		
	_parent.btnContinue.visible = false;
	
	$.btnCancel.addEventListener("click", cancel);
	$.btnRetry.addEventListener("click", retry);
}

function cancel(e) {
	_parent.window.close();
}

function retry(e) {
	_user.points -= _attempt.points;
	User.save(_user);
	
	_parent.restart();
}

init(arguments[0] || {});