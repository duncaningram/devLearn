var Collection = require('utils/Collection');
var Device = require('utils/Device');
var Event = require('utils/Event');
var Log = require('utils/Log');

var parent;
var grandparent;
var quiz;
var answers;
var questions;

var buttons;
var answerButtons;
var disabled = true;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	grandparent = args.grandparent;
	Log.info("Order Quiz: " + JSON.stringify(quiz));

	
	setCheckButton(true, true);
	$.txtQuestion.setText(quiz.question);
	
	questions = Collection.shuffle(JSON.parse(quiz.selections));
	
	Log.info("Order shuffled: " + JSON.stringify(questions));
	
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
	var button = Alloy.createController('lessons/questions/button');
	button.label.setText(entry);
	button.outterPadding.data = index;
	button.outterPadding.questionIndex = questionIndex;
	button.innerPadding.data = index;
	button.innerPadding.questionIndex = questionIndex;
	button.label.data = index;
	button.label.questionIndex = questionIndex;
	
	if (Device.isIOS()) {
		var width = button.getView().toImage().width;
		Log.info(width);
		button.getView().setWidth(width);	
	}
	
	return button.getView();
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
	if(disabled) {
		disabled = false;
		setCheckButton(true, false);
	}
	//e.source.setVisible(false);
}

function clickAnswerButton(e) {
	Log.info(JSON.stringify(e));
	$.answerBox.remove(answerButtons[e.source.data]);
	buttons[e.source.questionIndex].setVisible(true);
	Log.info(JSON.stringify(buttons[0]));
	if(!disabled) {
		if($.answerBox.children.length == 0) {
			disabled = true;
			setCheckButton(true, true);
		}
	}
}

function checkAnswer(e) {
	answer = '';
	correctAnswer = '';
	userAnswers = Array();
	correct = false;
	$.answerBox.children.forEach(function(entry) {
		if(entry.questionIndex != undefined) {
			userAnswers.push(answers[entry.questionIndex]);
			answer += answers[entry.questionIndex];
		}
		entry.removeEventListener('click', clickAnswerButton);
	});
	
	Log.info("Completed Answer: " + answer);
	Log.info("Correct Answer: " + quiz.answer);
	JSON.parse(quiz.answer).forEach(function(entry) {
		if (answer == entry)
			correct = true;
		correctAnswer = entry;
	});
	
	parent.logAnswer(correct, answer);
	
	if(correct) {
		// Correct answer
		parent.addPoints();
		parent.showCorrectIncorrect(true);
	} else {
		// Incorrect answer
		parent.removeLife();
		parent.showCorrectIncorrect(false, parent.breakApartAnswers(correctAnswer, answers), userAnswers, true);
	}
	
	setCheckButton(false, false);
}

function setCheckButton(check, disabled) {

	if(check){
		grandparent.lblContinue.setText("Check");
		if(disabled) {
			grandparent.lblContinue.setColor("#000");
			grandparent.btnContinue.setBackgroundColor("#d3d3d3");
			Event.removeEventListener(grandparent.btnContinue, 'click', checkAnswer);
		} else {
			grandparent.lblContinue.setColor("#FFF");
			grandparent.btnContinue.setBackgroundColor("#33b5e5");
			Event.addEventListener(grandparent.btnContinue, 'click', checkAnswer);
		}
	} else {
		grandparent.lblContinue.setText("Continue");
		grandparent.lblContinue.setColor("#FFF");
		grandparent.btnContinue.setBackgroundColor("#33b5e5");
		Event.removeEventListener(grandparent.btnContinue, 'click', checkAnswer);
		Event.addEventListener(grandparent.btnContinue, 'click', grandparent.advance);
	}

}

init(arguments[0] || {});