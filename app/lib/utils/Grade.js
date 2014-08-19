var Grade = (function() {
	
	function getLetterGrade(grade) {
		if (grade >= 95) {
			return "A+";
		} else if (grade >= 89.50) {
			return "A";
		} else if (grade >= 79.50) {
			return "B";
		} else {
			return "C";
		}
	};
	
	return {
		getLetterGrade: getLetterGrade
	};
	
})();

module.exports = Grade;