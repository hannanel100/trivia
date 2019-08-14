let questAnsArray = [];
const LENGTH = 10;
const quest = document.getElementsByClassName("question");
const ans = document.getElementsByClassName("answers");
const URL = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
let score = 0;
let questCounter = 0;
/**
 * Constructur for Object - containing the three params passed
 * @param {String} question
 * @param {String} correct_answer
 * @param {Array} answers
 */
let QuestAnsObj = function (question, correct_answer, answers) {
  this.question = question;
  this.correct_answer = correct_answer;
  this.answers = answers;
};
/**
 * AJAX Call to open trivia API
 * @param {String} url  API URL
 * @param {Function} cFunction Callback function - fillArray
 */
let loadDoc = function (url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
};
/**
 * callback function of AJAX call in function loadDoc - fills array with objects containing question, answers
 * and correct answer
 * @param {Object} questObj this.responeText from AJAX call
 */
let fillArray = function (questObj) {
  
  console.log(questObj);
  for (let i = 0; i < LENGTH; i++) {
    questAnsArray[i] = new QuestAnsObj(
      questObj.results[i].question,
      questObj.results[i].correct_answer,
      shuffle(
        questObj.results[i].incorrect_answers.concat(
          questObj.results[i].correct_answer
        )
      )
    );
  }
  console.log(questAnsArray);
  writeQuestToPage(questAnsArray);
};
/**
 * Writes questions and answers to page and adds event listener
 * on answers with callback to check function
 * @param {Array} questAnsArray Array of objects containing question, answers and correct answer
 */
let writeQuestToPage = function (questAnsArray) {
  if (questCounter < LENGTH) {//checking if we have more questions in array
    quest[0].innerHTML = questAnsArray[questCounter].question;
    for (let i = 0; i < 4; i++) {
      document.getElementById(`answer${i + 1}`).innerHTML = `${i + 1}. ${
      questAnsArray[questCounter].answers[i]
    }`;
    }
    questCounter++;
    ans[0].addEventListener("click", check);
  } else {
    console.log('Game Over');
  }
};

/**
 * Checks for right answer and prints right or wrong to the console
 * @param {Object} event The click event
 */
let check = function (event) {
  if (event.target.innerText.slice(3) === questAnsArray[questCounter].correct_answer) {
    score++;
    ans[0].innerHTML = `Score is: ${score}`;
    quest[0].innerHTML = `YOURE RIGHT!`;
    
  } else {
    ans[0].innerHTML = '';
    quest[0].innerHTML = `YOURE WRONG!`;
  }
};
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
let shuffle = function (array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

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
(function main() {
  loadDoc(URL, fillArray);
  // writeQuestToPage(questAnsArray);
})();