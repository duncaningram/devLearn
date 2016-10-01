var Backendless = require('vendor/backendless');
var Log = require('utils/Log');
var User = require('objects/User');

var UserTest = (function() {
	
	function UserTest(args) {
		args = args || {};
		this.___class = 'UserTest';
		this.owner = args.owner || User.getUser();
		this.test = args.test || {};
		this.attempt = args.attempt || {};
		this.is_correct = args.is_correct || false;
		this.answer = args.answer || '';
	}
	
	function log(test, attempt, is_correct, answer) {
		var attempt = new UserTest({
			test: test,
			attempt: attempt,
			is_correct: is_correct,
			answer: answer
		});
		
		Backendless.Persistence.of(UserTest).save(attempt, new Backendless.Async(
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

module.exports = UserTest;