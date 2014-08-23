var Collection = require('utils/Collection');
var Log = require('utils/Log');

var parent;
var grandparent;
var quiz;
var answers;
var questions;

var buttons;
var answerButtons;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	grandparent = args.grandparent;
	Log.info("Code Quiz: " + JSON.stringify(quiz));

	
	setCheckButton(true, false);
	$.txtQuestion.setText(quiz.question);
	
	questions = Collection.shuffle(quiz.selections);
	
	Log.info("Code shuffled: " + JSON.stringify(questions));
	
	$.questions.removeAllChildren();
	
	answers = new Array();
	buttons = new Array();
	answerButtons = new Array();
	
	var index = 0;
	questions.forEach(function(entry) {
		Log.info(entry);
		
		button = createButton(entry, index);
		
		button.addEventListener('click', clickQuestionButton);
		buttons[index] = button;		
		answers[index] = entry;
		
		$.questions.add(button);
		index++;
	});	
	
}

function createButton(entry, index, questionIndex) {
	var padding = Titanium.UI.createView({
		left: 5,
		right: 5,
		top: 5,
		bottom: 5,
		layout: 'horizontal',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		data: index,
		questionIndex : questionIndex
	});
	
	
	var view = Titanium.UI.createView({
		borderRadius:5,
		backgroundColor: '#33b5e5',
		left: 0,
		layout: 'horizontal',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		data: index,
		questionIndex : questionIndex
	});
	
	var label = Titanium.UI.createLabel({
		color: "#FFF",
		left: 5,
		right: 5,
		top: 3,
		bottom: 3,
		height: Ti.UI.SIZE,
		font: {
			fontSize: 25
		},
		data: index,
		questionIndex : questionIndex
	});
	
	label.setText(entry);
	view.add(label);
	padding.add(view);
	
	return padding;
}

function clickQuestionButton(e) {
	Log.info(JSON.stringify(e));
	buttons[e.source.data].setVisible(false);
	index = (answerButtons.length == undefined) ? 0 : answerButtons.length;
	button = createButton(answers[e.source.data], answerButtons.length, e.source.data);
	button.addEventListener('click', clickAnswerButton);
	answerButtons.push(button);
	$.answerBox.add(button);
	$.answerBox.scrollToBottom();
	//e.source.setVisible(false);
}

function clickAnswerButton(e) {
	Log.info(JSON.stringify(e));
	$.answerBox.remove(answerButtons[e.source.data]);
	buttons[e.source.questionIndex].setVisible(true);
	Log.info(JSON.stringify(buttons[0]));
}

function checkAnswer(e) {
	answer = '';
	correct = false;
	$.answerBox.children.forEach(function(entry) {
		if(entry.questionIndex != undefined) {
			answer += answers[entry.questionIndex];
		}
	});
	
	Log.info("Completed Answer: " + answer);
	Log.info("Correct Answer: " + quiz.answer);
	quiz.answer.forEach(function(entry) {
		if (answer == entry)
			correct = true;
	});
	
	parent.logAnswer(correct, answer);
	
	if(correct) {
		// Correct answer
		parent.addPoints();
		var toast = Ti.UI.createNotification({
			message: "Correct",
			duration: Ti.UI.NOTIFICATION_DURATION_LONG
		});
		toast.show();

	} else {
		// Incorrect answer
		parent.removeLife();
		var toast = Ti.UI.createNotification({
			message: "Incorrect",
			duration: Ti.UI.NOTIFICATION_DURATION_LONG
		});
		toast.show();
	}
	
	setCheckButton(false, false);
}

function setCheckButton(check, disabled) {

	if(check){
		grandparent.lblContinue.setText("Check");
		if(disabled) {
			grandparent.lblContinue.setColor("#000");
			grandparent.btnContinue.setBackgroundColor("#d3d3d3");
		} else {
			grandparent.lblContinue.setColor("#FFF");
			grandparent.btnContinue.setBackgroundColor("#33b5e5");
			grandparent.btnContinue.addEventListener('click', checkAnswer);
		}
	} else {
		grandparent.lblContinue.setText("Continue");
		grandparent.lblContinue.setColor("#FFF");
		grandparent.btnContinue.setBackgroundColor("#33b5e5");
		grandparent.btnContinue.removeEventListener('click', checkAnswer);
		grandparent.btnContinue.addEventListener('click', grandparent.advance);
	}

}

init(arguments[0] || {});