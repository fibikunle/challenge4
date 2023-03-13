var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var containerEndEl = document.getElementById("end-container")
var containerquizEl = document.getElementById("quiz-container");
var containerStartEl = document.getElementById("starter-article");
//buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");
//quizs and answers element
var quizEl = document.getElementById("quiz");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//High Score Array
var HighScores = [];

 //assign array details for quizs 
var arrayShuffledquizs
var quizIndex = 0

//Quiz questions
var quizs = [
    { q: 'Arrays in Javascript can be used to store __________.', 
      a: '4. all of the above', 
      choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays'}, {choice: '3. booleans'}, {choice: '4. all of the above'}]
    },
    { q: 'Commonly used data types DO NOT include:', 
      a: '3. alerts', 
      choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}]
    },
    { q: 'String values must be enclosed within ________ when being assigned to variables', 
      a: '3. quotes', 
      choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. parenthesis'}]
    },
    { q: 'The condition in an if/else statement is enclosed within ________', 
      a: '3. parentheses', 
      choices: [{choice: '1. quotes'}, {choice: '2. curly brackets'}, {choice: '3. parentheses'}, {choice: '4. square brackets'}]
    },
    { q: 'A very useful tool used during development and debugging for printing content to the debuggger is:', 
      a: '4. console log', 
      choices: [{choice: '1. JavaScript'}, {choice: '2. terminal / bash'}, {choice: '3. for loops'}, {choice: '4. console log'}]
    },
  ];
  
    //go back button is hit on high score page
  var renderStartPage = function () {
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    quizIndex = 0
    gameover = ""
    timerEl.textContent = 0 
    score = 0
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
  
    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
  }
  
  //Time left set to 75 
  var setTime = function () {
    timeleft = 75;
  
  var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--
  
    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }
  
    }, 1000)
  }
  
  var startGame = function() {
    //classes to show & hide start and quiz display
    containerquizEl.classList.remove('hide');
    containerStartEl.classList.remove('show');
    containerquizEl.classList.add('show');
    containerStartEl.classList.add('hide');
    
 
    // //Quiz showing up randomly 
    arrayShuffledquizs = quizs.sort(() => Math.random() - 0.5)

    setTime()
    setquiz()
  }
  
  //set next quiz for quiz
  var setquiz = function() {
    resetAnswers()
    displayquiz(arrayShuffledquizs[quizIndex])
  }
  
  //answer buttons to be removed
  var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
  };
  
  //show quiz information 
  var displayquiz = function(index) {
    quizEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
        }
    };
  //display correct 
  var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.add("banner")
        correctEl.classList.remove("hide")
        wrongEl.classList.add("hide")
        wrongEl.classList.remove("banner")
        }
    }  
  //display "wrong" 
  var answerWrong = function() {
    if (wrongEl.className = "hide") {
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
        wrongEl.classList.add("banner")
        wrongEl.classList.remove("hide")
    }
  }
  
  //correct answer check    
  var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffledquizs[quizIndex].a === selectedanswer.innerText){
            answerCorrect()
            score = score + 7
        }
  
        else {
          answerWrong()
          score = score - 1;
          timeleft = timeleft - 10;
      };
  
    //next quiz, check if there is more quizs
      quizIndex++
        if  (arrayShuffledquizs.length > quizIndex + 1) {
            setquiz()
        }   
        else {
           gameover = "true";
           showScore();
            }
  }
  
    //show total score screen at end of quiz
  var showScore = function () {
    
    containerquizEl.classList.add("hide");
    containerEndEl.classList.add("show");
    containerEndEl.classList.remove("hide");
  
    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score);
    containerScoreEl.appendChild(scoreDisplay);
  }       
  
  //high score values
  var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
      alert("Enter your intials");
      return;
    }
  
  formInitials.reset();
  
  var HighScore = {
  initials: initials,
  score: score
  } 
  
  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {return b.score-a.score});
  
  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
   listHighScoreEl.removeChild(listHighScoreEl.firstChild)
  }
  //create elements in order of high scores
  for (var i = 0; i < HighScores.length; i++) {
  var highscoreEl = document.createElement("li");
  highscoreEl.ClassName = "high-score";
  highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
  listHighScoreEl.appendChild(highscoreEl);
  }
  
  saveHighScore();
  displayHighScores();
  
  }
  //save high score
  var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
        
  }
  
  //load values/called on page load
  var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
        if (!LoadedHighScores) {
        return false;
    }
  
    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})
  
  
    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
  
        HighScores.push(LoadedHighScores[i]);
        
    }
  }  
  
  //show high score screen from link or when intiials entered
  var displayHighScores = function() {
  
    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"
  
    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
        }
                
    if (containerquizEl.className = "show") {
        containerquizEl.classList.remove("show");
        containerquizEl.classList.add("hide");
        }

    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
        }
  
    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
        } 
  }
  //clears high scores
  var clearScores = function () {
    HighScores = [];
  
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }
  
    localStorage.clear(HighScores);
  
  } 
  
  loadHighScore()
    
  //on start click, start game
  btnStartEl.addEventListener("click", startGame)
  //on submit button, enter or click
  formInitials.addEventListener("submit", createHighScore)
  //when view high-scores is clicked
  ViewHighScoreEl.addEventListener("click", displayHighScores)
  //clear scores button
  btnClearScoresEl.addEventListener("click", clearScores)
  //Go back button
  btnGoBackEl.addEventListener("click", renderStartPage)

