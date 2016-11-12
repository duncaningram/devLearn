var Backendless = require('vendor/backendless');
var Collection = require('utils/Collection');
var Log = require('utils/Log');

var Tests = (function() {
	
	var _tests = {};
	
	function Test(args) {
		args = args || {};
	}
	
	function getTests(lesson_id, callback) {
		if (_tests[lesson_id] === undefined) {
			var query = new Backendless.DataQuery();
			query.condition = "Lesson[tests].objectId='" + lesson_id + "'";
			Backendless.Persistence.of(Test).find(query, new Backendless.Async(
				function (collection) {
					_tests[lesson_id] = Collection.shuffle(collection.data);
					callback(_tests[lesson_id]);
				},
				function (e) {
					Log.error('error: ' + JSON.stringify(e));
				}
			));
		}
		else {
			callback(_tests[lesson_id]);
		}
	};
	
	function getTest(lesson_id, index, callback) {
		if (_tests[lesson_id] === undefined) {
			var query = new Backendless.DataQuery();
			query.condition = "Lesson[tests].objectId='" + lesson_id + "'";
			Backendless.Persistence.of(Test).find(query, new Backendless.Async(
				function (collection) {
					_tests[lesson_id] = Collection.shuffle(collection.data);
					callback(_tests[lesson_id][index]);
				},
				function (e) {
					Log.error('error: ' + JSON.stringify(e));
				}
			));
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
