let questAnsArray = [];
const LENGTH = 10;
const quest = document.getElementsByClassName("question");
const ans = document.getElementsByClassName("answers");
const URL = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
/**
 * Constructur for Object - containing the three params passed
 * @param {String} question
 * @param {String} correct_answer
 * @param {Array} answers
 */
let QuestAnsObj = function(question, correct_answer, answers) {
  this.question = question;
  this.correct_answer = correct_answer;
  this.answers = answers;
};
/**
 * AJAX Call to open trivia API
 * @param {String} url  API URL
 * @param {Function} cFunction Callback function - fillArray
 */
let loadDoc = function(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
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
let fillArray = function(questObj) {
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
let writeQuestToPage = function(questAnsArray) {
  quest[0].innerHTML = questAnsArray[0].question;
  for (let i = 0; i < 4; i++) {
    document.getElementById(`answer${i + 1}`).innerHTML = `${i + 1}. ${
      questAnsArray[0].answers[i]
    }`;
  }
  ans[0].addEventListener("click", check);
};

/**
 * Checks for right answer and prints right or wrong to the console
 * @param {Object} event The click event
 */
let check = function(event) {
  console.log(typeof event);
  if (event.target.innerText.slice(3) === questAnsArray[0].correct_answer) {
    console.log(`clicked correct answer`);
  } else {
    console.log(`clicked wrong answer`);
  }
};
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
let shuffle = function(array) {
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

loadDoc(URL, fillArray);
