var Log = require('utils/Log');
var Quizzes = require('objects/Quizzes');
var Tests = require('objects/Tests');
var Tutorials = require('objects/Tutorials');

var _lesson;
var _tutorial;

function display_tutorial(tutorial) {
	_tutorial = tutorial;
/*
	Log.info(JSON.stringify(tutorial));
	Log.info(JSON.stringify(tutorial['[CUSTOM_Lessons]lesson_id'][0]['name']));
	Log.info(tutorial.description);*/
	
	var tutorialView = Alloy.createController('lessons/tutorial', {parent: $, tutorial: tutorial});
	
	$.content.removeAllChildren();
	$.content.add(tutorialView.getView());
	
	//Quizzes.getQuiz(tutorial.id, display_quiz);
}

function display_quiz(quiz) {
	Log.info(quiz.question);
	var quizView = Alloy.createController('lessons/quiz', {parent: $, quiz: quiz});
	
	$.content.removeAllChildren();
	$.content.add(quizView.getView());
	
}

function display_test(test) {
	Log.info(test.question);
}

function init(args) {
	_lesson = args.lesson;
	
	$.txtLessonTitleBar.setText(_lesson['[CUSTOM_Languages]language_id'][0]['name'] + ": " + _lesson.name);
	$.btnContinue.addEventListener('click', function() {
		Quizzes.getQuiz(_tutorial.id, display_quiz);
	});
	
	//TODO: Probably pass in the 0 as part of the argument so that you can call this page over and over.  Will probably need to be part of the UserSave progress.
	//Also right now our flow consists of only tutorial pages, but our real flow will have tutorials, quizzes, tests, review, and information pages.

	Tutorials.getTutorial(_lesson.id, 0, display_tutorial);
}

init(arguments[0] || {});
