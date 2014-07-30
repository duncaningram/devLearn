var Cloud = require('ti.cloud');
var Log = require('utils/Log');

var Tutorials = (function() {
	
	var _tutorials = {};
	
	function getTutorials(lesson_id, callback) {
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
				
				callback(_tutorials[lesson_id]);
			});
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
