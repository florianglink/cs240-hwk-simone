let testColors = ["B", "G", "R", "Y"];
let rounds = document.querySelector("#rounds").value;
let playing;
let greetingInterval = 120;
let roundInterval = 400;
let correctSequence = [];
let userSequence = [];
let correctSoFar = true;


function getSequence() {
    console.log("entered function");
    correctSequence = [];
    if(rounds < 1) {
        rounds = 10;
    }
    for(var i=0; i<rounds; i++){
        let newColor = testColors[Math.floor(Math.random()*testColors.length)];
        console.log(newColor);
        correctSequence.push(newColor);
    }
}

async function startGame() {
   gameListeners();
   getSequence();
   console.log(correctSequence);
   userSequence = [];
   playGreeting();
   await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 4000)
    );
   for(let i=0; i<correctSequence.length; i++) {
       await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, roundInterval/2)
           );
       for(let j=0; j<i; j++) {
           await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, roundInterval)
           );
           playColor(correctSequence[j]);
           await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, roundInterval/2)
           );
       }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, roundInterval)
        );
   }

}

let playButton = document.querySelector("#play");
playButton.addEventListener("click", function() {
    if(playing != true) {
        startGame();
        playing = true;
    }
});

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

async function playGreeting() {
    for(var i=0; i<12; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, greetingInterval)
        );
        let color = testColors[Math.floor(Math.random()*testColors.length)]
        if(color == "R") {
            redGo(greetingInterval);
        }
        else if(color == "B") {
            blueGo(greetingInterval);
        }
         else if(color == "G") {
            greenGo(greetingInterval);
        }
         else if(color == "Y") {
            yellowGo(greetingInterval);
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, greetingInterval)
        );
    }
}


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



async function test() {
    await redGo(roundInterval);
    await blueGo(roundInterval);
    await yellowGo(roundInterval);
     await new Promise((resolve) =>
        setTimeout(() => {
            resolve(); 
        }, roundInterval/2)
    );
    await yellowGo(roundInterval);
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve(); 
        }, roundInterval/2)
    );
    await greenGo(roundInterval);
    await redGo(roundInterval);
}

//test();

function isCorrectSequence() {
    for(var i=0; i<userSequence.length; i++) {
        if(userSequence[i] != correctSequence[i]) {
            return false;
        }
    }
    return true;
}

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
         correctSoFar = isCorrectSequence();

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
        correctSoFar = isCorrectSequence();
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
         correctSoFar = isCorrectSequence();
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
         correctSoFar = isCorrectSequence();
    });
}