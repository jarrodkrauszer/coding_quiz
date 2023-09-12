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
var gameTimer = 0;

function displayStartPage() {
  startPage.classList.remove('hidden');
  questionPage.classList.add('hidden');
  gameOverPage.classList.add('hidden');
}

function displayQuestionPage() {
  questionPage.classList.remove('hidden');
  startPage.classList.add('hidden');
  gameOverPage.classList.add('hidden');
}

function displayGameOverPage() {
  gameOverPage.classList.remove('hidden');
  startPage.classList.add('hidden');
  questionPage.classList.add('hidden');
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

function checkAnswer(answer) {
  var resultText = document.querySelector('#result-text');
  var result = '';
  
  if(answer === questions[numOfAnswers].correctAnswer) {
    result = 'Correct!';
    score++;
  } else {
    result = 'Wrong!'; 
  }

  resultText.innerText = result;
  resultPage.classList.remove('hidden');
  setTimeout(hideResultPopup, 1500);

  numOfAnswers++;

  if (gameTimer === 0 || numOfAnswers === questions.length) {
    setTimeout(gameOver, 1000);

  } else {
    generateQuestion();
  }
}

function submitScore() {
  var initials = document.querySelector('#initials');

  console.log('Initials: ' + initials.value);
}

function startQuiz() {
  numOfAnswers = 0;
  gameTimer = 120;
  generateQuestion();
  displayQuestionPage();
}

// Button Click Event for the answer buttons  
const answerClicked = (event) => {
  var answer = event.target.innerText.slice(3);
  checkAnswer(answer)
}

// Add event listener to generate button
startBtn.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", submitScore);