var Cloud = require('ti.cloud');
var Log = require('utils/Log');

var User = (function() {
	
	var _user = undefined;
	
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
	
	function login() {
		//TODO code me	
	}
	
	function logout() {
		//TODO code me
	}
	
	function isLoggedIn() {
		
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