var Loader = (function() {
	
	function showLoader(view) {
		var loading = Ti.UI.createImageView({
			height: 128,
			width: 128,
			duration: 40,
			images: [
				'/images/loader/00.png',
				'/images/loader/01.png',
				'/images/loader/02.png',
				'/images/loader/03.png',
				'/images/loader/04.png',
				'/images/loader/05.png',
				'/images/loader/06.png',
				'/images/loader/07.png',
				'/images/loader/08.png',
				'/images/loader/09.png',
				'/images/loader/10.png',
				'/images/loader/11.png',
				'/images/loader/12.png',
				'/images/loader/13.png',
				'/images/loader/14.png',
				'/images/loader/15.png',
				'/images/loader/16.png',
				'/images/loader/17.png',
				'/images/loader/18.png',
				'/images/loader/19.png',
				'/images/loader/20.png',
				'/images/loader/21.png',
				'/images/loader/22.png',
				'/images/loader/23.png',
				'/images/loader/24.png',
				'/images/loader/25.png',
				'/images/loader/26.png',
				'/images/loader/27.png',
				'/images/loader/28.png',
				'/images/loader/29.png',
				'/images/loader/30.png',
				'/images/loader/31.png',
				'/images/loader/32.png',
			]
		});
		view.add(loading);
		loading.start();
	};
	
	return {
		showLoader: showLoader
	};
	
})();

module.exports = Loader;