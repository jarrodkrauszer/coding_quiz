// Assignment Code
var startBtn = document.querySelector("#start-quiz");
var submitScoreBtn = document.querySelector('#submit-score');
var startPage = document.querySelector("#start-page");
var questionPage = document.querySelector("#question-page");
var resultPage = document.querySelector('#result-popup')
var gameOverPage = document.querySelector('#game-over');
var timeLeft = document.querySelector('#timer');

// Global Variables
var numOfAnswers = 0;
var score = 0;
var gameTimer = 0;
var timerInterval;

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

    // Add the button's event listener
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
    gameTimer -= 10;
  }

  if (gameTimer < 0) {
    gameTimer = 0;
  }

  resultText.innerText = result;
  resultPage.classList.remove('hidden');
  setTimeout(hideResultPopup, 1500);

  numOfAnswers++;

  if (gameTimer === 0 || numOfAnswers === questions.length) {
    setTimeout(gameOver, 1000);
    gameTimer = 0;
    timeLeft.textContent = gameTimer;
    clearInterval(timerInterval);
  } else {
    generateQuestion();
  }
}

function submitScore() {
  var initials = document.querySelector('#initials');
  
  var player = {
    name: initials.value,
    highScore: score
  };
  
  if(initials.value.length !== 0) {
    addPlayerToStorage(player);
    initials.value = '';
  }

  displayStartPage();
}

function addPlayerToStorage(player) {
  const playersFromStorage = getPlayersFromStorage();
  
  // Add new player to array
  playersFromStorage.push(player);

  // Convert to JSON string and set to local storage
  localStorage.setItem('player', JSON.stringify(playersFromStorage));
}

function getPlayersFromStorage() {
  let playersFromStorage;

  if (localStorage.getItem('player') === null) {
    playersFromStorage = [];
  } else {
    playersFromStorage = JSON.parse(localStorage.getItem('player'));
  }

  return playersFromStorage;
}

// function checkIfPlayerExists(player) {
//   const playersFromStorage = getPlayersFromStorage();
//   return playersFromStorage.includes(player);
// }

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    gameTimer--;
    timeLeft.textContent = gameTimer;

    if(gameTimer === 0) {
      clearInterval(timerInterval);
      gameOver();
    }

  }, 1000);
}

function startQuiz(e) {
  
  numOfAnswers = 0;
  gameTimer = 60;
  score = 0;
  setTime();
  generateQuestion();
  displayQuestionPage();
}

// Button Click Event for the answer buttons  
const answerClicked = (e) => {
  var answer = e.target.innerText.slice(3);
  checkAnswer(answer)
}

// Add event listener to generate button events
startBtn.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", submitScore);
// answerBtnContainer.addEventListener("click", answerClicked);
