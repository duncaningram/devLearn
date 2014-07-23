function updateProgress(e) {
	$.progress.setValue(e.currentPage);
}

$.scrollable.addEventListener("scrollend", updateProgress);
