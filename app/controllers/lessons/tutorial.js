var Log = require('utils/Log');

var parent;
var tutorial;
		


function init(args) {
	parent = args.parent;
	tutorial = args.tutorial;
	Log.info("tutorial controller: " + JSON.stringify(tutorial));
	
	$.txtTitle.setText(tutorial.title);
	$.txtDescription.setText(tutorial.description);
	$.txtSource.setText(tutorial.example.source);
	$.btnSource.addEventListener('click', function() {
		toggleTab(true);
	});
	$.btnBrowser.addEventListener('click', function() {
		toggleTab(false);
	});
	

}

function toggleTab(source) {	
	if (source) {
		$.btnSource.setBackgroundColor("#33b5e5");
		$.lblSource.setColor("#FFF");
		$.btnBrowser.setBackgroundColor("#d3d3d3");
		$.lblBrowser.setColor("#000");
		showSource();
	} else {
		$.btnSource.setBackgroundColor("#d3d3d3");
		$.lblSource.setColor("#000");
		$.btnBrowser.setBackgroundColor("#33b5e5");
		$.lblBrowser.setColor("#FFF");
		showBrowser();
	}
}

function showSource() {
	$.sourceWrapper.removeAllChildren();
	var lblSource = Ti.UI.createLabel({
		text: tutorial.example.source,
		left: 10,
		top: 10
	});
	
	$.sourceWrapper.add(lblSource);
}

function showBrowser() {
	$.sourceWrapper.removeAllChildren();
	Log.info("HTML source: " + tutorial.example.html);
	var browser = Ti.UI.createWebView({
		html: tutorial.example.html
	});
	
	$.sourceWrapper.add(browser);
}

init(arguments[0] || {});