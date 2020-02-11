//TODO store highscores in local storeage
const maxTime = 75;
var highScore;
var seconds;
// var seconds = maxTime;

var currentQuestion;

var startBtn = document.getElementById("startButton");

//displays
var timeLeft = document.getElementById("displayTime");
var questionDisplay = document.getElementById("displayQuestion");

var answersDiv = document.getElementById("answersDiv");

var questions = [];

//first answer is always the right answer, however will be displayed in a random order
var firstQuestion = {
    question : "What does UFC stand for?",
    answers: ["0", "1", "2", "3"],//["Ultimate Fighting Championship", "Universal fun cup", "U Fork Carrots", "Unified Flamingo Conference"],
    /*  TODO change answers back*/
    answered : false
};

questions.push(firstQuestion);

//probably maybe till further notice (well till I think of something better)

//array of question objects

//question object eg.
//question : "what is 5"
//wrong answers : ["it is 4", "it is 6", "it is a cat"]
//right answer : "it is 5"
//answered : false
//whether it has been answered or not

//I want 4 answers, one will be the right one

//TODO may or may not be a good idea to create an object for every player
//thats obtains a high score (max 3 players)

// var highScorePlayer = {
//     name;

// };

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
    displayTime(maxTime);
    setInterval(function() {
        if(seconds > 0) {
            seconds--;
            displayTime(seconds);
        }
    }, 1000);
    presentQuestion();
}

function resetGame() {
    displayTime(maxTime);
}

function displayTime(time){
    seconds = time;
    timeLeft.textContent = time;
}
//function presentQuestion(element)
function presentQuestion(){
    //random number for picking a question to present
    let randomIndex = randomNumber(questions.length);

    questionDisplay.textContent = questions[randomIndex].question;
    //we have a question presented now
    //present the answers in a random order
    //will return an array 0-n but in a random order
    //n = the lenght of questions
    let randomOrderArray = shuffle(questions[randomIndex].answers);//randomOrder(questions[randomIndex].answers);

    for(i = 0; i < (questions[randomIndex].answers.length); i++){
            
        let answerBtn = document.createElement("button");
        answerBtn.textContent = questions[randomIndex].answers[randomOrderArray[i]];
        answerBtn.setAttribute("value", questions[randomIndex].answers.indexOf(answerBtn.textContent));
        answersDiv.appendChild(answerBtn);
    }

    for(i = 0; i < answersDiv.childElementCount; i++) {
        //console.log(answersDiv.children[i].value)
        answersDiv.children[i].addEventListener("click", print)
    }
}

function print(e) {

    if(event.target.value==0) {
        // console.log("value 0");
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(array) {

    let shuffledArray = [];

    //TODO comment this code
    var control= -1;//control variable - need better name
    console.log("before")
    console.log(array)
    while (shuffledArray.length < array.length) {
        let rando = randomNumber(array.length);

        //if shuffledArray already has a random index (0...array.length)
        if(shuffledArray.includes(rando)){
            let ind = shuffledArray.indexOf(rando);
            // console.log();
            // shuffledArray.push(rando);
            shuffledArray.splice(ind, 1, rando);
            
            //  test--;
        } else {
            shuffledArray.push(rando);
                if(control<array.length-1) {
                    control++;
                }
        }
    }
    console.log("after")
    console.log(shuffledArray)
    return shuffledArray;
}

// function checkAnswer(e) {
//     // console.log(e.)+
// }