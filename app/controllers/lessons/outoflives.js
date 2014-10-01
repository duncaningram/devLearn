var Log = require('utils/Log');

var _parent;

function init(args) {
	_parent = args.parent;
		
	_parent.btnContinue.visible = false;
	
	$.btnExit.addEventListener("click", cancel);
	$.btnRetry.addEventListener("click", retry);
}

function cancel(e) {
	_parent.window.close();
}

function retry(e) {
	_parent.restart();
}

init(arguments[0] || {});