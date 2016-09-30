var Backendless = require('vendor/backendless');
var Log = require('utils/Log');

var Languages = (function() {
	
	var _languages = new Array();
	
	function Language(args) {
		args = args || {};
	}
	
	function getLanguages(callback) {
		var query = new Backendless.DataQuery();
		query.options = {
			sortBy: "order asc"
		};
		Backendless.Persistence.of(Language).find(query, new Backendless.Async(
			function (collection) {
				_languages = collection.data;
				callback(_languages);
			},
			function (e) {
				Log.error('error: ' + JSON.stringify(e));
			}
		));
	};
	
	return {
		getLanguages: getLanguages
	};
	
})();

module.exports = Languages;
