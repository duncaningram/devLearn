var Log = require('utils/Log');
var Quizzes = require('objects/Quizzes');
var Tests = require('objects/Tests');
var Tutorials = require('objects/Tutorials');
var User = require('objects/User');
var UserAttempt = require('objects/UserAttempt');

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
	
	$.btnContinue.removeEventListener('click', $.advance);
	$.btnContinue.addEventListener('click', $.advance);
}

function display_quiz(quiz) {
	_view = Alloy.createController('lessons/quiz', {parent: $, quiz: quiz, attempt: _attempt});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	
	$.btnContinue.removeEventListener('click', $.advance);
}

function display_test(test) {
	Log.info(test.question);
}

function display_results() {
	Log.info("load results page");
}

function start(attempt) {
	_attempt = attempt;
	
	display_tutorial(_tutorials[0]);
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
			display_test(_test[_attempts.progress.position]);
			break;
		case "results":
			display_results();
			break;
		default:
			Log.info("Invalid flow: " + _attempt.progress.flow);
	}
}

exports.advance = function() {
	if (_attempt.lives > 0) {
		if (_attempt.progress.flow == "tutorials") {
			_attempt.progress.flow = "quizzes";
		} else if (_attempt.progress.flow == "quizzes" && _attempt.progress.position + 1 < _tutorials.length) {
			if (_attempt.progress.position + 1 < _tutorials.length) {
				_attempt.progress.flow = "tutorials";
				_attempt.progress.position = _attempt.progress.position + 1;
			} else {
				_attempt.progress.flow = "tests";
				_attempt.progress.position = 0;
			}
		} else if (_attempt.progress.flow == "tests") {
			if (_attempt.progress.position + 1 < _tests.length) {
				_attempt.progress.position = _attempt.progress.position + 1;
			} else {
				_attempt.progress.flow = "results";
				_attempt.progress.position = 0;
				_attempt.is_active = false;
				_attempt.is_completed = true;
				_user.custom_fields.points += _attempt.points;
				User.save(_user);
			}
		}
		
		UserAttempt.save(_attempt);
		load(_attempt);
	} else {
		//TODO: Display out of lives page.
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
	//TODO: Check if we are starting a new lesson or loading an existing one.  Also, if it is load and flow is quizzes change flow to tutorials.
	UserAttempt.create(_lesson.id, start);
}

function init(args) {
	_lesson = args.lesson;
	
	$.txtLessonTitleBar.setText(_lesson['[CUSTOM_Languages]language_id'][0]['name'] + ": " + _lesson.name);
	
	Tutorials.getTutorials(_lesson.id, preload_tutorials_complete);
}

init(arguments[0] || {});
