var Cloud = require('ti.cloud');
var Log = require('utils/Log');
var User = require('objects/User');

var UserTest = (function() {
	
	function log(test_id, attempt_id, is_correct, answer) {
		Cloud.Objects.create({
			classname: 'UserTests',
			fields: {
				"[CUSTOM_Tests]test_id": test_id,
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

module.exports = UserTest;