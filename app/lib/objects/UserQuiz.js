var Cloud = require('ti.cloud');
var Log = require('utils/Log');
var User = require('objects/User');

var UserQuiz = (function() {
	
	function log(quiz_id, attempt_id, is_correct, answer) {
		Cloud.Objects.create({
			classname: 'UserQuizzes',
			fields: {
				"[CUSTOM_Quizzes]quiz_id": quiz_id,
				"[CUSTOM_UserAttempts]attempt_id": attempt_id,
				is_correct: is_correct,
				answer: answer
			}
		}, function(e) {
			Log.info(JSON.stringify(e));
			if (!e.success) {
				Log.error('error: ' + JSON.stringify(e));
			}
		});
	};
	
	return {
		log: log
	};
	
})();

module.exports = UserQuiz;