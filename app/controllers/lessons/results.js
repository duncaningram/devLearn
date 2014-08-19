var Grade = require('utils/Grade');
var Log = require('utils/Log');

var _parent;
var _attempt;

function init(args) {
	_parent = args.parent;
	_attempt = args.attempt;
	
	$.grade.setText(Grade.getLetterGrade(_attempt.grade));
	
	_parent.btnContinue.addEventListener("click", cancel);
}

function cancel(e) {
	_parent.window.close();
}

init(arguments[0] || {});