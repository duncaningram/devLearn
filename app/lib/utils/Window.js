var Window = (function() {
	
	var _windows = new Array();
	
	function open(view) {
		view.open();
		_windows.push(view);
	};
	
	function close(view) {
		view.close();
	}
	
	function closeAll() {
		_windows.forEach(function(e) {
			close(e);
		});
		_window = new Array();
	}
	
	return {
		open: open,
		close: close,
		closeAll: closeAll
	};
	
})();

module.exports = Window;