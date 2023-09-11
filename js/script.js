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
];

// Assignment Code
var startBtn = document.querySelector("#start-quiz");
var startPage = document.querySelector("#start-page");
var questionPage = document.querySelector("#question-page");
// var answerBtn1 = document.querySelector("#answer-btn-1");
// var answerBtn2 = document.querySelector("#answer-btn-2");
// var answerBtn3 = document.querySelector("#answer-btn-3");
// var answerBtn4 = document.querySelector("#answer-btn-4");

// Variables
var numOfAnswers = 0;
var gameOver = true;
var score = 0;

function checkAnswer(buttonIndex) {

  if(questions[numOfAnswers].correctAnswerID === buttonIndex) {
    console.log('Correct!');
    score += 5;
  } else {
    console.log('Wrong!'); 
    score -= 2;
  }

  numOfAnswers++;
  generateQuestion();
}

function generateQuestion() {
  var answerBtnContainer = document.querySelector("#answer-container");
  answerBtnContainer.innerHTML = '';

  if (numOfAnswers < questions.length) {
    var newQuestion = document.querySelector("#question");
    var questionIndex = 1;
    newQuestion.innerText = questions[numOfAnswers].question;

    questions[numOfAnswers].answers.forEach((answer) => {

      // let answerBtn = document.createElement('button', {
      //   id: `#answer-btn-${questionIndex}`,
      //   class: 'answer-btn'
      // })

      let answerBtn = document.createElement('button');
      answerBtn.setAttribute('id', `#answer-btn-${questionIndex}`);
      answerBtn.setAttribute('class', 'answer-btn');

      answerBtn.innerText = `${questionIndex}. ${answer}`;
      answerBtnContainer.appendChild(answerBtn);
      answerBtn.addEventListener("click", answerClicked);

    });

    // questions[numOfAnswers].answers.forEach((answer) => {
    //   var answerBtn = document.querySelector(`#answer-btn-${questionIndex}`)
    //   answerBtn.innerText = `${questionIndex}. ${answer}`
    //   questionIndex++;
    // });
    
  } else {
    console.log('Game Over!');
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
  gameOver = false;
  generateQuestion();
  displayQuestionPage();

}

const answerClicked = (event) => {
  var buttonPressed = parseInt(event.target.id.slice(-1)) ;
  checkAnswer(buttonPressed - 1);
}

// Add event listener to generate button
startBtn.addEventListener("click", startQuiz);
// answerBtn1.addEventListener("click", answerClicked);
// answerBtn2.addEventListener("click", answerClicked);
// answerBtn3.addEventListener("click", answerClicked);
// answerBtn4.addEventListener("click", answerClicked);
