var list = $.languages;

var Log = require('utils/Log');
var Cloud = require('ti.cloud');

Cloud.Objects.query({
	classname: 'Language',
	order: 'order'
}, function (e) {
	if (e.success) {
		Log.getInstance().info('success: ' + JSON.stringify(e));
	} else {
		Log.getInstance().info('error: ' + JSON.stringify(e));	
	}
});
