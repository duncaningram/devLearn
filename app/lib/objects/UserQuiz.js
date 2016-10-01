var Backendless = require('vendor/backendless');
var Log = require('utils/Log');
var User = require('objects/User');

var UserQuiz = (function() {
	
	function UserQuiz(args) {
		args = args || {};
		this.___class = 'UserQuiz';
		this.owner = args.owner || User.getUser();
		this.quiz = args.quiz || {};
		this.attempt = args.attempt || {};
		this.is_correct = args.is_correct || false;
		this.answer = args.answer || '';
	}
	
	function log(quiz, attempt, is_correct, answer) {
		var attempt = new UserQuiz({
			quiz: quiz,
			attempt: attempt,
			is_correct: is_correct,
			answer: answer
		});
		
		Backendless.Persistence.of(UserQuiz).save(attempt, new Backendless.Async(
			function (obj) {
				
			},
			function (e) {
				Log.error('error: ' + JSON.stringify(e));
			}
		));
	};
	
	return {
		log: log
	};
	
})();

module.exports = UserQuiz;