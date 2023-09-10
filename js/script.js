const questions = [
  {
    question: 'Javascript is an _______ language?',
    answers: ['object-oriented', 'object-based', 'procedural', 'none of the above'],
    correctAnswerID: 0 
  },
  {
    question: 'Commonly used data types do not include:',
    answers: ['strings', 'booleans', 'alerts', 'numbers'],
    correctAnswerID: 2 
  },
  {
    question: 'Which of the following keywords is used to define a variable in Javascript?',
    answers: ['var', 'let', 'both a and b', 'none of the above'],
    correctAnswerID: 2 
  },
  {
    question: 'Which of the following methods is used to access HTML elements using Javascript?',
    answers: ['getElementByID()', 'getElementsByClassName()', 'both a and b', 'none of the above'],
    correctAnswerID: 2 
  },
  {
    question: 'Which of the following methods can be used to display data in some form using Javascript?',
    answers: ['document.Write()', 'console.log()', 'window.alert()', 'all the above'],
    correctAnswerID: 3 
  }
]

// Assignment Code
var startBtn = document.querySelector("#start-quiz");
var startPage = document.querySelector("#start-page");
var questionPage = document.querySelector("#question-page");
var answerBtn1 = document.querySelector("#answer-btn-1");
var answerBtn2 = document.querySelector("#answer-btn-2");
var answerBtn3 = document.querySelector("#answer-btn-3");
var answerBtn4 = document.querySelector("#answer-btn-4");
var numOfAnswers = 0;

function generateQuestion() {
  console.log('Questions Length: ' + questions.length);

  var newQuestion = document.querySelector("#question");
  newQuestion.innerHTML = questions[numOfAnswers].question;

  for(var index = 0; index < questions[numOfAnswers].answers.length; index++) {
    console.log(`#answer-btn-${index}`);
    var answerBtn = document.querySelector(`#answer-btn-${index+1}`)
    answerBtn.innerHTML = `${index +1}. ${questions[numOfAnswers].answers[index]}`
  }

}

function displayQuestionPage() {
  startPage.classList.add("hidden");
  questionPage.classList.remove("hidden");
}

function displayStartPage() {
  startPage.classList.remove("hidden");
  questionPage.classList.add("hidden");
}

function startQuiz() {
  generateQuestion();
  displayQuestionPage();

}

const answerClicked = (event) => {
  console.log('Button Clicked: ' + event.target.id);
}

// Add event listener to generate button
startBtn.addEventListener("click", startQuiz);
answerBtn1.addEventListener("click", answerClicked);
answerBtn2.addEventListener("click", answerClicked);
answerBtn3.addEventListener("click", answerClicked);
answerBtn4.addEventListener("click", answerClicked);
