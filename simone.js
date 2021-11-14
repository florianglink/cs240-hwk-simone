let testColors = ["B", "G", "R", "Y"];
let rounds = document.querySelector("#rounds").value;
let playing;


function getSequence() {
    var sequence = [];
    for(var i=0; i<rounds; i++){
        sequence.push(testColors[Math.floor(Math.random()*testColors.length)]);
    }
    return sequence;
}

function startGame() {
    gameListeners();
}
gameListeners();

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
    });
}