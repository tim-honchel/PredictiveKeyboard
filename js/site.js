// Global variables
var selectorPosition;
var cursorPosition;
var resultPosition;
var searchString;

// Events

// On startup
window.onload = setStartingVariables();

// When buttons are clicked
document.getElementById("buttonUp").onclick = function () { pressButtonUp() };
document.getElementById("buttonDown").onclick = function () { pressButtonDown() };
document.getElementById("buttonLeft").onclick = function () { pressButtonLeft() };
document.getElementById("buttonRight").onclick = function () { pressButtonRight() };
document.getElementById("buttonCenter").onclick = function () { pressButtonCenter() };

// When keys are pressed
document.addEventListener('keydown', function(logKey) {
    switch (logKey.keyCode) {
        case 37:
            pressButtonLeft();
            break;
        case 38:
            pressButtonUp();
            break;
        case 39:
            pressButtonRight();
            break;
        case 40:
            pressButtonDown();
            break;
        case 12:
            pressButtonCenter();
            break;
        default:
            break;
    }
});

// Functions

function chooseSelector() {
    
    document.getElementById("cursor1").style.color = "beige";
    document.getElementById("cursor2").style.color = "beige";
    document.getElementById("cursor3").style.color = "beige";
    document.getElementById("cursor4").style.color = "beige";
    document.getElementById("cursor5").style.color = "beige";
    document.getElementById("cursor6").style.color = "beige";
    document.getElementById("cursor7").style.color = "beige";
    document.getElementById("selection1").style.color = "beige";
    document.getElementById("selection2").style.color = "beige";
    document.getElementById("selection3").style.color = "beige";
    document.getElementById("selection4").style.color = "beige";
    document.getElementById("selection5").style.color = "beige";
    document.getElementById("selection6").style.color = "beige";
    document.getElementById("selection7").style.color = "beige";
    document.getElementById("selection8").style.color = "beige";
    document.getElementById("selection9").style.color = "beige";
    switch (selectorPosition) {
        case "cursor":
            updateCursor();
            break;
        case "result":
            updateResult();
            break;
        case "complete":
            completeSearch();
            break;
    }
    
}

function completeSearch() {
    document.getElementById("buttonCenter").innerHTML = "Done!";
    document.getElementById("buttonCenter").style.backgroundColor = "red";
    document.getElementById("finished").innerHTML = "Search complete! Press backspace to start a new search.";
}

function pressButtonUp() {
    document.getElementById("buttonUp").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonUp").style.backgroundColor = "whitesmoke" },250);
    if (selectorPosition == "cursor" && cursorPosition >0) {
        cursorPosition -= 1;
    }
    else if (selectorPosition == "result" && resultPosition >1) {
        resultPosition -= 1;
    }
    chooseSelector();
}

function pressButtonDown() {
    document.getElementById("buttonDown").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonDown").style.backgroundColor = "whitesmoke" },250);
    if (selectorPosition == "cursor" && cursorPosition <8) {
        cursorPosition += 1;
    }
    else if (selectorPosition == "result" && resultPosition <9) {
        resultPosition += 1;
    }
    chooseSelector();
}

function pressButtonLeft() {
    document.getElementById("buttonLeft").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonLeft").style.backgroundColor = "whitesmoke" },250);
    switch (selectorPosition) {
        case "cursor":
            break;
        case "result":
            selectorPosition = "cursor";
            resultPosition = 1;
            break;
        case "complete":
            setStartingVariables();
            break;
    }
    chooseSelector();
}

function pressButtonRight() {
    document.getElementById("buttonRight").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonRight").style.backgroundColor = "whitesmoke" },250);
    chooseSelector();
}

function pressButtonCenter() {
    document.getElementById("buttonCenter").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonCenter").style.backgroundColor = "whitesmoke" },250);
    switch (selectorPosition) {
        case "cursor":
            selectorPosition = "result";
            break; 
        case "result":
            selectorPosition = "complete";
    }
    chooseSelector();
}

function setStartingVariables() {
    selectorPosition = "cursor"
    cursorPosition = 4;
    resultPosition = 1;
    searchString = "";
    document.getElementById("finished").innerHTML = "";
    
}

function updateCursor() {
    switch (cursorPosition) {
        case 1:
            document.getElementById("cursor1").style.color = "black";
            break;
        case 2:
            document.getElementById("cursor2").style.color = "black";
            break;
        case 3:
            document.getElementById("cursor3").style.color = "black";
            break;
        case 4:
            document.getElementById("cursor4").style.color = "black";
            break;
        case 5:
            document.getElementById("cursor5").style.color = "black";
            break;
        case 6:
            document.getElementById("cursor6").style.color = "black";
            break;
        case 7:
            document.getElementById("cursor7").style.color = "black";
            break;
    }
}

function updateResult() {
    
    switch (resultPosition) {
        case 1:
            document.getElementById("selection1").style.color = "black";
            break;
        case 2:
            document.getElementById("selection2").style.color = "black";
            break;
        case 3:
            document.getElementById("selection3").style.color = "black";
            break;
        case 4:
            document.getElementById("selection4").style.color = "black";
            break;
        case 5:
            document.getElementById("selection5").style.color = "black";
            break;
        case 6:
            document.getElementById("selection6").style.color = "black";
            break;
        case 7:
            document.getElementById("selection7").style.color = "black";
            break;
        case 8:
            document.getElementById("selection8").style.color = "black";
            break;
        case 9:
            document.getElementById("selection9").style.color = "black";
            break;
    }
}