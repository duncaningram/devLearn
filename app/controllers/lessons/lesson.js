var Log = require('utils/Log');

function init(args) {
	lesson = args.lesson;
	Log.info(JSON.stringify(lesson));
}

init(arguments[0] || {});
