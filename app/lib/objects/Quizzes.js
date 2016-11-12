var Backendless = require('vendor/backendless');
var Log = require('utils/Log');

var Quizzes = (function() {
	
	var _quizzes = {};
	
	function Quiz(args) {
		args = args || {};
	}
	
	function getQuiz(tutorial_id, callback) {
		if (_quizzes[tutorial_id] === undefined) {
			var query = new Backendless.DataQuery();
			query.condition = "Tutorial[quizzes].objectId='" + tutorial_id + "'";
			Backendless.Persistence.of(Quiz).find(query, new Backendless.Async(
				function (collection) {
					_quizzes[tutorial_id] = collection.data;
					callback(_quizzes[tutorial_id][Math.floor(Math.random() * _quizzes[tutorial_id].length)]);
				},
				function (e) {
					Log.error('error: ' + JSON.stringify(e));	
				}
			));
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
