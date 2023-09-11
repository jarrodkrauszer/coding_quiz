const questions = [
  {
    question: 'Javascript is an _______ language?',
    answers: ['object-oriented', 'object-based', 'procedural', 'none of the above'],
    correctAnswer: 'object-oriented' 
  },
  {
    question: 'Commonly used data types do not include:',
    answers: ['strings', 'booleans', 'alerts', 'numbers'],
    correctAnswer: 'alerts' 
  },
  {
    question: 'Which of the following keywords is used to define a variable in Javascript?',
    answers: ['var', 'let', 'both a and b', 'none of the above'],
    correctAnswer: 'both a and b' 
  },
  {
    question: 'Which of the following methods is used to access HTML elements using Javascript?',
    answers: ['getElementByID()', 'getElementsByClassName()', 'both a and b', 'none of the above'],
    correctAnswer: 'both a and b'
  },
  {
    question: 'You can use a text string as a literal value or assign it to a variable.',
    answers: ['true', 'false'],
    correctAnswer: 'true'
  },
  {
    question: 'Which of the following methods can be used to display data in some form using Javascript?',
    answers: ['document.Write()', 'console.log()', 'window.alert()', 'all the above'],
    correctAnswer: 'all the above' 
  }
];

// Assignment Code
var startBtn = document.querySelector("#start-quiz");
var submitScoreBtn = document.querySelector('#submit-score');
var startPage = document.querySelector("#start-page");
var questionPage = document.querySelector("#question-page");
var resultPage = document.querySelector('#result-popup')
var gameOverPage = document.querySelector('#game-over');


// Global Variables
var numOfAnswers = 0;
var score = 0;
var lastPageDisplayed = 'start-page';

function displayStartPage() {
  startPage.classList.remove('hidden');
  questionPage.classList.add('hidden');
  gameOverPage.classList.add('hidden');
  lastPageDisplayed = 'start-page';
}

function displayQuestionPage() {
  questionPage.classList.remove('hidden');
  startPage.classList.add('hidden');
  gameOverPage.classList.add('hidden');
  lastPageDisplayed = 'question-page';
}

function displayGameOverPage() {
  gameOverPage.classList.remove('hidden');
  startPage.classList.add('hidden');
  questionPage.classList.add('hidden');
  lastPageDisplayed = 'game-over';
}

function hideResultPopup() {
  resultPage.classList.add("hidden");
}

function generateQuestion() {
  var answerBtnContainer = document.querySelector("#answer-buttons");
  answerBtnContainer.innerHTML = '';

  var newQuestion = document.querySelector("#question");
  var questionIndex = 1;
  newQuestion.innerText = questions[numOfAnswers].question;

  // Generates the answer buttons
  questions[numOfAnswers].answers.forEach((answer) => {
    var answerBtn = document.createElement('button');
    answerBtn.id = `#answer-btn-${questionIndex}`;
    answerBtn.classList.add('answer-btn');
    // answerBtn.setAttribute('id', `#answer-btn-${questionIndex}`);
    // answerBtn.setAttribute('class', 'answer-btn');
    var text = document.createTextNode(`${questionIndex}. ${answer}`);
    answerBtn.appendChild(text);
    answerBtnContainer.appendChild(answerBtn);

    answerBtn.addEventListener("click", answerClicked);
    questionIndex++;

  }); 

}

function gameOver () {
  displayGameOverPage();
 
  var finalScore = document.querySelector('#final-score-text');
  finalScore.innerText = `You final score is ${score}.`;

  numOfAnswers = 0;
}

function checkAnswer(answerIndex) {
  var resultText = document.querySelector('#result-text');
  var result = '';
  
  if(questions[numOfAnswers].answers[answerIndex] === questions[numOfAnswers].correctAnswer) {
    result = 'Correct!';
    score++;
  } else {
    result = 'Wrong!'; 
    score--;
  }

  resultText.innerText = result;
  resultPage.classList.remove('hidden');
  setTimeout(hideResultPopup, 1500);

  numOfAnswers++;
  if (numOfAnswers < questions.length) {
    generateQuestion();
  } else {
    setTimeout(gameOver, 1000);
  }
}

function submitScore() {
  var initials = document.querySelector('#initials');

  console.log('Initials: ' + initials.value);
}

function startQuiz() {
  numOfAnswers = 0;
  generateQuestion();
  displayQuestionPage();
}

// Button Click Event for the answer buttons  
const answerClicked = (event) => {
  var buttonPressed = parseInt(event.target.id.slice(-1)) ;
  checkAnswer(buttonPressed - 1);
}

// Add event listener to generate button
startBtn.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", submitScore);