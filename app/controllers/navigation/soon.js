var Log = require('utils/Log');

var _parent;

function init(args) {
	_parent = args.parent;
	
	$.btnCancel.addEventListener("click", cancel);
}

function cancel(e) {
	_parent.window.close();
}

init(arguments[0] || {});