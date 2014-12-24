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
	};
	
	function isIPhone() {
		return Ti.Platform.osname == "iphone";
	};
	
	function isIOS() {
		return Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad";
	};
	
	function isAndroid() {
		return Ti.Platform.osname == "android";
	};
	
	function isMobileWeb() {
		return Ti.Platform.osname == "mobileweb";
	};
	
	return {
		isTablet: isTablet,
		isIPhone: isIPhone,
		isIOS: isIOS,
		isAndroid: isAndroid,
		isMobileWeb: isMobileWeb
	};
	
})();

module.exports = Device;