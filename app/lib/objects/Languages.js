var Cloud = require('ti.cloud');
var Log = require('utils/Log');

var Languages = (function() {
	
	var _languages = new Array();
	
	function getLanguages(callback) {
		if (_languages.length == 0) {
			Cloud.Objects.query({
				classname: 'Languages',
				order: 'order'
			}, function (e) {
				if (e.success) {
					Log.getInstance().info(e.Languages.length);
					Log.getInstance().info('success: ' + JSON.stringify(e));
				} else {
					Log.getInstance().info('error: ' + JSON.stringify(e));	
				}
				
				callback(_languages);
			});
		}
		else {
			callback(_languages);
		}
	};
	
	return {
		getLanguages: getLanguages
	};
	
})();

module.exports = Languages;
