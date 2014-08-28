var Lessons = require('objects/Lessons');
var Log = require('utils/Log');

var language;

function display_lessons(lessons) {
	var table = Alloy.createController('navigation/table');
	table.title.setText(String.format(L('lesson_select_title'), language.name));
	
	for (var i = 0; i < lessons.length; i++) {
		var row = Alloy.createController('navigation/row');
		row.item.setText(lessons[i].name);
		row.row.lesson = lessons[i];
		row.row.addEventListener('click', select_lesson);
		table.items.add(row.getView());
	}
	
	var row = Alloy.createController('navigation/row');
	row.item.setText(L('language_transition'));
	row.row.addEventListener('click', select_transition);
	table.items.add(row.getView());
	
	$.window.add(table.getView());
}

function select_lesson(e) {
	Alloy.createController('lessons/lesson', { lesson: e.row.lesson }).getView().open();
}

function select_transition(e) {
	Alloy.createController('lessons/transition', { language: language }).getView().open();
}

function init(args) {
	language = args.language;
	
	Lessons.getLessons(language.id, display_lessons);
}

init(arguments[0] || {});
