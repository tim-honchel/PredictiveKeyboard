﻿// IMPORT ENGLISH DICTIONARY

// From dictionary.js
var wordList = allWords1.concat(allWords2, allWords3, allWords4, allWords5, allWords6, allWords7, allWords8, allWords9, allWords10, allWords11, allWords12, allWords13, allWords14, allWords15, allWords16, allWords17, allWords18, allWords19);

// GLOBAL VARIABLES

// Position of the "mouse"
var selectorLocation;
var characterCursorPosition;
var resultCursorPosition;

// User's search query
var searchString;
var displayString;

// Potential search matches
var shortList;

// Options displayed on keyboard
var character1;
var character2;
var character3;
var character4;
var character5;
var character6;
var character7;
var result1;
var result2;
var result3;
var result4;
var result5;
var result6;
var result7;
var result8;
var result9;

// EVENTS

// On startup
window.onload = setStartingVariables();

// When buttons are clicked
document.getElementById("buttonUp").onclick = function () { pressButtonUp() };
document.getElementById("buttonDown").onclick = function () { pressButtonDown() };
document.getElementById("buttonLeft").onclick = function () { pressButtonLeft() };
document.getElementById("buttonRight").onclick = function () { pressButtonRight() };
document.getElementById("buttonCenter").onclick = function () { pressButtonCenter() };
//document.getElementById("testButton").onclick = function () { document.getElementById("test1").innerHTML = `${selectorLocation}, ${searchString}`; };

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

// FUNCTIONS

// Adds a character to the search string
function addCharacter() {
    var characterToAdd;
    switch (characterCursorPosition) {
        case 1:
            characterToAdd = character1;
            break;
        case 2:
            characterToAdd = character2;
            break;
        case 3:
            characterToAdd = character3;
            break;
        case 4:
            characterToAdd = character4;
            break;
        case 5:
            characterToAdd = character5;
            break;
        case 6:
            characterToAdd = character6;
            break;
        case 7:
            characterToAdd = character7;
            break;
        default:
            characterToAdd = "";
            break;
    }
    searchString += characterToAdd;
    calculateProbabilities();
}

// Adds a space to the seardh string
function addSpace() {
    searchString += "_";
    calculateProbabilities();
}


// Determines probabilities of next character and final query
function calculateProbabilities() {
    // Finds every English word that begins with the current search string and displays the top results
    if (searchString.length > 0) {
        shortList = wordList.filter(word => word.startsWith(searchString.toLowerCase()));
        for( let i = 0; i < shortList.length; i++){ 
            if ( shortList[i].toUpperCase() === searchString) { 
                shortList.splice(i,1); 
            }
        }
        result1 = searchString.toLowerCase();
        result2 = (shortList.length>=1) ? shortList[0]: ".";
        result3 = (shortList.length>=2) ? shortList[1]: ".";
        result4 = (shortList.length>=3) ? shortList[2]: ".";
        result5 = (shortList.length>=4) ? shortList[3]: ".";
        result6 = (shortList.length>=5) ? shortList[4]: ".";
        result7 = (shortList.length>=6) ? shortList[5]: ".";
        result8 = (shortList.length>=7) ? shortList[6]: ".";
        result9 = (shortList.length>=8) ? shortList[7]: ".";
        updateDisplay();
    
        // Finds the most common next characters and displays them as keys
        var nextLetterList = shortList.map((word) => word[searchString.length]);
        var letterList = "abcdefghijklmnopqrstuvwxyz";
        var letterDistribution = [];
        var letterFrequency = 0;
            for (let i = 0; i < letterList.length; i++) {
                letterFrequency = nextLetterList.filter(nextLetter => nextLetter.startsWith(letterList[i])).length;
                if (letterFrequency > 0) {
                    letterDistribution.push([letterList[i],letterFrequency]);
                }
            }
        letterDistribution.sort(function (letter,frequency) {return frequency[1] - letter[1]});
        var top7LetterDistribution = letterDistribution.slice(0,7);
        var top7Letters = top7LetterDistribution.map((pair) => pair[0]).sort().toString().toUpperCase().replaceAll(",","");
        character1 = (top7Letters.length>=1) ? top7Letters[0]: ".";
        character2 = (top7Letters.length>=2) ? top7Letters[1]: ".";
        character3 = (top7Letters.length>=3) ? top7Letters[2]: ".";
        character4 = (top7Letters.length>=4) ? top7Letters[3]: ".";
        character5 = (top7Letters.length>=5) ? top7Letters[4]: ".";
        character6 = (top7Letters.length>=6) ? top7Letters[5]: ".";
        character7 = (top7Letters.length>=7) ? top7Letters[6]: "."; 
    }
    updateDisplay();
}

