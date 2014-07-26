function updateProgress(e) {
	$.progress.setValue(e.currentPage);
}

$.scrollable.addEventListener("scrollend", updateProgress);

$.btnNewUser.addEventListener('click', function() {
	Alloy.createController('signup').getView().open();
});

$.btnExistingUser.addEventListener('click', function() {
	Alloy.createController('signin').getView().open();
});
