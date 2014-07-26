var Cloud = require('ti.cloud');
var Log = require('utils/Log');

var User = (function() {
	
	var _user = undefined;
	var _sessionId = undefined;
	
	function create(email, password, password_confirmation, callback) {
		if (_user == undefined) {
			Cloud.Users.create({
				email: email,
				username: email,
				password: password,
				password_confirmation: password_confirmation
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
		getUser: getUser,
		login: login,
		logout: logout,
		isLoggedIn: isLoggedIn
	};
	
})();

module.exports = User;