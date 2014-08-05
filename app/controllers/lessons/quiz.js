var Collection = require('utils/Collection');
var Log = require('utils/Log');

var parent;
var quiz;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	Log.info("Quiz controller: " + JSON.stringify(quiz));
	
	if(quiz.type == "multiple_choice") {
		display_multiple_choice();
	}	
}

function display_multiple_choice() {
	_view = Alloy.createController('lessons/questions/multiple_choice', {parent: $, quiz: quiz, grandparent: parent});
	
	// No idea why this doesn't work
	//$.contentView.removeAllChildren();
	//$.contentView.add(_view);
}

init(arguments[0] || {});