var Log = require('utils/Log');

var _language;

function init(args) {
	_language = args.language;
	
	$.lblLink.setText(_language.url);
	
	$.btnCancel.addEventListener("click", cancel);
}

function cancel(e) {
	$.window.close();
}

init(arguments[0] || {});