var Log = require('utils/Log');

var _parent;

function init(args) {
	_parent = args.parent;
		
	setContinueButton(true);
	
	$.btnExit.addEventListener("click", cancel);
	$.btnRetry.addEventListener("click", retry);
}

function cancel(e) {
	_parent.window.close();
}

function retry(e) {
	_parent.restart();
	setContinueButton(false);
}

function setContinueButton(disabled) {
	if (disabled) {
		_parent.btnContinue.visible = false;
	} else {
		_parent.btnContinue.visible = true;
		_parent.btnContinue.addEventListener('click', _parent.advance);
	}
}

init(arguments[0] || {});