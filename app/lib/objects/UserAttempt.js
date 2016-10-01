var Backendless = require('vendor/backendless');
var Log = require('utils/Log');
var User = require('objects/User');

var UserAttempt = (function() {
	
	var _attempt = undefined;
	
	function UserAttempt(args) {
		args = args || {};
		this.___class = 'UserAttempt';
		this.owner = args.owner || User.getUser();
		this.lesson = args.lesson || {};
		this.lives = args.lives || 4;
		this.points = args.points || 0;
		this.grade = args.grade || -1;
		this.progress_flow = args.progress_flow || "tutorials";
		this.progress_position = args.progress_position || 0;
		this.is_active = args.is_active || true;
		this.is_completed = args.is_completed || false;
	}
	
	function create(lesson, callback) {
		_attempt = undefined;
		
		var attempt = new UserAttempt({
			lesson: lesson
		});
		
		var query = new Backendless.DataQuery();
		query.condition = "lesson.objectId='" + lesson.objectId + "' and ownerId='" + User.getUser().objectId + "' and is_active=True";
		Backendless.Persistence.of(UserAttempt).find(query, new Backendless.Async(
			function (collection) {
				for (var i = 0; i < collection.data.length; i++) {
					collection.data[i].is_active = false;
					Backendless.Persistence.of(UserAttempt).save(collection.data[i], new Backendless.Async(
						function (obj) {
							
						},
						function (e) {
							Log.error('error: ' + JSON.stringify(e));
						}
					));
				}
				
				save(attempt, callback);
			},
			function (e) {
				Log.error('error: ' + JSON.stringify(e));
			}
		));
	};
	
	function load(lesson_id, callback) {
		_attempt = undefined;
		
		var query = new Backendless.DataQuery();
		query.condition = "lesson.objectId='" + lesson_id + "' and ownerId='" + User.getUser().objectId + "' and is_active=True";
		query.options = {
			relationsDepth: 1
		};
		Backendless.Persistence.of(UserAttempt).find(query, new Backendless.Async(
			function (collection) {
				if (collection.data.length > 0) {
					_attempt = collection.data[0];
				}
				callback(_attempt);
			},
			function (e) {
				Log.error('error: ' + JSON.stringify(e));
			}
		));
	}
	
	function save(attempt, callback) {
		Backendless.Persistence.of(UserAttempt).save(attempt, new Backendless.Async(
			function (obj) {
				_attempt = obj;
				
				if (callback !== undefined) {
					callback(_attempt);
				}
			},
			function (e) {
				Log.error('error: ' + JSON.stringify(e));
			}
		));
	}
	
	return {
		create: create,
		load: load,
		save: save
	};
	
})();

module.exports = UserAttempt;
