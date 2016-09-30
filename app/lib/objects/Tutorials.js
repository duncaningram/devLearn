var Backendless = require('vendor/backendless');
var Log = require('utils/Log');

var Tutorials = (function() {
	
	var _tutorials = {};
	
	function Tutorial(args) {
		args = args || {};
	}
	
	function getTutorials(lesson_id, callback) {
		if (_tutorials[lesson_id] === undefined) {
			var query = new Backendless.DataQuery();
			query.condition = "Lesson[tutorial].objectId='" + lesson_id + "'";
			query.options = {
				sortBy: "order asc"
			};
			console.log(lesson_id);
			Backendless.Persistance.of(Tutorial).find(query, new Backendless.Async(
				function (collection) {
					console.log(collection);
					_tutorials[lesson_id] = collection.data;
					callback(_tutorial[lesson_id]);
				},
				function (e) {
					Log.error('error: ' + JSON.stringify(e));
				}
			));
		}
		else {
			callback(_tutorials[lesson_id]);
		}
	};
	
	function getTutorial(lesson_id, index, callback) {
		if (_tutorials[lesson_id] === undefined) {
			Cloud.Objects.query({
				classname: 'Tutorials',
				where: {
					"[CUSTOM_Lessons]lesson_id": lesson_id,
				},
				order: 'order'
			}, function (e) {
				if (e.success) {
					_tutorials[lesson_id] = e.Tutorials;
				} else {
					Log.error('error: ' + JSON.stringify(e));	
				}
				
				callback(_tutorials[lesson_id][index]);
			});
		}
		else {
			callback(_tutorials[lesson_id][index]);
		}
	}
	
	return {
		getTutorials: getTutorials,
		getTutorial: getTutorial
	};
	
})();

module.exports = Tutorials;
