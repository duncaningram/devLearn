var Collection = require('utils/Collection');
var Log = require('utils/Log');

var parent;
var grandparent;
var quiz;
var answers;

var choices;

function init(args) {
	parent = args.parent;
	quiz = args.quiz;
	grandparent = args.grandparent;
	Log.info("Multiple Choice: " + JSON.stringify(quiz));

	
	setCheckButton(true, true);
	parent.txtQuestion.setText(quiz.question);
	
	questions = Collection.shuffle(quiz.selections);
	
	Log.info("Multiple Choice shuffled: " + JSON.stringify(questions));
	
	parent.sourceWrapper.removeAllChildren();
	
	choices = new Array();
	answers = new Array();
	
	var index = 0;
	questions.forEach(function(entry) {
		Log.info(entry);
		var view = Titanium.UI.createView({
			borderRadius:5,
			backgroundColor: '#33b5e5',
			top: (index+1)*50,
			left: 20,
			layout: 'horizontal',
			width: Ti.UI.SIZE,
			height: Ti.UI.SIZE
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
			}
		});
		label.setText(entry);
		view.add(label);

		parent.sourceWrapper.add(view);
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
			if(choice.getChildren()[0].getText() == chosenView.source.text)
				choice.setBackgroundColor("#FF3333");
			else
				choice.setBackgroundColor("#D3D3D3");
		}
		index++;
	});
	
	//chosenView.source.text setBackgroundColor("#FF3333");


	if(answer) {
		// Correct answer
		var toast = Ti.UI.createNotification({
			message: "Correct",
			duration: Ti.UI.NOTIFICATION_DURATION_LONG
		});
		toast.show();

	} else {
		// Incorrect answer
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
		}
	} else {
		//grandparent.lblContinue.setText("Continue");
		grandparent.lblContinue.setColor("#FFF");
		grandparent.btnContinue.setBackgroundColor("#33b5e5");
	}

}

init(arguments[0] || {});