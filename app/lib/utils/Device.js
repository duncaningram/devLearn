var Device = (function() {
	
	function isTablet() {
		var osname = Ti.Platform.osname,
			dpi = Ti.Platform.displayCaps.dpi,
			h = Ti.Platform.displayCaps.platformHeight / dpi,
	    	w = Ti.Platform.displayCaps.platformWidth / dpi,
	    	diagonalSize = Math.sqrt(w*w+h*h);
		var diag = 6.5;
		switch(osname) {
			case 'ipad':
				return true;
			break;
			default:
				return (diagonalSize >= diag) ? true : false;
		}
	}
	
	return {
		isTablet: isTablet
	};
	
})();

module.exports = Device;