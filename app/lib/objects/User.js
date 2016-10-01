var Backendless = require('vendor/backendless');
var Log = require('utils/Log');

var User = (function() {
	
	var _user = undefined;
	var _sessionId = undefined;
	
	function create(email, password, password_confirmation, first_name, last_name, is_guest, callback) {
		if (_user == undefined) {
			var user = new Backendless.User();
			user.email = email;
			user.password = password;
			user.first_name = first_name;
			user.last_name = last_name;
			user.is_guest = is_guest;
			user.points = 0;
			Backendless.UserService.register(user, new Backendless.Async(
				function (user) {
					_user = user;
					callback(_user);
				},
				function (e) {
					if (e.statusCode == 3033) {
						alert("Email address already taken");
					} else {
						Log.error('error:' + e.message + JSON.stringify(e));
					}
				})
			);
		}
		else {
			callback(_user);
		}
	};
	
	function save(user) {
		Backendless.UserService.update(user, new Backendless.Async(
			function (user) {
				_user = user;
			},
			function (e) {
				Log.error('error:' + e.message + JSON.stringify(e));
			}
		));
	}
	
	function login(email, password, callback) {
		if(_user == undefined) {
			console.log('login');
			Backendless.UserService.login(email, password, false, new Backendless.Async(
				function (user) {
					_user = user;
					Log.info('Login success');
					callback(_user);
				},
				function (e) {
					if (e.code == 3003) {
						alert("Invalid Username or password");
						Log.error('error:' + e.message + JSON.stringify(e));
					} else {
						Log.error('error:' + e.message + JSON.stringify(e));
					}
				}
			));
		} else {
			Log.info("User Logged In already");
			callback(_user);
		}
	}
	
	function logout() {
		if(_user != undefined) {
			Backendless.UserService.logout(new Backendless.Async(
				function (user) {
					_user = undefined;
				},
				function (e) {
					Log.error('error:' + e.message + JSON.stringify(e));
				}
			));
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