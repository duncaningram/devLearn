var Collection = require('utils/Collection');
var Device = require('utils/Device');
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

exports.breakApartAnswers = function(_correctAnswer, _answers) {
	var sortedAnswers = Array();

	while(_correctAnswer.length > 0) {
		_tempLength = _correctAnswer.length;
		_answers.forEach(function(entry) {
			if (_correctAnswer.indexOf(entry) == 0) {
				sortedAnswers.push(entry);
				_correctAnswer = _correctAnswer.slice(entry.length, _correctAnswer.length);
			}
		});
		if(_correctAnswer.length == _tempLength) {
			Log.error("Malformed Answer");
			throw 'Malformed Answer';
			break;
		}
	}
	
	return sortedAnswers;
};

exports.showCorrectIncorrect = function(correct, correctAnswers, userAnswers, vertical) {
	var image;
	if(correct) {
		image = '/images/green_check_large.png';
		
		var view = Titanium.UI.createView({
			borderRadius:8,
			backgroundColor: '#585858',
			opacity: .5,
			width: '400px',
			height: '400px'
		});
		
		//TODO need a better center method.
		Log.info("isTablet " + Device.isTablet());
		if (Device.isTablet()) {
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
		
	} else {
		if (correctAnswers === undefined) {
			image = '/images/red_cross_large.png';
		
			var view = Titanium.UI.createView({
				borderRadius:8,
				backgroundColor: '#585858',
				opacity: .5,
				width: '400px',
				height: '400px'
			});
			
			//TODO need a better center method.
			Log.info("isTablet " + Device.isTablet());
			if (Device.isTablet()) {
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
		} else {		
			var greyoutView = Titanium.UI.createView({
				backgroundColor: '#585858',
				opacity: .5,
				layout: 'vertical',
				width: '100%',
				height: '100%'
			});
			
			parent.content.add(greyoutView);
			
			var wrapper = Titanium.UI.createView({
				width: '100%', 
				height: '100%',
				layout: 'vertical'
			});
			
			var padding = Titanium.UI.createView({
				width: '100%',
				height: '5%'
			});
			
			var incorrectAnswerView = Titanium.UI.createView({
				backgroundColor: '#FFF',
				layout: 'vertical',
				width: '75%',
				height: '80%'
			});
			
			var correctLabel = Titanium.UI.createLabel({
				color: '#86C15D',
				font: {
					fontSize: 24,
					fontWeight: 'bold'
				}, 
				top: '20px',
				text: "Correct Answer"
			});
			
			var incorrectLabel = Titanium.UI.createLabel({
				color: '#FF3333',
				font: {
					fontSize: 24,
					fontWeight: 'bold'
				}, 
				top: '40px',
				text: "Your Answer"
			});
			
			var correctViewWrapper, incorrectViewWrapper;
			if(vertical) {
				var correctViewWrapper = Titanium.UI.createScrollView({
					showVerticalScrollIndicator: true,
					showHorizontalScrollIndicator: false,
					top: "10px",
					width: "90%",
					height: "37%",
					borderColor: "#86C15D",
					borderWidth: '1',
					layout: 'vertical'
				});
				
				var incorrectViewWrapper = Titanium.UI.createScrollView({
					showVerticalScrollIndicator: true,
					showHorizontalScrollIndicator: false,
					horizontalWrap: true,
					top: "10px",
					width: "90%",
					height: "37%",
					borderColor: "#FF3333",
					borderWidth: '1',
					layout: 'vertical'
				});
			} else {
				var correctViewWrapper = Titanium.UI.createView({
					top: "10px",
					width: "90%",
					height: "37%",
					borderColor: "#86C15D",
					borderWidth: '1',
					layout: 'horizontal'
				});
				
				var incorrectViewWrapper = Titanium.UI.createView({
					top: "10px",
					width: "90%",
					height: "37%",
					borderColor: "#FF3333",
					borderWidth: '1',
					layout: 'horizontal'
				});
			}
			
			
			Log.info("USER ANSWERS" + JSON.stringify(userAnswers));
			
			Log.info("Correct Answer" + JSON.stringify(correctAnswers));
			
			userAnswers.forEach(function(entry) {
				var button = Alloy.createController('lessons/questions/button');
				button.label.font = {
					fontSize: 18
				};
				button.label.setText(entry);
				button.innerPadding.setBackgroundColor("#FF3333");
				incorrectViewWrapper.add(button.getView());
			});
			
			correctAnswers.forEach(function(entry) {
				var button = Alloy.createController('lessons/questions/button');
				button.label.font = {
					fontSize: 18
				};
				button.label.setText(entry);
				button.innerPadding.setBackgroundColor("#86C15D");
				correctViewWrapper.add(button.getView());
			});
			
			incorrectAnswerView.add(correctLabel);
			incorrectAnswerView.add(correctViewWrapper);
			incorrectAnswerView.add(incorrectLabel);
			incorrectAnswerView.add(incorrectViewWrapper);
			
			
			wrapper.add(padding);
			wrapper.add(incorrectAnswerView);
			
			parent.content.add(wrapper);
		}
	}
	
};

init(arguments[0] || {});