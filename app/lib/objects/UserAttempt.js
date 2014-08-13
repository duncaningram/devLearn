var Cloud = require('ti.cloud');
var Log = require('utils/Log');
var User = require('objects/User');

var UserAttempt = (function() {
	
	var _attempt = {};
	
	function create(lesson_id, callback) {
		_attempt = {};
		
		Cloud.Objects.query({
			classname: "UserAttempts",
			where: {
				"[CUSTOM_Lessons]lesson_id": lesson_id,
				is_active: true,
				user_id: User.getUser().id
			},
		}, function (e) {
			if (e.success) {
				for (var i = 0; i < e.UserAttempts.length; i++) {
					Cloud.Objects.update({
						id: e.UserAttempts[i].id,
						classname: "UserAttempts",
						fields: {
							is_active: false
						}
					}, function (e) {
						if (!e.success) {
							Log.error('error: ' + JSON.stringify(e));
						}
					});
				}
			}
			
			Cloud.Objects.create({
				classname: 'UserAttempts',
				fields: {
					"[CUSTOM_Lessons]lesson_id": lesson_id,
					lives: 3,
					points: 0,
					progress: {
						flow: "tutorials",
						position: 0
					},
					is_active: true,
					is_completed: false
				}
			}, function (e) {
				if (e.success) {
					_attempt = e.UserAttempts[0];	
				} else {
					Log.error('error: ' + JSON.stringify(e));
				}
				
				callback(_attempt);
			});
		});
	};
	
	function load(callback) {
		_attempt = {};
		
		Cloud.Objects.query({
			classname: "UserAttempts",
			where: {
				is_active: true,
				user_id: User.getUser().id
			},
		}, function (e) {
			if (e.success) {
				_attempt = e.UserAttempts[0];
			}
			
			callback(_attempt);
		});
	}
	
	function save(attempt) {
		Cloud.Objects.update({
			id: attempt.id,
			classname: "UserAttempts",
			fields: {
				lives: attempt.lives,
				points: attempt.points,
				progress: {
					flow: attempt.progress.flow,
					position: attempt.progress.position
				},
				is_active: attempt.is_active,
				is_completed: attempt.is_completed
			}
		}, function (e) {
			if (!e.success) {
				Log.error('error: ' + JSON.stringify(e));
			}
		});
	}
	
	return {
		create: create,
		load: load,
		save: save
	};
	
})();

module.exports = UserAttempt;
