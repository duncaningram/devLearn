var Languages = require('objects/Languages');
var Log = require('utils/Log');
var Window = require('utils/Window');

var _view;

function display_languages(languages) {
	var table = Alloy.createController('navigation/table');
	table.btnSettings.addEventListener('click', show_settings);
	table.title.setText(L('language_select_title'));
	
	Log.info(JSON.stringify(languages));
	
	var lang = new Array();
	for (var i = 0; i < languages.length; i++) {
		lang[languages[i].order] = languages[i];
	}
	
	for (var i = 0; i < lang.length; i++) {
		var row = Alloy.createController('navigation/row');
		row.item.setText(lang[i].name);
		row.row.language = lang[i];
		row.row.addEventListener('click', select_language);
		
		row.listSelection.language = lang[i];
		row.item.language = lang[i];
		row.padding.language = lang[i];
		row.letterGrade.language = lang[i];
		
		table.items.add(row.getView());
	}
	
	//Globals.setLanguageView($.getView());
	
	$.window.add(table.getView());
}

function select_language(e) {
	var view;
	if(Ti.Platform.name == 'mobileweb'){
		view = Alloy.createController('navigation/lesson', { language: e.source.language }).getView();
	} else {
		view = Alloy.createController('navigation/lesson', { language: e.row.language }).getView();
	}
	Window.open(view);
}

function show_settings(e) {
	_view = Alloy.createController('settings').getView();
	Window.open(_view, { animated: false, theme: "NoActionBar" });
	_view.addEventListener('click', hide_settings);
}

function hide_settings(e) {
	$.window.removeEventListener('click', hide_settings);
	Window.close(_view, { animated: false });
}

function init() {
	Languages.getLanguages(display_languages);
}

init();
