var Collection = require('utils/Collection');
var Log = require('utils/Log');
var UserAttempt = require('objects/UserAttempt');
var UserQuiz = require('objects/UserQuiz');
var UserTest = require('objects/UserTest');

var parent;
var quiz;
var attempt;
var type;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	attempt = args.attempt;
	type = args.type;
	
	Log.info("Quiz controller: " + JSON.stringify(quiz));
	
	if(quiz.type == "multiple_choice") {
		display_multiple_choice();
	} else if (quiz.type == "code") {
		display_code();
	} else if (quiz.type == "order") {
		display_order();
	} else if (quiz.type == "match_code") {
		display_match_code();
	}
}

function display_multiple_choice() {
	var view = Alloy.createController('lessons/questions/multiple_choice', {parent: $, quiz: quiz, grandparent: parent});
	
	$.contentView.removeAllChildren();
	$.contentView.add(view.getView());
}

function display_code() {
	var view = Alloy.createController('lessons/questions/code', {parent: $, quiz: quiz, grandparent: parent});
	
	$.contentView.removeAllChildren();
	$.contentView.add(view.getView());
}

function display_order() {
	var view = Alloy.createController('lessons/questions/order', {parent: $, quiz: quiz, grandparent: parent});
	
	$.contentView.removeAllChildren();
	$.contentView.add(view.getView());
}

function display_match_code() {
	var view = Alloy.createController('lessons/questions/match_code', {parent: $, quiz: quiz, grandparent: parent});
	
	$.contentView.removeAllChildren();
	$.contentView.add(view.getView());
}

exports.logAnswer = function(is_correct, answer) {
	if (type == "quiz") {
		UserQuiz.log(quiz.id, attempt.id, is_correct, answer);
	} else {
		UserTest.log(quiz.id, attempt.id, is_correct, answer);	
	}
};

exports.removeLife = function() {
	attempt.lives -= 1;
	UserAttempt.save(attempt);
	parent.stats();
};

exports.addPoints = function() {
	attempt.points += quiz.points;
	UserAttempt.save(attempt);
	parent.stats();
};

exports.showCorrectIncorrect = function(correct) {
	var image;
	if(correct) {
		image = '/images/green_check_large.png';
	} else {
		image = '/images/red_cross_large.png';
	}
	
	var view = Titanium.UI.createView({
			borderRadius:8,
			backgroundColor: '#585858',
			opacity: .5,
			layout: 'verticle',
			width: '400px',
			height: '400px'
	});
	
	//TODO need a better center method.
	Log.info("isTablet " + parent.isTablet());
	if(parent.isTablet()) {
		view.setTop(400);
	} else {
		view.setTop(200);
	}
	
	var imageView = Titanium.UI.createImageView({
		image: image,
		opacity: 1
	});
	
	view.add(imageView);
	parent.content.add(view);
	
};

init(arguments[0] || {});