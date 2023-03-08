// Quiz Game
const answersContainerElement = document.querySelector("#answers");
const correctIncorrectText = document.querySelector("#correct-incorrect");
const countdownElement = document.querySelector("#time");
const finishContainerElement = document.querySelector("#finish");
const introContainerElement = document.querySelector("#intro");
const questionContainerElement = document.querySelector("#question");
const quizContainerElement = document.querySelector("#quiz");
const scoreContainerElement = document.querySelector("#score");
const startQuizButtonElement = document.querySelector("#button__start-quiz");
const clearScoresButtonElement = document.querySelector(
  "#button__clear-scores"
);
const initialsInputElement = document.querySelector("#initials");
const formElement = document.querySelector("#form");
const goBackButtonElement = document.querySelector("#button__go-back");
const highListElement = document.querySelector(
  "#high-list"
);
const scoresContainerElement = document.querySelector("#high-scores");

let currentQuestionIndex = 0;
let timeRemaining = 75;
let scoresArray;
if (localStorage.getItem("scores")) {
  scoresArray = JSON.parse(localStorage.getItem("scores"));
} else {
  scoresArray = [];
}
localStorage.setItem("scores", JSON.stringify(scoresArray));
data = JSON.parse(localStorage.getItem("scores"));
const ViewHighScoresLinkElement = document.querySelector("#view-high-scores");

// Array of questions
const questionsArray = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with ______.",
    answers: [
      "quotes",
      "curly brackets",
      "parenthesis",
      "square brackets",
    ],
    correct: "curly brackets",
  },
  {
    question: "Arrays in JavaScript can be used to store what ______.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ______ what when being assigned to variables?",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing consent to the debugger is:",
    answers: [
      "JavaScript",
      "terminal/bash",
      "for loops",
      "console.log",
    ],
    correct: "console.log",
  },
];
ViewHighScoresLinkElement.addEventListener("click", function () {
  scoresContainerElement.classList.remove("hidden");
  introContainerElement.classList.add("hidden");
  quizContainerElement.classList.add("hidden");
  finishContainerElement.classList.add("hidden");
});

startQuizButtonElement.addEventListener("click", startQuiz);

function startQuiz() {
  introContainerElement.classList.add("hidden");
  quizContainerElement.classList.remove("hidden");
  startTimer();
  renderQuestion();
}

function startTimer() {
  countdownElement.textContent = timeRemaining;
  const timeInterval = setInterval(function () {
    timeRemaining--;
    countdownElement.textContent = timeRemaining;
    if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function renderQuestion() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  questionContainerElement.textContent = currentQuestion.question;
  answersContainerElement.innerHTML = "";
  currentQuestion.answers.forEach(function (answer) {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answersContainerElement.appendChild(answerButton);
    answerButton.addEventListener("click", nextQuestion);
  });
}

function nextQuestion() {
  if (this.innerHTML === questionsArray[currentQuestionIndex].correct) {
    correctIncorrectText.innerHTML = "Correct!";
    timeRemaining += 10;
  } else {
    correctIncorrectText.innerHTML = "Incorrect!";
    timeRemaining -= 10;
  }
  currentQuestionIndex++;
  if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

function endQuiz() {
  quizContainerElement.classList.add("hidden");
  finishContainerElement.classList.remove("hidden");
  scoreContainerElement.innerHTML = timeRemaining;
}

function makeLi(text) {
  const li = document.createElement("li");
  li.textContent = text;
  highListElement.appendChild(li);
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  scoresArray.push(initialsInputElement.value + " - " + timeRemaining);
  localStorage.setItem("scores", JSON.stringify(scoresArray));
  makeLi(initialsInputElement.value + " - " + timeRemaining);
  initialsInputElement.value = "";
  finishContainerElement.classList.add("hidden");
  scoresContainerElement.classList.remove("hidden");
});

data.forEach((item) => {
  makeLi(item);
});

goBackButtonElement.addEventListener("click", function () {
  location.reload();
});

clearScoresButtonElement.addEventListener("click", function () {
  localStorage.clear();
  while (highListElement.firstChild) {
    highListElement.removeChild(
      highListElement.firstChild
    );
  }
});