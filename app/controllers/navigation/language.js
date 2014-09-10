var Languages = require('objects/Languages');
var Log = require('utils/Log');
var Window = require('utils/Window');

function display_languages(languages) {
	var table = Alloy.createController('navigation/table');
	table.title.setText(L('language_select_title'));
	
	for (var i = 0; i < languages.length; i++) {
		var row = Alloy.createController('navigation/row');
		row.item.setText(languages[i].name);
		row.row.language = languages[i];
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
