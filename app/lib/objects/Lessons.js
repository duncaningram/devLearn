var Backendless = require('vendor/backendless');
var Log = require('utils/Log');

var Lessons = (function() {
	
	var _lessons = {};
	
	function Lesson(args) {
		args = args || {};
	}
	
	function getLessons(language_id, callback) {
		if (_lessons[language_id] === undefined) {
			var query = new Backendless.DataQuery();
			query.condition = "Language[lessons].objectId='" + language_id + "'";
			query.options = {
				sortBy: "order asc"
			};
			Backendless.Persistence.of(Lesson).find(query, new Backendless.Async(
				function (collection) {
					_lessons[language_id] = collection.data;
					callback(_lessons[language_id]);
				},
				function (e) {
					Log.error('error: ' + JSON.stringify(e));
				}
			));
		}
		else {
			callback(_lessons[language_id]);
		}
	};
	
	return {
		getLessons: getLessons
	};
	
})();

module.exports = Lessons;
