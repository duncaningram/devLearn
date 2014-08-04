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
	Log.info("advance");
	Quizzes.getQuiz(_tutorials[0].id, display_quiz);
	//TODO: Advance to the next page in the lesson.
	//TODO: Save user progress.
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
