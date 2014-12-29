var Log = require('utils/Log');

var _parent;
var _language;

function init(args) {
	_parent = args.parent;
	_language = args.language;
	
	$.title.setText(String.format(L('lesson_select_title'), _language.name));
	
	$.btnCancel.addEventListener("click", cancel);
	$.title.addEventListener('click', cancel);
}

function cancel(e) {
	_parent.window.close();
}

init(arguments[0] || {});