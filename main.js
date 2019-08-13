let questAnsArray = [];
const LENGTH = 10;

function QuestAnsObj(question, correct_answer, incorrect_answers) {
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
}
function loadDoc(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function fillArray(questObj) {
    console.log(questObj);
    for (let i = 0; i < LENGTH; i++) {
        questAnsArray[i] = new QuestAnsObj(questObj.results[i].question, questObj.results[i].correct_answer, questObj.results[i].incorrect_answers);
    }
}
url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
loadDoc(url, fillArray);
console.log(questAnsArray);