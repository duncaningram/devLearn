var Cloud = require('ti.cloud');
var Log = require('utils/Log');

var User = (function() {
	
	var _user = undefined;
	var _sessionId = undefined;
	
	function create(email, password, password_confirmation, first_name, last_name, callback) {
		if (_user == undefined) {
			Cloud.Users.create({
				email: email,
				username: email,
				password: password,
				password_confirmation: password_confirmation,
				first_name: first_name,
				last_name: last_name,
				custom_fields: {
					points: 0
				}
			}, function (e) {
				if (e.success) {
					_user = e.users[0];
				} else {
					//TODO error callback
					Log.error('error: ' + JSON.stringify(e));	
				}
				
				callback(_user);
			});
		}
		else {
			callback(_user);
		}
	};
	
	function save(user) {
		Cloud.Users.update({
			custom_fields: {
				points: user.custom_fields.points
			}
		}, function (e) {
			if (e.success) {
				_user = e.users[0];
			} else {
				Log.error('error: ' + JSON.stringify(e));
			}
		});
	}
	
	function login(email, password, callback) {
		if(_user == undefined) {
			Cloud.Users.login({
				login: email,
				password: password
			}, function (e) {
				if (e.success) {
					_user = e.users[0];
					_sessionId = Cloud.sessionId;
					Log.info('Login success');
					//alert('Success');
				} else if(e.code == 401) {
					alert("Invalid Username or password");
					Log.error('error:' + e.message + JSON.stringify(e));
				} else {
					alert("Failed to login");
					Log.error('error:' + e.message + JSON.stringify(e));
				}
				
				callback(_user);
			});
		} else {
			Log.info("User Logged In already");
			callback(_user);
		}
	}
	
	function logout() {
		if(_user != undefined) {
			Cloud.Users.logout(function (e) {
				if(e.success) {
					_user = undefined;
				} else {
					alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		} else {
			Log.info("User Already Logged out");
		}
	}
	
	function isLoggedIn() {
		return (_user == undefined ? false : true);
		
	}
	
	function getUser() {
		return _user;
	};
	
	return {
		create: create, 
		save: save,
		getUser: getUser,
		login: login,
		logout: logout,
		isLoggedIn: isLoggedIn,
	};
	
})();

module.exports = User;