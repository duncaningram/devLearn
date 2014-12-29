var Event = require('utils/Event');
var Grade = require('utils/Grade');
var Log = require('utils/Log');

var _parent;
var _attempt;
var _user;

function init(args) {
	_parent = args.parent;
	_attempt = args.attempt;
	_user = args.user;
	
	$.grade.setText(Grade.getLetterGrade(_attempt.grade));
	$.points.setText(String.format(L('lesson_results_points'), _user.custom_fields.points.toString()));
	
	Event.addEventListener(_parent.btnContinue, "click", cancel);
}

function cancel(e) {
	_parent.window.close();
}

init(arguments[0] || {});