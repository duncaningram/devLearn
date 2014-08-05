var Collection = require('utils/Collection');
var Log = require('utils/Log');
var UserAttempt = require('objects/UserAttempt');
var UserQuiz = require('objects/UserQuiz');


var parent;
var quiz;
var attempt;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	attempt = args.attempt;
	
	Log.info("Quiz controller: " + JSON.stringify(quiz));
	
	if(quiz.type == "multiple_choice") {
		display_multiple_choice();
	}	
}

function display_multiple_choice() {
	var view = Alloy.createController('lessons/questions/multiple_choice', {parent: $, quiz: quiz, grandparent: parent});
	
	$.contentView.removeAllChildren();
	$.contentView.add(view.getView());
}

exports.logAnswer = function(is_correct, answer) {
	UserQuiz.log(quiz.id, attempt.id, is_correct, answer);
};

exports.removeLife = function() {
	attempt.lives -= 1;
	UserAttempt.save(attempt);
};

exports.addPoints = function() {
	attempt.points += quiz.points;
	UserAttempt.save(attempt);
};
init(arguments[0] || {});