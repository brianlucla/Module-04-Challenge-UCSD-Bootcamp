// timer function setup

var timerEl = document.getElementById("time-tracker");
var time;
var timeInterval;

// score tracker setup
var scoreEl = document.getElementById("score-tracker");
var score = 0;

// buttons setup

var startButtonEl = document.getElementById("start-button");
var submitButtonEl = document.getElementById("submit-button");

// quiz state tracker set up

var gameBool = true;
var gameTrack = 0;

// hide elements on quiz start setup

var pEl = document.querySelector("p");

// reveal elements on quiz end

var submitEl = document.getElementById("quiz-end");

// initials save element

var initialsEl = document.getElementById("initial-input");

// questions setup

var questionEl = document.getElementById("title-question");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");

var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

// set time according to number of questions
time = questions.length * 15;

function timerLogic() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    time = 0;
    clearInterval(timeInterval);
    gameEnd();
  }
}

// start game

function startQuiz() {
  // display setup
  pEl.style.display = "none";
  startButtonEl.style.display = "none";

  questionEl.textContent = questions[0].title;
  answer1El.textContent = questions[0].choices[0];
  answer2El.textContent = questions[0].choices[1];
  answer3El.textContent = questions[0].choices[2];
  answer4El.textContent = questions[0].choices[3];

  answer1El.style.display = "inline-block";
  answer2El.style.display = "inline-block";
  answer3El.style.display = "inline-block";
  answer4El.style.display = "inline-block";

  timeInterval = setInterval(timerLogic, 1000);
}

// event listeners for quiz

function updateQuestions(index) {
  questionEl.textContent = questions[index].title;
  answer1El.textContent = questions[index].choices[0];
  answer2El.textContent = questions[index].choices[1];
  answer3El.textContent = questions[index].choices[2];
  answer4El.textContent = questions[index].choices[3];
}

startButtonEl.addEventListener("click", function () {
  startQuiz();
});

answer1El.addEventListener("click", function () {
  if (gameTrack < questions.length - 1) {
    if (answer1El.textContent === questions[gameTrack].answer) {
      score += 100;
    } else {
      score -= 100;
      time -= 15;
      if (time < 15) {
        clearInterval(timeInterval);
        gameEnd();
      }
    }
    gameTrack++;
    updateQuestions(gameTrack);
  } else {
    gameEnd();
    clearInterval(timeInterval);
  }
});

answer2El.addEventListener("click", function () {
  if (gameTrack < questions.length - 1) {
    if (answer2El.textContent === questions[gameTrack].answer) {
      score += 100;
    } else {
      score -= 100;
      time -= 15;
      if (time < 15) {
        clearInterval(timeInterval);
        gameEnd();
      }
      gameTrack++;
      console.log(gameTrack);
      updateQuestions(gameTrack);
    }
  } else {
    gameEnd();
    clearInterval(timeInterval);
  }
});

answer3El.addEventListener("click", function () {
  if (gameTrack < questions.length - 1) {
    if (answer3El.textContent === questions[gameTrack].answer) {
      score += 100;
      gameTrack++;
      updateQuestions(gameTrack);
    } else {
      score -= 100;
      time -= 15;
      if (time < 15) {
        clearInterval(timeInterval);
        gameEnd();
      }
      gameTrack++;
      updateQuestions(gameTrack);
    }
  } else {
    gameEnd();
    clearInterval(timeInterval);
  }
});

answer4El.addEventListener("click", function () {
  if (gameTrack < questions.length - 1) {
    if (answer4El.textContent === questions[gameTrack].answer) {
      score += 100;
    } else {
      score -= 100;
      time -= 15;
      if (time < 15) {
        gameEnd();
        clearInterval(timeInterval);
      }
    }
    gameTrack++;
    updateQuestions(gameTrack);
  } else {
    gameEnd();
    clearInterval(timeInterval);
  }
});

// function to check if quiz is finished

function gameEnd() {
  timerEl.textContent = 0;
  questionEl.textContent = "All done!";
  pEl.textContent = "Your final score is: " + score;
  pEl.style.display = "block";
  answer1El.style.display = "none";
  answer2El.style.display = "none";
  answer3El.style.display = "none";
  answer4El.style.display = "none";
  submitEl.style.display = "flex";
  submitEl.style.flexDirection = "row";
  submitEl.style.justifyContent = "space-between";
  submitEl.style.alignItems = "center";
}

// function to save scores
function saveScores() {
  var initials = initialsEl.value;
  if (initials !== "") {
    var scores = JSON.parse(window.localStorage.getItem('scores')) || [];

    var quizObj = {
      userInitial: initials,
      userScore: score,
    };

    scores.push(quizObj);
    window.localStorage.setItem('scores', JSON.stringify(scores));

    window.location.href = "scores.html";
  }
}

// event listeners for submitting score

submitButtonEl.addEventListener("click", function () {
  saveScores();
});