// Determines where to place the "mouse"
function chooseCursorLocation() {
    
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
    switch (selectorLocation) {
        case "onCharacters":
            updateCharacterCursor();
            break;
        case "onResults":
            updateResultCursor();
            break;
    }
    updateButtonLabels();
}

// Displays after the user completes their search
function completeSearch() {
    selectorLocation = "complete";
    document.getElementById("searchString").style.color = "green";
    document.getElementById("test1").innerHTML = "Search complete! Press backspace to start a new search.";    
    chooseCursorLocation();
}

// Backspaces the last character
function deleteCharacter() {
    if (searchString.length > 0) {
        searchString = searchString.substring(0, searchString.length - 1);
        calculateProbabilities();
    }
    else {
        resetKeyboard();
    }
}

// Determines what to do when the center button is pressed
function pressButtonCenter() {
    document.getElementById("buttonCenter").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonCenter").style.backgroundColor = "whitesmoke" },250);
    switch (selectorLocation) {
        case "onCharacters":
            addCharacter();
            break; 
        case "onResults":
            selectResult();
            break;
    }
}

// Determines what to do when the down button is pressed
function pressButtonDown() {
    document.getElementById("buttonDown").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonDown").style.backgroundColor = "whitesmoke" },250);
    if (selectorLocation == "onCharacters" && characterCursorPosition <8) {
        characterCursorPosition += 1;
    }
    else if (selectorLocation == "onResults" && resultCursorPosition <9) {
        resultCursorPosition += 1;
    }
    chooseCursorLocation();
}

// Determines what to do when the left button is pressed
function pressButtonLeft() {
    document.getElementById("buttonLeft").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonLeft").style.backgroundColor = "whitesmoke" },250);
    switch (selectorLocation) {
        case "onCharacters":
            deleteCharacter();
            break;
        case "onResults":
            selectorLocation = "onCharacters";
            resultCursorPosition = 1;
            chooseCursorLocation();
            break;
        case "complete":
            setStartingVariables();
            break;
    }
    
}

// Determines what to do when the rught button is pressed
function pressButtonRight() {
    document.getElementById("buttonRight").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonRight").style.backgroundColor = "whitesmoke" },250);
    switch (selectorLocation) {
        case "onCharacters":
            selectorLocation = "onResults";
            chooseCursorLocation();
            break;
        case "onResults":
            selectorLocation = "onCharacters";
            addSpace();
            break; 
    }
    
}

// Determines what to do when the up button is pressed
function pressButtonUp() {
    document.getElementById("buttonUp").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonUp").style.backgroundColor = "whitesmoke" },250);
    if (selectorLocation == "onCharacters" && characterCursorPosition >0) {
        characterCursorPosition -= 1;
    }
    else if (selectorLocation == "onResults" && resultCursorPosition >1) {
        resultCursorPosition -= 1;
    }
    chooseCursorLocation();
}

//
function resetKeyboard() {
    character1 ='A';
    character2 = 'C';
    character3 = 'M';
    character4 = 'P';
    character5 = 'S';
    character6 = 'T';
    character7 = 'U';
    result1 = "and";
    result2 = "for";
    result3 = "have";
    result4 = "not";
    result5 = "that";
    result6 = "this";
    result7 = "the";
    result8 = "with";
    result9 = "you";
}

// Updates the search string when the user selects one of the recommended results
function selectResult() {
    var resultSelected;
    switch (resultCursorPosition) {
        case 1:
            resultSelected = result1;
            break;
        case 2:
            resultSelected = result2;
            break;
        case 3:
            resultSelected = result3;
            break;
        case 4:
            resultSelected = result4;
            break;
        case 5:
            resultSelected = result5;
            break;
        case 6:
            resultSelected = result6;
            break;
        case 7:
            resultSelected = result7;
            break;
        case 8:
            resultSelected = result8;
            break;
        case 9:
            resultSelected = result9;
            break;
        default:
            resultSelected = "";
            break;
    }
    if (resultSelected.toUpperCase() == searchString) {
        completeSearch();
    }
    else {
        searchString = resultSelected.toUpperCase();
        calculateProbabilities();
    }
}

