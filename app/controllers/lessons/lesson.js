var Device = require('utils/Device');
var Log = require('utils/Log');
var Quizzes = require('objects/Quizzes');
var Tests = require('objects/Tests');
var Tutorials = require('objects/Tutorials');
var User = require('objects/User');
var UserAttempt = require('objects/UserAttempt');

var MAX_TESTS = 5;

var _attempt;
var _lesson;
var _tests;
var _tutorials;
var _view;
var _user = User.getUser();

function display_tutorial(tutorial) {
	_view = Alloy.createController('lessons/tutorial', {parent: $, tutorial: tutorial});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	
	//$.btnContinue.removeEventListener('click', $.advance);
	//$.btnContinue.addEventListener('click', $.advance);
}

function display_quiz(quiz) {
	_view = Alloy.createController('lessons/quiz', {parent: $, quiz: quiz, type: "quiz", attempt: _attempt});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	
	$.btnContinue.removeEventListener('click', $.advance);
}

function display_test(test) {
	_view = Alloy.createController('lessons/quiz', {parent: $, quiz: test, type: "test", attempt: _attempt});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());	
	$.btnContinue.removeEventListener('click', $.advance);
}

function display_outoflives() {
	_view = Alloy.createController('lessons/outoflives', {parent: $});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	$.btnContinue.removeEventListener('click', $.advance);
}

function display_completed() {
	_view = Alloy.createController('lessons/completed', {parent: $, attempt: _attempt, user: _user});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	
	$.btnContinue.removeEventListener('click', $.advance);
}

function display_results() {
	_view = Alloy.createController('lessons/results', {parent: $, attempt: _attempt, user: _user});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	
	$.btnContinue.removeEventListener('click', $.advance);
}

function start(attempt) {
	_attempt = attempt;
	
	display_tutorial(_tutorials[0]);
	$.stats();
}

function check_load(attempt) {
	if (attempt === undefined) {
		UserAttempt.create(_lesson.id, start);
	} else {
		_attempt = attempt;
		
		if (_attempt.is_completed) {
			display_completed();
		}
		else if (_attempt.lives <= 0) {
			display_outoflives();
			$.stats();
		} else {
			if (_attempt.progress.flow == "quizzes") {
				_attempt.progress.flow = "tutorials";
			}
			
			load(_attempt);
		}
	}
}

function load(attempt) {
	_attempt = attempt;

	switch (_attempt.progress.flow) {
		case "tutorials":
			display_tutorial(_tutorials[_attempt.progress.position]);
			break;
		case "quizzes":
			Quizzes.getQuiz(_tutorials[_attempt.progress.position].id, display_quiz);
			break;
		case "tests":
			display_test(_tests[_attempt.progress.position]);
			break;
		case "results":
			display_results();
			break;
		default:
			Log.info("Invalid flow: " + _attempt.progress.flow);
	}
	
	$.stats();
}

exports.restart = function() {
	Tests.randomize(_lesson.id);
	UserAttempt.create(_lesson.id, start);
};

exports.advance = function() {
	$.btnContinue.removeEventListener('click', $.advance);
	
	if (_attempt.lives > 0) {
		if (_attempt.progress.flow == "tutorials") {
			_attempt.progress.flow = "quizzes";
		} else if (_attempt.progress.flow == "quizzes") {
			if (_attempt.progress.position + 1 < _tutorials.length) {
				_attempt.progress.flow = "tutorials";
				_attempt.progress.position = _attempt.progress.position + 1;
			} else {
				_attempt.progress.flow = "tests";
				_attempt.progress.position = 0;
			}
		} else if (_attempt.progress.flow == "tests") {
			if (_attempt.progress.position + 1 < _tests.length && _attempt.progress.position + 1 < MAX_TESTS) {
				_attempt.progress.position = _attempt.progress.position + 1;
			} else {
				var questions = _tutorials.length + Math.min(_tests.length, MAX_TESTS);
				_attempt.progress.flow = "results";
				_attempt.progress.position = 0;
				_attempt.is_completed = true;
				_attempt.grade = (questions - (_lesson.lives - _attempt.lives)) / questions * 100;
				_user.custom_fields.points += _attempt.points;
				User.save(_user);
			}
		}
		
		UserAttempt.save(_attempt);
		load(_attempt);
	} else {
		display_outoflives();
	}
};

exports.stats = function() {
	if (_attempt.is_completed) {
		$.txtPoints.setText(_user.custom_fields.points);
	} else {
		$.txtPoints.setText(_user.custom_fields.points + _attempt.points);
	}

	switch (_attempt.lives) {
		case 0:
			$.life1.setImage("/images/heart_loss.png");
			$.life2.setImage("/images/heart_loss.png");
			$.life3.setImage("/images/heart_loss.png");
			$.life4.setImage("/images/heart_loss.png");
			break;
		case 1:
			$.life1.setImage("/images/heart.png");
			$.life2.setImage("/images/heart_loss.png");
			$.life3.setImage("/images/heart_loss.png");
			$.life4.setImage("/images/heart_loss.png");
			break;
		case 2:
			$.life1.setImage("/images/heart.png");
			$.life2.setImage("/images/heart.png");
			$.life3.setImage("/images/heart_loss.png");
			$.life4.setImage("/images/heart_loss.png");
			break;
		case 3:
			$.life1.setImage("/images/heart.png");
			$.life2.setImage("/images/heart.png");
			$.life3.setImage("/images/heart.png");
			$.life4.setImage("/images/heart_loss.png");
			break;
		default:
			$.life1.setImage("/images/heart.png");
			$.life2.setImage("/images/heart.png");
			$.life3.setImage("/images/heart.png");
			$.life4.setImage("/images/heart.png");
			break;
	}
};

function preload_tutorials_complete(tutorials) {
	_tutorials = tutorials;
	
	Tests.getTests(_lesson.id, preload_tests_complete);
}

function preload_tests_complete(tests) {
	_tests = tests;
	
	preload_complete();
}

function preload_complete() {
	UserAttempt.load(_lesson.id, check_load);
}

function init(args) {
	_lesson = args.lesson;
	
	$.txtLessonTitleBar.setText(_lesson['[CUSTOM_Languages]language_id'][0]['name'] + ": " + _lesson.name);
	
	if (Ti.Platform.osname === "android" && !Device.isTablet()) {
		$.window.addEventListener("open", function() {
		     $.window.activity.actionBar.hide();
		});
	}
	
	
	Tutorials.getTutorials(_lesson.id, preload_tutorials_complete);
}

exports.isTablet = function() {
	
	var osname = Ti.Platform.osname,
		dpi = Ti.Platform.displayCaps.dpi,
		h = Ti.Platform.displayCaps.platformHeight / dpi,
    	w = Ti.Platform.displayCaps.platformWidth / dpi,
    	diagonalSize = Math.sqrt(w*w+h*h);
	var diag = 6.5;
	switch(osname) {
		case 'ipad':
			return true;
		break;
		default:
			return (diagonalSize >= diag) ? true : false;
	}
};

init(arguments[0] || {});
