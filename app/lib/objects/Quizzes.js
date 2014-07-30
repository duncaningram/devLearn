var Cloud = require('ti.cloud');
var Log = require('utils/Log');

var Quizzes = (function() {
	
	var _quizzes = {};
	
	function getQuiz(tutorial_id, callback) {
		if (_quizzes[tutorial_id] === undefined) {
			Cloud.Objects.query({
				classname: 'Quizzes',
				where: {
					"[CUSTOM_Tutorials]tutorial_id": tutorial_id,
				}
			}, function (e) {
				if (e.success) {
					_quizzes[tutorial_id] = e.Quizzes;
				} else {
					Log.error('error: ' + JSON.stringify(e));	
				}
				
				callback(_quizzes[tutorial_id][Math.floor(Math.random() * _quizzes[tutorial_id].length)]);
			});
		}
		else {
			callback(_quizzes[tutorial_id][Math.floor(Math.random() * _quizzes[tutorial_id].length)]);
		}
	};
	
	return {
		getQuiz: getQuiz
	};
	
})();

module.exports = Quizzes;
