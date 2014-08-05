var Collection = require('utils/Collection');
var Log = require('utils/Log');

var parent;
var grandparent;
var quiz;
var answers;
var questions;

var choices;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	grandparent = args.grandparent;
	Log.info("Multiple Choice: " + JSON.stringify(quiz));

	
	setCheckButton(true, true);
	$.txtQuestion.setText(quiz.question);
	
	questions = Collection.shuffle(quiz.selections);
	
	Log.info("Multiple Choice shuffled: " + JSON.stringify(questions));
	
	$.questions.removeAllChildren();
	
	choices = new Array();
	answers = new Array();
	
	var index = 0;
	questions.forEach(function(entry) {
		Log.info(entry);
		var view = Titanium.UI.createView({
			borderRadius:5,
			backgroundColor: '#33b5e5',
			left: 0,
			layout: 'horizontal',
			width: '100%',
			height: Ti.UI.SIZE,
			data: index
		});
		
		var correct = false;
		quiz.answer.forEach(function(answer) {
			if(entry == answer)
				correct = true;
		});
		
		if (correct){
			view.addEventListener('click', correctAnswer);
			answers[index] = true;
		} else {
			view.addEventListener('click', incorrectAnswer);
			answers[index] = false;
		}
		
		choices[index] = view;
		
		var label = Titanium.UI.createLabel({
			color: "#FFF",
			left: 5,
			right: 5,
			height: 40,
			font: {
				fontSize: 25
			},
			data: index
		});
		var padding = Titanium.UI.createView({
			height:20
		});
		
		entry = String.fromCharCode(97+index) + '. ' + entry;
		
		label.setText(entry);
		view.add(label);

		$.questions.add(view);
		$.questions.add(padding);
		index++;
	});	

	
}

function correctAnswer(e) {
	Log.info(JSON.stringify(e));
	checkAnswer(true, e);
}

function incorrectAnswer(e) {
	Log.info(JSON.stringify(e));
	checkAnswer(false, e);
}

function checkAnswer(answer, chosenView) {
	
	var index = 0;
	choices.forEach(function(choice) {
		if(answers[index]){
			choice.removeEventListener('click', correctAnswer);
			choice.setBackgroundColor("#86C15D");
		} else {
			choice.removeEventListener('click', incorrectAnswer);
			if(choice.data == chosenView.source.data)
				choice.setBackgroundColor("#FF3333");
			else
				choice.setBackgroundColor("#D3D3D3");
		}
		index++;
	});
	
	Log.info("Chosen Answer: " + questions[chosenView.source.data]);
	parent.logAnswer(answer, questions[chosenView.source.data]);

	if(answer) {
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
	
	setCheckButton(true, false);
}

function setCheckButton(check, disabled) {

	if(check){
		//grandparent.lblContinue.setText("Check");
		if(disabled) {
			grandparent.lblContinue.setColor("#000");
			grandparent.btnContinue.setBackgroundColor("#d3d3d3");
		} else {
			grandparent.lblContinue.setColor("#FFF");
			grandparent.btnContinue.setBackgroundColor("#33b5e5");
			grandparent.btnContinue.addEventListener('click', grandparent.advance);
		}
	} else {
		//grandparent.lblContinue.setText("Continue");
		grandparent.lblContinue.setColor("#FFF");
		grandparent.btnContinue.setBackgroundColor("#33b5e5");
	}

}

init(arguments[0] || {});