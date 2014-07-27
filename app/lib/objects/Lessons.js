var Cloud = require('ti.cloud');
var Log = require('utils/Log');

var Lessons = (function() {
	
	var _lessons = {};
	
	function getLessons(language_id, callback) {
		if (_lessons[language_id] === undefined) {
			Cloud.Objects.query({
				classname: 'Lessons',
				where: {
					"[CUSTOM_Languages]language_id": language_id,
				},
				order: 'order'
			}, function (e) {
				if (e.success) {
					_lessons[language_id] = e.Lessons;
				} else {
					Log.error('error: ' + JSON.stringify(e));	
				}
				
				callback(_lessons[language_id]);
			});
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
