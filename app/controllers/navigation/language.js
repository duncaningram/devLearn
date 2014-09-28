var Languages = require('objects/Languages');
var Log = require('utils/Log');
var Window = require('utils/Window');

function display_languages(languages) {
	var table = Alloy.createController('navigation/table');
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
		table.items.add(row.getView());
	}
	
	//Globals.setLanguageView($.getView());
	
	$.window.add(table.getView());
}

function select_language(e) {
	var view = Alloy.createController('navigation/lesson', { language: e.row.language }).getView();
	Window.open(view);
}

function init() {
	Languages.getLanguages(display_languages);
}

init();
