var Log = require('utils/Log');
var Tutorials = require('objects/Tutorials');
var Quizzes = require('objects/Quizzes');

function display_tutorial(tutorial) {
	Log.info(JSON.stringify(tutorial));
	Log.info(tutorial.description);
	Quizzes.getQuiz(tutorial.id, display_quiz);
}

function display_quiz(quiz) {
	Log.info(quiz.question);
}

function init(args) {
	lesson = args.lesson;
	
	//TODO: Probably pass in the 0 as part of the argument so that you can call this page over and over.  Will probably need to be part of the UserSave progress.
	//Also right now our flow consists of only tutorial pages, but our real flow will have tutorials, tests, review, and information pages.
	Tutorials.getTutorial(lesson.id, 0, display_tutorial);
}

init(arguments[0] || {});
