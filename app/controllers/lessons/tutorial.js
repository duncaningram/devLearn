var Device = require('utils/Device');
var Event = require('utils/Event');
var Log = require('utils/Log');

var parent;
var tutorial;

function init(args) {
	parent = args.parent;
	tutorial = args.tutorial;
	Log.info("tutorial controller: " + JSON.stringify(tutorial));
	
	$.txtTitle.setText(tutorial.title);
	$.txtDescription.setText(tutorial.description);
	
	if (tutorial.source) {
		$.btnSource.addEventListener('click', function() { toggleTab("source"); });
	} else {
		$.tabs.remove($.btnSource);
	}
	
	if (tutorial.source_css) {
		$.btnSourceCSS.addEventListener('click', function() { toggleTab("source_css"); });
	} else {
		$.tabs.remove($.btnSourceCSS);
	}
	
	if (tutorial.source_js) {
		$.btnSourceJS.addEventListener('click', function() { toggleTab("source_js"); });
	} else {
		$.tabs.remove($.btnSourceJS);
	}
	
	if (tutorial.html) {
		$.btnBrowser.addEventListener('click', function() { toggleTab("html"); });
	} else {
		$.tabs.remove($.btnBrowser);
	}

	showSource(tutorial.source);
	
	Event.removeEventListener(parent.btnContinue, 'click', parent.advance);
	parent.btnContinue.setBackgroundColor("#d3d3d3");
	parent.lblContinue.setColor("#000");
	setTimeout(function() {
		Event.addEventListener(parent.btnContinue, 'click', parent.advance);
		parent.btnContinue.setBackgroundColor("#33b5e5");
		parent.lblContinue.setColor("#FFF");
	}, 1000);
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
		showSource(tutorial.source);
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
		showSource(tutorial.source_css);
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
		showSource(tutorial.source_js);
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
		font: { fontSize: Device.isTablet() ? 16 : 14 },
		text: source,
		left: 10,
		top: 10
	});
	
	$.sourceWrapper.add(lblSource);
}

function showBrowser() {
	$.sourceWrapper.removeAllChildren();
	Log.info("HTML source: " + tutorial.html);
	var browser = Ti.UI.createWebView({
		html: tutorial.html
	});
	
	$.sourceWrapper.add(browser);
}

init(arguments[0] || {});