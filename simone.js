//const axios = require("axios").default;
let testColors = ["B", "G", "R", "Y"];
const rounds = document.getElementById("rounds");
let playing;
let greetingInterval = 120;
let roundInterval = 400;
let correctSequence = [];
let userSequence = [];
let currentRound = 1;

//starts the first round of the game
async function startGame() {
   gameListeners(); //initialize the event listeners for the color buttons
   if(rounds.value < 1) {
       rounds.value = 10;
   }
   correctSequence = await getSolutionSequence(rounds.value);
   currentRound = 1;
   userSequence = [];
   let greeting = await getStartSequence();
   //play the greeting
   for(var i=0; i<greeting.length; i++) {
       await new Promise((resolve) =>
       setTimeout(() => {
           resolve();
        }, 120)
        );
       playColor(greeting[i]);
       await new Promise((resolve) =>
       setTimeout(() => {
           resolve();
        }, 120)
        );
   }
   await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 3000)
    );
   playColor(correctSequence[0]); //play the first color of the solution sequence
}

let playButton = document.querySelector("#play");  //clicking the play button starts the game
playButton.addEventListener("click", function() {
    if(playing != true) {
        startGame();
        playing = true;
    }
});

//given an input character, this function plays the correct sound, and lights up the correct
//color button corresponding to the character that was input.
//@param c the character to determine which color to play. The only inputs passed into this function will be 
//"R", "B", "G", or "Y".
async function playColor(c) {
    await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, 400)
           );
    if(c == "R") {
        redGo(roundInterval);
    }
    else if(c == "B") {
        blueGo(roundInterval);
    }
    else if(c == "G") {
        greenGo(roundInterval);
    }
    else if(c == "Y") {
        yellowGo(roundInterval);
    }
    await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, 400)
           );
}

//simulates a button press by lighting up and playing the correct sound for the color
async function redGo(interval) {
    let redSq = document.querySelector("#redSq");
    redSq.classList.add("lightred");
    new Audio("sounds/red.wav").play();
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve(); 
        }, interval)
    );
    redSq.classList.remove("lightred");
}

//simulates a button press by lighting up and playing the correct sound for the color
async function blueGo(interval) {
    let blueSq = document.querySelector("#blueSq");
    blueSq.classList.add("lightblue");
    new Audio("sounds/blue.wav").play();
     await new Promise((resolve) =>
        setTimeout(() => {
            resolve(); 
        }, interval)
    );
    blueSq.classList.remove("lightblue");
}

//simulates a button press by lighting up and playing the correct sound for the color
async function greenGo(interval) {
    let greenSq = document.querySelector("#greenSq");
    greenSq.classList.add("lightgreen");
    new Audio("sounds/green.wav").play();
     await new Promise((resolve) =>
        setTimeout(() => {
            resolve(); 
        }, interval)
    );
    greenSq.classList.remove("lightgreen");
}

//simulates a button press by lighting up and playing the correct sound for the color
async function yellowGo(interval) {
    let yellowSq = document.querySelector("#yellowSq");
    yellowSq.classList.add("lightyellow");
    new Audio("sounds/yellow.wav").play();
     await new Promise((resolve) =>
        setTimeout(() => {
            resolve(); 
        }, interval)
    );
    yellowSq.classList.remove("lightyellow");
}

//checks if the current sequence that the user has input matches the solution sequence. 
function isCorrectSequence() {
    for(var i=0; i<userSequence.length; i++) {
        if(userSequence[i] != correctSequence[i]) {
            return false;
        }
    }
    return true;
}

//this function is called whenever a user presses a color. It checks if the input was
//correct of not and then updates the game status accordingly.
async function updateGameStatus() {
    //the user put in a wrong color. They lose
    if(!isCorrectSequence()) {
        gameOverLose();
    }
    //the user put in the correct sequence on the final round. They win!
    else if(isCorrectSequence() && userSequence.length == rounds.value){
        gameOverWin();
    }
    else {
        //if the user has put in the correct sequence for the entire current round, start the next round
        //otherwise do nothing and wait for more inputs
        if(userSequence.length == currentRound) {
            currentRound++;
            if(userSequence.length == currentRound-1) {
                userSequence = [];
                new Audio("sounds/nextRound.wav").play();
                document.querySelector("#status").innerHTML = "Good job! Prepare for next round";
            }
            await new Promise((resolve) =>
            setTimeout(() => {
                resolve(); 
            }, 800)
            );
            document.querySelector("#status").innerHTML = "Round " + currentRound + " of " + rounds.value;
            for(var i=0; i<currentRound; i++) {
                await new Promise((resolve) =>
                    setTimeout(() => {
                    resolve(); 
                }, 400)
                );
                playColor(correctSequence[i]);
                await new Promise((resolve) =>
                    setTimeout(() => {
                    resolve(); 
                    }, 400)
                );
            }
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve(); 
                }, 800)
            );
        }
    }
}

