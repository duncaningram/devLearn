var Log = require('utils/Log');

var parent;
var tutorial;
		


function init(args) {
	parent = args.parent;
	tutorial = args.tutorial;
	Log.info("tutorial controller: " + JSON.stringify(tutorial));
	
	$.txtTitle.setText(tutorial.title);
	$.txtDescription.setText(tutorial.description);
	
	if (tutorial.example.source) {
		$.btnSource.addEventListener('click', function() { toggleTab("source"); });
	} else {
		$.tabs.remove($.btnSource);
	}
	
	if (tutorial.example.source_css) {
		$.btnSourceCSS.addEventListener('click', function() { toggleTab("source_css"); });
	} else {
		$.tabs.remove($.btnSourceCSS);
	}
	
	if (tutorial.example.source_js) {
		$.btnSourceJS.addEventListener('click', function() { toggleTab("source_js"); });
	} else {
		$.tabs.remove($.btnSourceJS);
	}
	
	if (tutorial.example.html) {
		$.btnBrowser.addEventListener('click', function() { toggleTab("html"); });
	} else {
		$.tabs.remove($.btnBrowser);
	}

	showSource(tutorial.example.source);
	
	if(!parent.btnContinue.getVisible()) {
		parent.btnContinue.visible = true;
	}
	parent.btnContinue.removeEventListener('click', parent.advance);
	parent.btnContinue.addEventListener('click', parent.advance);
}

function toggleTab(source) {	
	if (source == "source") {
		$.btnSource.setBackgroundColor("#33b5e5");
		$.lblSource.setColor("#FFF");
		$.btnSourceCSS.setBackgroundColor("#d3d3d3");
		$.lblSourceCSS.setColor("#000");
		$.btnSourceJS.setBackgroundColor("#d3d3d3");
		$.lblSourceJS.setColor("#000");
		$.btnBrowser.setBackgroundColor("#d3d3d3");
		$.lblBrowser.setColor("#000");
		showSource(tutorial.example.source);
	}
	else if (source == "source_css") {
		$.btnSource.setBackgroundColor("#d3d3d3");
		$.lblSource.setColor("#000");
		$.btnSourceCSS.setBackgroundColor("#33b5e5");
		$.lblSourceCSS.setColor("#FFF");
		$.btnSourceJS.setBackgroundColor("#d3d3d3");
		$.lblSourceJS.setColor("#000");
		$.btnBrowser.setBackgroundColor("#d3d3d3");
		$.lblBrowser.setColor("#000");
		showSource(tutorial.example.source_css);
	}
	else if (source == "source_js") {
		$.btnSource.setBackgroundColor("#d3d3d3");
		$.lblSource.setColor("#000");
		$.btnSourceCSS.setBackgroundColor("#d3d3d3");
		$.lblSourceCSS.setColor("#000");
		$.btnSourceJS.setBackgroundColor("#33b5e5");
		$.lblSourceJS.setColor("#FFF");
		$.btnBrowser.setBackgroundColor("#d3d3d3");
		$.lblBrowser.setColor("#000");
		showSource(tutorial.example.source_js);
	}
	else {
		$.btnSource.setBackgroundColor("#d3d3d3");
		$.lblSource.setColor("#000");
		$.btnSourceCSS.setBackgroundColor("#d3d3d3");
		$.lblSourceCSS.setColor("#000");
		$.btnSourceJS.setBackgroundColor("#d3d3d3");
		$.lblSourceJS.setColor("#000");
		$.btnBrowser.setBackgroundColor("#33b5e5");
		$.lblBrowser.setColor("#FFF");
		showBrowser();
	}
}

function showSource(source) {
	$.sourceWrapper.removeAllChildren();
	var lblSource = Ti.UI.createLabel({
		text: source,
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