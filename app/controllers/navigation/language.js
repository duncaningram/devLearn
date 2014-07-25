var Languages = require('objects/Languages');
var Log = require('utils/Log');

var list = $.languages;

Languages.getLanguages(function(languages) {
	for (var i = 0; i < languages.length; i++) {
		Log.info(languages[i].name);
	}
});
