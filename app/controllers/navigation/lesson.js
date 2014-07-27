var Log = require('utils/Log');

var language;

function init(args) {
	language = args.language;
	
	var table = Alloy.createController('navigation/table');
	table.title.setText(String.format(L('lesson_select_title'), language.name));
	
	
	
	$.window.add(table.getView());
}

init(arguments[0] || {});
