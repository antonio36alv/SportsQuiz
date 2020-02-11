//TODO store highscores in local storeage
const maxTime = 75;
var highScore;
var seconds;
var questionsAnswered = 0;
// var seconds = maxTime;
var correctAnswers = 0;
var wrongAnswers = 0;
var currentQuestion = 0;
var startBtn = document.getElementById("startButton");

//displays
var timeLeft = document.getElementById("displayTime");
var questionDisplay = document.getElementById("displayQuestion");

var rightDisplay = document.getElementById("displayRight");
rightDisplay.textContent = `Correct Answers: ${correctAnswers}`;

var wrongDisplay = document.getElementById("displayWrong");
wrongDisplay.textContent = `Wrong Answers: ${wrongAnswers}`;

var timer;
var answersDiv = document.getElementById("answersDiv");


var questions = [];
var highScorers = [];
//first answer is always the right answer, however will be displayed in a random order
// // var firstQuestion = {
//     question : "What does UFC stand for?",
//     answers: ["Ultimate Fighting Championship", "Universal fun cup", "U Fork Carrots", "Unified Flamingo Conference"],
// };

questions.push(firstQuestion = {
    question : "What does UFC stand for?",
    answers: ["Ultimate Fighting Championship", "Universal fun cup", "U Fork Carrots", "Unified Flamingo Conference"],
});
//I'll always remember this as the night that Michael Jordan and I combined for 70 points.

questions.push(secondQuestion = { 
    question : "Stacky King once said, \"I'll always remember this as the night that Michael Jordan\n and I combined for 70 points\"." +
    "How many points did he score that night?", 
    answers: ["1", "42", "17", "25"]
});

questions.push(thirdQuestion = {
    question : "NFL \n Recieving yards after the age of 40\nJerry Rice : 2509\nBrett Farve : "+ 
                "?\nEveryone else : 0\nHow yards does Brett Farve have?",
    answers : ["-2 yards", "47 yards", "9 yards", "15 yards"]
});

questions.push(fourthQuestion = {
    question : "What is the most points scored in an NBA Finals Game?",
    answers : ["61 points", "42 points", "55 points", "29 points", "77 points"]
});

questions.push(fifthQuestion = {
    question : "Brazil is the country with the most World Cups, how many do they have?",
    answers : ["5", "3", "2", "7"]
});

questions.push(sixthQuestion = {
    question : "Jamie Moyer is the oldest MLB pitcher to start and win a World Series game. What team did he play for?",
    answers : ["Phillies", "Dodgers", "Yankees", "Cardinals"]
});

// questions.push(secondQuestion={question : "wtf right now", answers: ["0", "1", "2", "3"]} );
var questionsRotation = shuffle(questions);

//TODO implement this and a way to fill it
var highScorePlayer = {

};

//starts quiz, starts the timer at 60 seconds and counts down.
startBtn.addEventListener("click", function() {
    if(startBtn.textContent=="Start!") {
        startBtn.textContent = "Reset";
        startGame();
    } else {
        resetGame();
    }
});

function startGame() {
    currentQuestion = 0;
    displayTime(maxTime);
    timer = setInterval(function() {
        // clearInterval();
        if(seconds > 0) {
            seconds--;
            displayTime(seconds);
            //TODO no time end game condition
        } else {
            alert("game over");
            resetGame();
        }
    }, 1000);
    presentQuestion(questionsRotation[currentQuestion]);
}

function resetGame() {

    questionsAnswered.textContent = (questionsAnswered = 0);
    rightDisplay.textContent = (correctAnswers = 0);
    wrongDisplay.textContent = (wrongAnswers = 0);
    questionsRotation = shuffle(questions);
    currentQuestion = randomNumber(questions.length);
    clearInterval(timer);
    startGame();
}

function displayTime(time){
    seconds = time;
    timeLeft.textContent = time;
}
//function presentQuestion(element)
function presentQuestion(questionIndex){
    console.log(questionIndex);
    let presentQ = questionsRotation[questionIndex];
    //random number for picking a question to present
    // currentQuestion = questionIndex;
    console.log(presentQ);
    questionDisplay.textContent = questions[presentQ].question + "   " + presentQ;

    // presentQuestion(questionsRotation[currentQuestion + 1]);

    //we have a question presented now
    //present the answers in a random order
    //will return an array 0-n but in a random order
    //n = the lenght of questions
    let answersRotation = shuffle(questions[presentQ].answers);

    while(answersDiv.firstChild) {
        //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        answersDiv.removeChild(answersDiv.firstChild);
    }

    for(i = 0; i < (questions[presentQ].answers.length); i++){
        
        let answerBtn = document.createElement("button");
        answerBtn.textContent = questions[presentQ].answers[answersRotation[i]];
        answerBtn.setAttribute("value", questions[presentQ].answers.indexOf(answerBtn.textContent));
        answersDiv.appendChild(answerBtn);
    }

    for(i = 0; i < answersDiv.childElementCount; i++) {
        answersDiv.children[i].addEventListener("click", checkAnswer)
    }
}

function checkAnswer(event) {
    if(event.target.value==0) {
        correctAnswers+=1;
        rightDisplay.textContent = correctAnswers;

        //TODO change to something more appropiate, aka not an alert
    } else {
        wrongAnswers+=1;
        wrongDisplay.textContent = wrongAnswers;
        let timePenalty = seconds - 5;
        displayTime(timePenalty);
        //TODO call displayTime function and subtract time 
    }
    console.log(questionsAnswered + "bf");

    questionsAnswered++;
    console.log(questionsAnswered + "af");
    console.log(questions.length + "lenght");
    let mess;
    if(questionsAnswered === questions.length) {
        console.log("alll answered reseting")
        resetGame();
        mess = "bless this mess";
    } else {
    console.log(questionsRotation[currentQuestion] + "what time is it");
    console.log(currentQuestion + mess);
    // console.log(questionsRotation[currentQuestion + 1]);

    presentQuestion(questionsRotation[currentQuestion+=1]);
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(array) {

    let shuffledArray = [];
    //TODO comment this code
    var control= -1;//control variable - need better name
    while (shuffledArray.length < array.length) {
        let rando = randomNumber(array.length);

        //if shuffledArray already has a random index (0...array.length)
        if(shuffledArray.includes(rando)){
            let ind = shuffledArray.indexOf(rando);
            shuffledArray.splice(ind, 1, rando);
            
        } else {
            shuffledArray.push(rando);
                if(control<array.length-1) {
                    control++;
                }
        }
    }
    return shuffledArray;
}