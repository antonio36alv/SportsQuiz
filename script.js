//TODO store highscores in local storeage
const maxTime = 75;
var seconds;
var questionsAnswered = 0;
var timer;
var correctAnswers = 0;
var wrongAnswers = 0;
var currentQuestion = 0;

//displays
var timeLeft = document.getElementById("displayTime");
var questionDisplay = document.getElementById("displayQuestion");
var announcements = document.getElementById("announcements");
var highScorersDisplay = document.getElementById("displayHighScorers");

var rightDisplay = document.getElementById("displayRight");
rightDisplay.textContent = `Correct Answers: ${correctAnswers}`;

var wrongDisplay = document.getElementById("displayWrong");
wrongDisplay.textContent = `Wrong Answers: ${wrongAnswers}`;

var answersDiv = document.getElementById("answersDiv");

//buttons
var startBtn = document.getElementById("startButton");
var enterNameBtn = document.getElementById("enterNameBtn");

var setHighScorersBtn = document.getElementById("seeHighScorers");

var questions = [];

//retrieves highScorers array from local storage or initilizes highScorers as an empty array
//https://stackoverflow.com/questions/43762363/how-to-store-an-array-of-objects-in-local-storage
var highScorers = JSON.parse(localStorage.getItem("highScorers") || "[]");

console.log(highScorers.length);


if(highScorers.length != 0) {
    setHighScorersBtn.style.display = "block";
    setHighScorersBtn.textContent = "Hide";
}

setHighScorersBtn.addEventListener("click", function(){
    if(setHighScorersBtn.textContent == "Hide") {
        highScorersDisplay.textContent = "";
        setHighScorersBtn.textContent = "See High Scores!";

        while(highScorersDisplay.firstChild) {
            highScorersDisplay.removeChild(highScorersDisplay.firstChild);
        }
    } else {
        console.log(highScorers.length)
        setHighScorersBtn.textContent = "Hide";
        for(i = 0; i < highScorers.length; i++) {
        console.log(highScorers[i])

            let p = document.createElement("p");
            // p.textContent = JSON.stringify(highScorers[i]);
            p.textContent = `Name: ${highScorers[i].name} Score: ${highScorers[i].highScore} Time: ${highScorers[i].timeLeft}`;
            highScorersDisplay.appendChild(p);
        }
    }
});

//JUST QUESTIONS**************************************************************
questions.push(question = {
    question : "What does UFC stand for?",
    answers: ["Ultimate Fighting Championship", "Universal fun cup", "U Fork Carrots", "Unified Flamingo Conference"],
});

questions.push(question = { 
    question : "Stacey King once said, \"I'll always remember this as the night that Michael Jordan\n and I combined for 70 points\"." +
    " How many points did Stacey King score that night?", 
    answers: ["1", "42", "17", "25"]
});

questions.push(question = {
    question : "NFL Recieving yards after the age of 40 Jerry Rice : 2509 Brett Farve : __"+ 
                "Everyone else : 0How yards does Brett Farve have?",
    answers : ["-2 yards", "47 yards", "9 yards", "15 yards"]
});

questions.push(question = {
    question : "What is the most points scored in an NBA Finals Game?",
    answers : ["61 points", "42 points", "55 points", "29 points", "77 points"]
});

questions.push(question = {
    question : "Brazil is the country with the most World Cups, how many do they have?",
    answers : ["5", "3", "2", "7"]
});

questions.push(question = {
    question : "Jamie Moyer is the oldest MLB pitcher to start and win a World Series game. What team did he play for?",
    answers : ["Phillies", "Dodgers", "Yankees", "Cardinals"]
});

questions.push(question = {
    question : "Bo Jackson is the only person in history to scored a touchdown (in the NFL) and hit a homerun (in MLB) all in the same week?",
    answers : ["true", "false"]
});

questions.push(question = {
    question : "What is the record for the fastest knockout in UFC history?",
    answers : ["5 seconds", "26 seconds", "4 seconds", "9 seconds"]
});

questions.push(question = {
    question : "Which professional sports franchise holds the msot championships, across all professional sports?",
    answers : ["Yankees", "Lakers", "Patriots", "NJ Devils", "Detriot Lions"]
});

questions.push(question = {
    question : "The NHL record for the most goals scored by a set of brothers is a combined 2,861 goals. Of these 2,861, how many is Wayne Gretzky responbile for?",
    answers : ["2,857", "1,822", "2,091", "1,944"]
});

questions.push(question = {
    question : "Bill Russell is the record holder for winning the most NBA championships, throughout his player career. How many did he win?",
    answers : ["11 championships", "7 championships", "10 championships", "9 championships"]
})
//JUST QUESTIONS**************************************************************END

//our random order of questions
var questionsRotation = shuffle(questions);

//starts quiz if it hasn't been started. turns into reset button after using it as a start button.
startBtn.addEventListener("click", function() {
    if(startBtn.textContent=="Start!") {
        startBtn.textContent = "Reset";
        startGame();
    } else {
        resetGame();
    }
});

function startGame() {
    setAnnouncements("Goodluck!");
    currentQuestion = 0;
    displayTime(maxTime);
    timer = setInterval(function() {
        if(seconds > 0) {
            seconds--;
            displayTime(seconds);
            
        } else {
            clearInterval(timer);
            if(questionsAnswered!=questions.length){
                setAnnouncements("Game Over!");
                checkHighScores(correctAnswers);
            }            
        }
    }, 1000);
    presentQuestion(questionsRotation[currentQuestion]);
}

