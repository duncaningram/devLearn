var Cloud = require('ti.cloud');
var Collection = require('utils/Collection');
var Log = require('utils/Log');

var Tests = (function() {
	
	var _tests = {};
	
	function getTests(lesson_id, callback) {
		if (_tests[lesson_id] === undefined) {
			Cloud.Objects.query({
				classname: 'Tests',
				where: {
					"[CUSTOM_Lessons]lesson_id": lesson_id,
				},
				order: 'order'
			}, function (e) {
				if (e.success) {
					_tests[lesson_id] = Collection.shuffle(e.Tests);
				} else {
					Log.error('error: ' + JSON.stringify(e));	
				}
				
				callback(_tests[lesson_id]);
			});
		}
		else {
			callback(_tests[lesson_id]);
		}
	};
	
	function getTest(lesson_id, index, callback) {
		if (_tests[lesson_id] === undefined) {
			Cloud.Objects.query({
				classname: 'Tests',
				where: {
					"[CUSTOM_Lessons]lesson_id": lesson_id,
				}
			}, function (e) {
				if (e.success) {
					_tests[lesson_id] = Collection.shuffle(e.Tests);
				} else {
					Log.error('error: ' + JSON.stringify(e));	
				}
				
				callback(_tests[lesson_id][index]);
			});
		}
		else {
			callback(_tests[lesson_id][index]);
		}
	};
	
	function randomize(lesson_id) {
		if (_tests[lesson_id] !== undefined) {
			_tests[lesson_id] = Collection.shuffle(_tests[lesson_id]);
		}
	}
	
	return {
		getTest: getTest,
		getTests: getTests,
		randomize: randomize
	};
	
})();

module.exports = Tests;
