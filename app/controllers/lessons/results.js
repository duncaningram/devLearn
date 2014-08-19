var Log = require('utils/Log');
var User = require('objects/User');

var _parent;
var _attempt;

function init(args) {
	_parent = args.parent;
	_attempt = args.attempt;
	
	$.grade.setText(getLetterGrade(_attempt.grade));
	
	_parent.btnContinue.addEventListener("click", cancel);
}

function getLetterGrade(grade) {
	if (grade >= 95) {
		return "A+";
	}
	if (grade >= 89.50) {
		return "A";
	} else if (grade >= 79.50) {
		return "B";
	} else {
		return "C";
	}
}

function cancel(e) {
	_parent.window.close();
}

init(arguments[0] || {});