var args = arguments[0] || {};
var parent = args.parent;

function updateProgress(e) {
	switch(e.currentPage) {
		case 0:
			$.imgPage1.setImage("/images/ring_full.png");
			$.imgPage2.setImage("/images/ring.png");
			$.imgPage3.setImage("/images/ring.png");
			break;
		case 1:
			$.imgPage1.setImage("/images/ring.png");
			$.imgPage2.setImage("/images/ring_full.png");
			$.imgPage3.setImage("/images/ring.png");
			break;
		case 2:
			$.imgPage1.setImage("/images/ring.png");
			$.imgPage2.setImage("/images/ring.png");
			$.imgPage3.setImage("/images/ring_full.png");
			break;
	}
}

$.scrollable.addEventListener("scrollend", updateProgress);

$.btnNewUser.addEventListener('click', function() {
	Alloy.createController('signup', {
		parent: $
	}).getView().open();
});

$.btnExistingUser.addEventListener('click', function() {
	Alloy.createController('signin', {
		parent: $
	}).getView().open();
});
