// Global variables
var cursorPosition = 4;
var resultPosition = 0;
var searchString = "";

// Events

// On startup
window.onload = function() {setStartingVariables;}

// When buttons are clicked
document.getElementById("buttonUp").onclick = function () { pressButtonUp() };

// Functions

function pressButtonUp() {
    document.getElementById("buttonUp").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonUp").style.backgroundColor = "whitesmoke" },250);
    cursorPosition -= 1;
    updateCursor();
}

function setStartingVariables() {
    
}

function updateCursor() {
    switch (cursorPosition) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
    }
}