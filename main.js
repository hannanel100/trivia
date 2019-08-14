let questAnsArray = [];
const LENGTH = 10;
const quest = document.getElementsByClassName("question");
const ans = document.getElementsByClassName("answers");
function QuestAnsObj(question, correct_answer, answers) {
  this.question = question;
  this.correct_answer = correct_answer;
  this.answers = answers;
}
function loadDoc(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function fillArray(questObj) {
  console.log(questObj);
  for (let i = 0; i < LENGTH; i++) {
    questAnsArray[i] = new QuestAnsObj(
      questObj.results[i].question,
      questObj.results[i].correct_answer,
      shuffle(questObj.results[i].incorrect_answers.concat(questObj.results[i].correct_answer))
    );
  }
  console.log(questAnsArray);
  writeQuestToPage(questAnsArray);
}

function writeQuestToPage(questAnsArray){
    quest[0].innerHTML = questAnsArray[0].question;
    for(let i = 0; i < 4; i++){
        document.getElementById(`answer${i+1}`).innerHTML = `${i+1}. ${questAnsArray[0].answers[i]}`;
    }
    
    

}
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
const URL = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
loadDoc(URL, fillArray);
