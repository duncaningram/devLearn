var Log = (function() {
	
	function trace(message) {
		Ti.API.trace(message);
	};
	
	function debug(message) {
		Ti.API.debug(message);
	};
	
	function info(message) {
		Ti.API.info(message);
	};
	
	function warn(message) {
		Ti.API.warn(message);
	};
	
	function error(message) {
		Ti.API.error(message);
	};
	
	return {
		trace: trace,
		debug: debug,
		info: info,
		warn: warn,
		error: error
	};
	
})();

module.exports = Log;