// Sets or resets the variable values for beginning a new search
function setStartingVariables() {
    selectorLocation = "onCharacters";
    characterCursorPosition = 4;
    resultCursorPosition = 1;
    searchString = "";
    displayString = "______________";
    document.getElementById("searchString").style.color = "black";
    document.getElementById("test1").innerHTML = "";
    shortList = [];
    resetKeyboard();
    chooseCursorLocation();
    updateDisplay();
}

// Updates the button labels when the user switches between the keyboard and the results
function updateButtonLabels() {
    switch (selectorLocation) {
        case "onCharacters":
            document.getElementById("buttonLeft").innerHTML = "Backspace";
            document.getElementById("buttonRight").innerHTML = "To Results";
            document.getElementById("buttonCenter").innerHTML = "Select";
            document.getElementById("buttonUp").innerHTML = "Scroll Up";
            document.getElementById("buttonDown").innerHTML = "Scroll Down";
            break;
        case "complete":
            document.getElementById("buttonLeft").innerHTML = "New Search";
            document.getElementById("buttonRight").innerHTML = ".";
            document.getElementById("buttonCenter").innerHTML = ".";
            document.getElementById("buttonUp").innerHTML = ".";
            document.getElementById("buttonDown").innerHTML = ".";
            break;
        case "onResults":
            document.getElementById("buttonLeft").innerHTML = "To Keyboard";
            document.getElementById("buttonRight").innerHTML = "Space";
            var resultHovered;
            switch (resultCursorPosition) {
                case 1:
                    resultHovered = result1;
                    break;
                case 2:
                    resultHovered = result2;
                    break;
                case 3:
                    resultHovered = result3;
                    break;
                case 4:
                    resultHovered = result4;
                    break;
                case 5:
                    resultHovered = result5;
                    break;
                case 6:
                    resultHovered = result6;
                    break;
                case 7:
                    resultHovered = result7;
                    break;
                case 8:
                    resultHovered = result8;
                    break;
                case 9:
                    resultHovered = result9;
                    break;
                default:
                    resultHovered = "";
                    break;
            }
            if (resultHovered.toUpperCase() == searchString) {
                document.getElementById("buttonCenter").innerHTML = "Finish Search";
            }
            else {
                document.getElementById("buttonCenter").innerHTML = "Select";
            }
        break;
    }
}

// Updates the displayed character options on the keyboard
function updateCharacters() {
    document.getElementById("key1").innerHTML = character1;
    document.getElementById("key2").innerHTML = character2;
    document.getElementById("key3").innerHTML = character3;
    document.getElementById("key4").innerHTML = character4;
    document.getElementById("key5").innerHTML = character5;
    document.getElementById("key6").innerHTML = character6;
    document.getElementById("key7").innerHTML = character7;
}

// Updates the vertical position of the character cursor
function updateCharacterCursor() {
    switch (characterCursorPosition) {
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

// Updates the display of the search string
function updateDisplay() {
    if (searchString.length == 0) {
        resetKeyboard();
    }
    displayString = searchString + "_";
    for (var i = searchString.length; i<12; i++) {
        displayString += "_";
    }
    document.getElementById("searchString").innerHTML = displayString;
    updateCharacters();
    updateResults();
}

// Updates the displayed character options on the keyboard
function updateResults() {
    document.getElementById("result1").innerHTML = result1;
    document.getElementById("result2").innerHTML = result2;
    document.getElementById("result3").innerHTML = result3;
    document.getElementById("result4").innerHTML = result4;
    document.getElementById("result5").innerHTML = result5;
    document.getElementById("result6").innerHTML = result6;
    document.getElementById("result7").innerHTML = result7;
    document.getElementById("result8").innerHTML = result8;
    document.getElementById("result9").innerHTML = result9;
}

// Updates the vertical position of the results cursor
function updateResultCursor() {
    
    switch (resultCursorPosition) {
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

