var Window = (function() {
	
	var _windows = new Array();
	
	function open(view, params) {
		view.open(params);
		_windows.push(view);
	};
	
	function close(view, params) {
		view.close(params);
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