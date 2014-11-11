var Grade = require('utils/Grade');
var Lessons = require('objects/Lessons');
var Log = require('utils/Log');
var UserAttempt = require('objects/UserAttempt');
var Window = require('utils/Window');

var language;
var rows;
var controller;

function display_lessons(lessons) {
	if (typeof controller !== "undefined") {
		$.window.removeEventListener('focus', refresh_lessons);
		$.window.remove(controller.getView());
	}
	
	if (lessons.length > 0) {
		controller = Alloy.createController('navigation/table');
		controller.title.setText(String.format(L('lesson_select_title'), language.name));
		
		var less = new Array();
		rows = new Array();
		for (var i = 0; i < lessons.length; i++) {
			less[lessons[i].order] = lessons[i];
		}
		
		for (var i = 0; i < less.length; i++) {
			var attempt = UserAttempt.load(less[i].id, display_attempt);
			var row = Alloy.createController('navigation/row');
			row.item.setText(less[i].name);
			row.row.lesson = less[i];
			
			row.listSelection.lesson = less[i];
			row.item.lesson = less[i];
			row.padding.lesson = less[i];
			row.letterGrade.lesson = less[i];
			
			row.row.addEventListener('click', select_lesson);
			var row_view = row.getView();
			rows.push(row_view);
			controller.items.add(row_view);
		}
		
		var row = Alloy.createController('navigation/row');
		row.item.setText(L('language_transition'));		
		row.row.addEventListener('click', select_transition);
		controller.items.add(row.getView());
		
		$.window.add(controller.getView());
	} else {
		controller = Alloy.createController('navigation/soon', {parent: $});
		
		$.window.add(controller.getView());
	}
		
	$.window.addEventListener('focus', refresh_lessons);
}

function refresh_lessons() {
	Lessons.getLessons(language.id, display_lessons);
}

function display_attempt(attempt) {
	if(attempt !== undefined){
		if(attempt.is_completed && attempt.grade > -1) {
			for (var i = 0; i < rows.length; i++) {
				if(rows[i].lesson.id == attempt['[CUSTOM_Lessons]lesson_id'][0]['id'])
					rows[i].children[0].children[1].children[0].text = Grade.getLetterGrade(attempt.grade);
			}
		}
	}
}

function select_lesson(e) {
	var view;
	if(Ti.Platform.name == 'mobileweb'){
		var view = Alloy.createController('lessons/lesson', { lesson: e.source.lesson }).getView();
	} else {
		var view = Alloy.createController('lessons/lesson', { lesson: e.row.lesson }).getView();
	}
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
