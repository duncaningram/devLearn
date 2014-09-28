var Lessons = require('objects/Lessons');
var Log = require('utils/Log');
var Window = require('utils/Window');

var language;

function display_lessons(lessons) {
	var table = Alloy.createController('navigation/table');
	table.title.setText(String.format(L('lesson_select_title'), language.name));
	
	var less = new Array();
	for (var i = 0; i < lessons.length; i++) {
		less[lessons[i].order] = lessons[i];
	}
	
	for (var i = 0; i < less.length; i++) {
		var row = Alloy.createController('navigation/row');
		row.item.setText(less[i].name);
		row.row.lesson = less[i];
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
	var view = Alloy.createController('lessons/lesson', { lesson: e.row.lesson }).getView();
	Window.open(view);
}

function select_transition(e) {
	Alloy.createController('lessons/transition', { language: language }).getView().open();
}

function init(args) {
	language = args.language;
	
	Lessons.getLessons(language.id, display_lessons);
}

init(arguments[0] || {});
