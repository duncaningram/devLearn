var Log = require('utils/Log');

var parent;
var quiz;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	Log.info("Quiz controller: " + JSON.stringify(quiz));
	
}

init(arguments[0] || {});