function resetGame() {
    displayInput(false);
    questionsAnswered.textContent = (questionsAnswered = 0);
    rightDisplay.textContent = (correctAnswers = 0);
    wrongDisplay.textContent = (wrongAnswers = 0);
    questionsRotation = shuffle(questions);
    currentQuestion = randomNumber(questions.length);
    clearInterval(timer);
    startGame();
}

function displayTime(time){
    if(time <= 0) {
        time = 0;
    }
    seconds = time;
    timeLeft.textContent = time;
}

function displayInput(display) {

    if(display) {
        document.getElementById("highScoreInput").style.display = "block";
    } else {
        document.getElementById("highScoreInput").style.display = "none";
    }

    enterNameBtn.addEventListener("click", function(){
        let input = document.getElementById("enterName").value;
        setHighScorers(input);
        displayInput(false);
        setHighScorersBtn.style.display = "block";
        setHighScorersBtn.textContent = "See High Scores!";
    });
}

function setAnnouncements(announcement) {

    announcements.textContent = announcement;
    
    if(announcement==="Correct! Good job!") {
        announcements.style.color = "green";
    } else if (announcement==="Sorry, wrong.") {
        announcements.style.color = "red";
    } else {
        announcements.style.color = "black";
    }
    
    if (announcement.includes("Game Over")) {
        for(i = 0; i < answersDiv.childElementCount; i ++) {
        answersDiv.children[i].disabled = true;
        }
    }
}
var test = 0;
function setHighScorers(userInput) {
    test++;
    //use index to determine which element to splice with our new high scorer
    //max of 3 high scorers
    console.log(highScorers + "  " + test);
    highScorers.push(aHighScorer = {
        name : userInput,
        highScore : correctAnswers,
        timeLeft : seconds
    });
    console.log(highScorers);
    // // localStorage.setItem("highScorers", JSON.stringify(highScorers));
    // if(localStorage.getItem("higScorers").length > 0) {
    //     // localStorage.
    //     highScorers.push
    // }
}

function presentQuestion(questionIndex){
    let presentQ = questionsRotation[questionIndex];
    //random number for picking a question to present
    // currentQuestion = questionIndex;
    questionDisplay.textContent = questions[presentQ].question;

    // presentQuestion(questionsRotation[currentQuestion + 1]);

    //we have a question presented now
    //present the answers in a random order
    //will return an array 0-n but in a random order
    //n = the lenght of questions
    let answersRotation = shuffle(questions[presentQ].answers);

    //removes the previous answers buttons
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
        rightDisplay.textContent = `Correct Answers: ${correctAnswers}`;
        setAnnouncements("Correct! Good job!");
        announcements.style.color = "green";
    } else {
        wrongAnswers+=1;
        wrongDisplay.textContent = `Wrong Answers: ${wrongAnswers}`;
        setAnnouncements("Sorry, wrong.");
        let timePenalty = seconds - 5;
        displayTime(timePenalty);
    }
    questionsAnswered++;
    if(questionsAnswered === questions.length) {
        setAnnouncements("All questions answered, Game Over.");
        checkHighScores(correctAnswers);
        // displayTime(0);
        clearInterval(timer);
    } else {
        presentQuestion(questionsRotation[currentQuestion+=1]);
    }
}
function checkHighScores(name) {
    console.log(highScorers);
    //if there is no one with a high score we will have any player that finishes,
    //whether it is from answering all the questions or time has expired,
    //become our first high scorer
    if(highScorers.length == 0) {
        //TODO change from prompt to a div that shows up when we get here
        
        //user is prompted for their name
        displayInput(true);
        // let inupt = getName();
        //we push that person into the highScorers array
        
    } else {
        //check to see if correctAnswers is greater than the highScore for all the players in the high scorers array

        //function made to see if every high scorer has answered every question correct
        function allScoredCorrectly() {
            //we are keeping a max of 3 high scorers
            //if there are not 3 high scorers we dont care about
            //checking to see if every high scorer has answered every question right
            if(highScorers.length == 3) {
                for(i = 0; i < highScorers.length; i++){
                    if(highScorers[i].correctAnswers != questions.length){
                        //if any previous high scorer did not answer every question right then return
                        return false;
                    }
                }
                return true;//if it exists the loop they have all answered the questions correctly
            } else {
                return false;//or the high scorers array is not full so we dont ever enter the loop
            }
        }
        
        //if not every high scorer has answered every question right then high scorers are based off of who has answered the most right
        if(!allScoredCorrectly()) {
        //loop till we get through every high scorer
            for(i = 0; i < highScorers.length;) {
                //check to see if our current correctAnswers beats previous highScores or is equal to it
                console.log(highScorers.length)
                console.log(highScorers[i].highScore)
                if(correctAnswers >= highScorers[i].highScore) {
                    //we beat a score, display high score input, end loop
                    displayInput(true);
                } else {
                    //didnt beat it increment
                    i++;
                }
                return;
            }
            //full and all answered correctly
        } else {//else every high scorer has answered every question right, so go based off of time
            for(i = 0; i < highScorers.length; i++) {
                if(seconds < highScorers[i].timeLeft) {
                    displayInput(true);
                }
            }
        }
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