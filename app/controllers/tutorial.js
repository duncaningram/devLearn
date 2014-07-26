var args = arguments[0] || {};
var parent = args.parent;

function updateProgress(e) {
	$.progress.setValue(e.currentPage);
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
