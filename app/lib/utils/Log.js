var instance = null;

var getInstance = function() {
	if (instance == null) {
		instance = new Log();
	}
	return instance;
};

function Log() {
	
	var trace = function(message) {
		Ti.API.trace(message);
	};
	
	var debug = function(message) {
		Ti.API.debug(message);
	};
	
	var info = function(message) {
		Ti.API.info(message);
	};
	
	var warning = function(message) {
		Ti.API.warn(message);
	};
	
	var error = function(message) {
		Ti.API.error(message);
	};
	
	return {
		trace: trace,
		debug: debug,
		info: info,
		warning: warning,
		error: error
	};
	
}

exports.getInstance = getInstance;