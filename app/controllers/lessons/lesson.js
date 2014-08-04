var Log = require('utils/Log');
var Quizzes = require('objects/Quizzes');
var Tests = require('objects/Tests');
var Tutorials = require('objects/Tutorials');
var UserAttempt = require('objects/UserAttempt');

var _attempt;
var _lesson;
var _tests;
var _tutorials;
var _view;

function display_tutorial(tutorial) {
	_view = Alloy.createController('lessons/tutorial', {parent: $, tutorial: tutorial});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	
	$.btnContinue.addEventListener('click', advance);
}

function display_quiz(quiz) {
	_view = Alloy.createController('lessons/quiz', {parent: $, quiz: quiz});
	
	$.content.removeAllChildren();
	$.content.add(_view.getView());
	
	$.btnContinue.removeEventListener('click', advance);
	//TODO: Add event listener to check if the quiz is correct.
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
	
	//TODO: Code logic to resume a lesson in progress.
}

function advance() {
	if (_attempt.lives > 0) {
		if (_attempt.progress.flow == "tutorials") {
			_attempt.progress.flow = "quizzes";
			Quizzes.getQuiz(_tutorials[_attempt.progress.position].id, display_quiz);
		} else if (_attempt.progress.flow == "quizzes" && _attempt.progress.position + 1 < _tutorials.length) {
			if (_attempt.progress.position + 1 < _tutorials.length) {
				_attempt.progress.flow = "tutorials";
				_attempt.progress.position = _attempt.progress.position + 1;
				display_tutorial(_tutorials[_attempt.progress.position]);
			} else {
				_attempt.progress.flow = "tests";
				_attempt.progress.position = 0;
				display_test(_tests[_attempt.progress.position]);
			}
		} else if (_attempt.progress.flow == "tests") {
			if (_attempt.progress.position + 1 < _tests.length) {
				_attempt.progress.position = _attempt.progress.position + 1;
				display_test(_tests[_attempt.progress.position]);
			} else {
				_attempt.progress.flow = "results";
				_attempt.progress.position = 0;
				display_results();
			}
		}
		
		UserAttempt.save(_attempt);
	} else {
		//TODO: Display out of lives page.
	}
}

function preload_tutorials_complete(tutorials) {
	_tutorials = tutorials;
	
	Tests.getTests(_lesson.id, preload_tests_complete);
}

function preload_tests_complete(tests) {
	_tests = tests;
	
	preload_complete();
}

function preload_complete() {
	//TODO: Check if we are starting a new lesson or loading an existing one.
	UserAttempt.create(_lesson.id, start);
}

function init(args) {
	_lesson = args.lesson;
	
	$.txtLessonTitleBar.setText(_lesson['[CUSTOM_Languages]language_id'][0]['name'] + ": " + _lesson.name);
	
	Tutorials.getTutorials(_lesson.id, preload_tutorials_complete);
}

init(arguments[0] || {});