//called when the user loses; plays the loss sound, changes the background to hot pink, and tells the user the game is over
function gameOverLose() {
    let status = document.querySelector("#status");
    status.innerHTML = "Incorrect, game over!";
    document.querySelector("body").style.backgroundColor = "hotpink";
    new Audio("sounds/lose.wav").play();
}

//called when the user wins; plays the win sound, changes the background color to blue, and tells the user they won
function gameOverWin() {
    let status = document.querySelector("#status");
    status.innerHTML = "Yay you win!";
    document.querySelector("body").style.backgroundColor = "DeepSkyBlue";
    new Audio("sounds/win.mp3").play();
}

//listeners for each color button to display correct behavior during gameplay.
//Each time a color is clicked it also calls updateGameStatus to determine what action, if any,
//needs to be taken.
function gameListeners() {
    //red button
    let redSq = document.querySelector("#redSq");
    redSq.addEventListener("mouseover", function() {
        redSq.classList.add("hover");
    });
    redSq.addEventListener("mouseout", function() {
        redSq.classList.remove("hover");
    });
    redSq.addEventListener("mousedown", function() {
        redSq.classList.add("lightred");
    });
    redSq.addEventListener("mouseout", function() {
        redSq.classList.remove("lightred");
    });
    redSq.addEventListener("mouseup", function() {
        redSq.classList.remove("lightred");
        new Audio("sounds/red.wav").play();
         userSequence.push("R");
         if(!isCorrectSequence()) {
            new Audio("sounds/wrong.wav").play();
            updateGameStatus();
         }
         else if(isCorrectSequence && userSequence.length<currentRound-2) {}
         else {
            updateGameStatus();
         }
    });

    //blue button
    let blueSq = document.querySelector("#blueSq");
    blueSq.addEventListener("mouseover", function() {
        blueSq.classList.add("hover");
    });
    blueSq.addEventListener("mouseout", function() {
        blueSq.classList.remove("hover");
    });
    blueSq.addEventListener("mousedown", function() {
        blueSq.classList.add("lightblue");
    });
    blueSq.addEventListener("mouseout", function() {
        blueSq.classList.remove("lightblue");
    });
    blueSq.addEventListener("mouseup", function() {
        blueSq.classList.remove("lightblue");
        new Audio("sounds/blue.wav").play();
        userSequence.push("B");
        if(!isCorrectSequence()) {
            new Audio("sounds/wrong.wav").play();
            updateGameStatus();
         }
         else if(isCorrectSequence && userSequence.length<currentRound-2) {}
         else {
            updateGameStatus();
         }
    });

    //green button
    let greenSq = document.querySelector("#greenSq");
    greenSq.addEventListener("mouseover", function() {
        greenSq.classList.add("hover");
    });
    greenSq.addEventListener("mouseout", function() {
        greenSq.classList.remove("hover");
    });
    greenSq.addEventListener("mousedown", function() {
        greenSq.classList.add("lightgreen");
    });
    greenSq.addEventListener("mouseout", function() {
        greenSq.classList.remove("lightgreen");
    });
    greenSq.addEventListener("mouseup", function() {
        greenSq.classList.remove("lightgreen");
        new Audio("sounds/green.wav").play();
         userSequence.push("G");
         if(!isCorrectSequence()) {
            new Audio("sounds/wrong.wav").play();
            updateGameStatus();
         }
         else if(isCorrectSequence && userSequence.length<currentRound-2) {}
         else {
            updateGameStatus();
         }
    });

    //yellow button
    let yellowSq = document.querySelector("#yellowSq");
    yellowSq.addEventListener("mouseover", function() {
        yellowSq.classList.add("hover");
    });
    yellowSq.addEventListener("mouseout", function() {
        yellowSq.classList.remove("hover");
    });
    yellowSq.addEventListener("mousedown", function() {
        yellowSq.classList.add("lightyellow");
    });
    yellowSq.addEventListener("mouseout", function() {
        yellowSq.classList.remove("lightyellow");
    });
    yellowSq.addEventListener("mouseup", function() {
        yellowSq.classList.remove("lightyellow");
        new Audio("sounds/yellow.wav").play();
         userSequence.push("Y");
         if(!isCorrectSequence()) {
            new Audio("sounds/wrong.wav").play();
            updateGameStatus();
         }
         else if(isCorrectSequence && userSequence.length<currentRound-2) {}
         else {
            updateGameStatus();
         }
    });
}

//Retreieves the greeting sequence from the API
async function getStartSequence() {
    try {
      let response = await axios.get(
        "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start"
      );
      return response.data.sequence;
    } catch (error) {
      console.error(error);
    }
}

//Retrieves the solution sequence from the API
//@param rounds the number of rounds to play, which will equal the length of the solution sequence
async function getSolutionSequence(rounds) {
    try {
      let response = await axios.get(
        `http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${rounds}`
      );
      return response.data.key;
    } catch (error) {
      console.error(error);
    }
  }