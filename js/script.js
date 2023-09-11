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
    question: 'You can use a text string as a literal value or assign it to a variable.',
    answers: ['true', 'false'],
    correctAnswerID: 0 
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

// Variables
var numOfAnswers = 0;
var score = 0;

function displayQuestionPage() {
  startPage.classList.add("hidden");
  questionPage.classList.remove("hidden");
}

function displayStartPage() {
  startPage.classList.remove("hidden");
  questionPage.classList.add("hidden");
}

function checkAnswer(buttonIndex) {
  if(questions[numOfAnswers].correctAnswerID === buttonIndex) {
    console.log('Correct!');
    score += 1;
  } else {
    console.log('Wrong!'); 
    score -= 1;
  }

  numOfAnswers++;
  generateQuestion();
}

function generateQuestion() {
  var answerBtnContainer = document.querySelector("#answer-buttons");
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
      questionIndex++;

    });
    
  } else {
    console.log('Game Over!  Your score is: ' + score);
  }
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