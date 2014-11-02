var Random = (function() {
	
	function string(length) {
		var text = "";
		var dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		
		for (var i = 0; i < length; i++) {
			text += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
		}
		
		return text;
	};
	
	return {
		string: string
	};
	
})();

module.exports = Random;