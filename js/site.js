﻿// IMPORT ENGLISH DICTIONARY

// From dictionary.js, the 4,000 most common English words
var wordList = allWords1.concat(allWords2, allWords3, allWords4, allWords5, allWords6, allWords7, allWords8, allWords9, allWords10, allWords11, allWords12, allWords13, allWords14, allWords15, allWords16, allWords17, allWords18, allWords19);

// GLOBAL VARIABLES

// Position of the "mouse"
var selectorLocation; // onCharacters, onResults, complete
var characterCursorPosition; // 0 to 8
var resultCursorPosition; // 1 to 9
var characterSet; // onHotKeys, onLetters, onNumbers

// User's search query
var searchString;
var displayString;

// All the English words that begin with the user's search query
var shortList;

// Options displayed on character side of the keyboard
var character1;
var character2;
var character3;
var character4;
var character5;
var character6;
var character7;

// Options displayed on the result side of the keyboard
var result1;
var result2;
var result3;
var result4;
var result5;
var result6;
var result7;
var result8;
var result9;

// The 7 letters most likely to be typed next
var hotKey1;
var hotKey2;
var hotKey3;
var hotKey4;
var hotKey5;
var hotKey6;
var hotKey7;

// Key sets
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789,.!?-/@#%()";
var letterPosition;
var numberPosition;

// Record of the last button pressed
var lastButton;

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
    console.log("addCharacter()");
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
    if (characterToAdd != "&nbsp") {
        searchString += characterToAdd;
        calculateProbabilities();
    }
}

// Adds a space to the seardh string
function addSpace() {
    console.log("addSpace()");
    searchString += " ";
    calculateProbabilities();
}


// Determines probabilities of next character and final query
function calculateProbabilities() {
    console.log("calclulateProbabilities()")
    // Finds every English word that begins with the current search string and displays the top results
    if (searchString.length > 0) {
        shortList = wordList.filter(word => word.startsWith(searchString.toLowerCase()));
        for( let i = 0; i < shortList.length; i++){ 
            if ( shortList[i].toUpperCase() === searchString) { 
                shortList.splice(i,1); 
            }
        }
        result1 = searchString.toLowerCase();
        result2 = (shortList.length>=1) ? shortList[0]: "&nbsp";
        result3 = (shortList.length>=2) ? shortList[1]: "&nbsp";
        result4 = (shortList.length>=3) ? shortList[2]: "&nbsp";
        result5 = (shortList.length>=4) ? shortList[3]: "&nbsp";
        result6 = (shortList.length>=5) ? shortList[4]: "&nbsp";
        result7 = (shortList.length>=6) ? shortList[5]: "&nbsp";
        result8 = (shortList.length>=7) ? shortList[6]: "&nbsp";
        result9 = (shortList.length>=8) ? shortList[7]: "&nbsp";
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
        hotKey1 = (top7Letters.length>=1) ? top7Letters[0]: "&nbsp";
        hotKey2 = (top7Letters.length>=2) ? top7Letters[1]: "&nbsp";
        hotKey3 = (top7Letters.length>=3) ? top7Letters[2]: "&nbsp";
        hotKey4 = (top7Letters.length>=4) ? top7Letters[3]: "&nbsp";
        hotKey5 = (top7Letters.length>=5) ? top7Letters[4]: "&nbsp";
        hotKey6 = (top7Letters.length>=6) ? top7Letters[5]: "&nbsp";
        hotKey7 = (top7Letters.length>=7) ? top7Letters[6]: "&nbsp"; 
    }
    character1 = hotKey1;
    character2 = hotKey2;
    character3 = hotKey3;
    character4 = hotKey4;
    character5 = hotKey5;
    character6 = hotKey6;
    character7 = hotKey7;
    updateButtonLabels();
    updateDisplay();
}

// Determines where to place the "mouse"
function chooseCursorLocation() {
    console.log("chooseCursorLocation")
    switch (selectorLocation) {
        case "onCharacters":
            if (characterCursorPosition == 0) {
                if (characterSet == "onLetters" && hotKey7 == "&nbsp" && letterPosition <= 6) {
                    letterPosition = 0;
                    characterSet = "onHotKeys";
                    calculateProbabilities();
                }
                else {
                    moveCharacterKeysUp();
                }
            }
            else if(characterCursorPosition == 8) {
                moveCharacterKeysDown();
            }
            var characterToCheck;
            switch (characterCursorPosition) {
                case 1:
                    characterToCheck = character1;
                    break;
                case 2:
                    characterToCheck = character2;
                    break;
                case 3:
                    characterToCheck = character3;
                    break;
                case 4:
                    characterToCheck = character4;
                    break;
                case 5:
                    characterToCheck = character5;
                    break;
                case 6:
                    characterToCheck = character6;
                    break;
                case 7:
                    characterToCheck = character7;
                    break;
                default:
                    break;
            }
            if (characterToCheck == "&nbsp") {
                if (lastButton == "down") {
                    skipEmptyCharactersToLetters();
                }
                if (lastButton == "up") {
                    skipEmptyCharactersToNumbers();
                }
                updateCharacters();
            }
            updateCharacterCursor();
            break;
        case "onResults":
            updateResultCursor();
            break;
    }
    updateButtonLabels();
}

// Temporarily clears the "mouse" before assigning its new location
function clearCursor() {
    console.log("clearCursor()")
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
}


// Displays after the user completes their search
function completeSearch() {
    console.log("completeSearch()")
    selectorLocation = "complete";
    document.getElementById("searchString").style.color = "green";
    document.getElementById("test1").innerHTML = "Search complete! Press backspace to start a new search.";
    document.getElementById("test1").style.color = "green";    
    chooseCursorLocation();
}

// Backspaces the last character
function deleteCharacter() {
    console.log("deleteCharacter()")
    if (searchString.length > 0) {
        searchString = searchString.substring(0, searchString.length - 1);
        calculateProbabilities();
    }
    else {
        resetKeyboard();
    }
}

// Adjusts keys when moving from one character set to another
function moveCharacterKeysDown()
{
    console.log("moveCharacterKeysDown()")
    characterCursorPosition = 7;
    if (letterPosition < letters.length - 1) {
        character1 = character2;
        character2 = character3;
        character3 = character4;
        character4 = character5;
        character5 = character6;
        character6 = character7;
    
        switch (characterSet) {
            case "onHotKeys":
                characterSet = "onLetters";
                letterPosition = 0;
                character7 = letters[letterPosition];
                break;
            case "onLetters":
                letterPosition += 1;
                character7 = letters[letterPosition];
                break;
            case "onNumbers":
                numberPosition -= 1;
                switch (numberPosition) {
                    case -1:
                        characterSet = "onHotKeys";
                        numberPosition = 0;
                        character7 = hotKey7;
                        break;
                    case 0:
                        character7 = hotKey6;
                        break;
                    case 1:
                        character7 = hotKey5;
                        break;
                    case 2:
                        character7 = hotKey4;
                        break;
                    case 3:
                        character7 = hotKey3;
                        break;
                    case 4:
                        character7 = hotKey2;
                        break;
                    case 5:
                        character7 = hotKey1;
                        break;
                    default:
                        character7 = numbers[numberPosition-6];
                        break;
                }
                break;
        }
        updateCharacters();
    }
}

// Adjusts keys when moving from one character set to another
function moveCharacterKeysUp()
{
    console.log("moveCharacterKeysUp()")
    characterCursorPosition = 1;
        if (numberPosition < numbers.length - 1) {
        character7 = character6;
        character6 = character5;
        character5 = character4;
        character4 = character3;
        character3 = character2;
        character2 = character1;
        switch (characterSet) {
            case "onHotKeys":
                characterSet = "onNumbers";
                numberPosition = 0;
                character1 = numbers[numberPosition];
                break;
            case "onNumbers":
                numberPosition += 1;
                character1 = numbers[numberPosition];
                break;
            case "onLetters":
                letterPosition -= 1;
                switch (letterPosition) {
                    case -1:
                        characterSet = "onHotKeys";
                        letterPosition = 0;
                        character1 = hotKey1;
                        break;
                    case 0:
                        character1 = hotKey2;
                        break;
                    case 1:
                        character1 = hotKey3;
                        break;
                    case 2:
                        character1 = hotKey4;
                        break;
                    case 3:
                        character1 = hotKey5;
                        break;
                    case 4:
                        character1 = hotKey6;
                        break;
                    case 5:
                        if (hotKey1 != "&nbsp") {    
                            character1 = hotKey7;
                        }
                        else {
                            characterSet = "onNumbers";
                            numberPosition = 0;
                            character1 = numbers[6];
                            character2 = numbers[5];
                            character3 = numbers[4];
                            character4 = numbers[3];
                            character5 = numbers[2];
                            character6 = numbers[1];
                            character7 = numbers[0];
                        }
                        break;
                    default:
                        character1 = letters[letterPosition - 6 ];
                        break;   
                }    
        }
        updateCharacters();
    }
}



// Determines what to do when the center button is pressed
function pressButtonCenter() {
    console.log("pressButtonCenter()")
    lastButton = "center";
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
    console.log("pressButtonDown()")
    lastButton = "down";
    document.getElementById("buttonDown").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonDown").style.backgroundColor = "whitesmoke" },250);
    if (selectorLocation == "onCharacters" && characterCursorPosition <8) {
        characterCursorPosition += 1;
    }
    else if (selectorLocation == "onResults" && resultCursorPosition <9 && resultCursorPosition <= shortList.length) {
        resultCursorPosition += 1;
    }
    chooseCursorLocation();
}

// Determines what to do when the left button is pressed
function pressButtonLeft() {
    console.log("pressButtonLeft()")
    lastButton = "left";
    document.getElementById("buttonLeft").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonLeft").style.backgroundColor = "whitesmoke" },250);
    switch (selectorLocation) {
        case "onCharacters":
            deleteCharacter();
            break;
        case "onResults":
            selectorLocation = "onCharacters";
            resultCursorPosition = 1;
            calculateProbabilities();
            //chooseCursorLocation();
            break;
        case "complete":
            setStartingVariables();
            break;
    }
    
}

// Determines what to do when the rught button is pressed
function pressButtonRight() {
    console.log("pressButtonRight()")
    lastButton = "right";
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
    console.log("pressButtonUp()")
    lastButton = "up";
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

// Resets the keys to default values
function resetKeyboard() {
    console.log("resetKeyboard()")
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
    hotKey1 = character1;
    hotKey2 = character2;
    hotKey3 = character3;
    hotKey4 = character4;
    hotKey5 = character5;
    hotKey6 = character6;
    hotKey7 = character7;
    characterSet = "onHotKeys";
    letterPosition = 0;
    numberPosition = 0;
    shortList = ["1","2","3","4","5","6","7","8","9"];
}

// Updates the search string when the user selects one of the recommended results
function selectResult() {
    console.log("selectResult()")
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
    else if(resultSelected != "&nbsp") {
        searchString = resultSelected.toUpperCase();
        calculateProbabilities();
    }
}

// Sets or resets the variable values for beginning a new search
function setStartingVariables() {
    console.log("setStartingVariables()")
    selectorLocation = "onCharacters";
    characterCursorPosition = 4;
    resultCursorPosition = 1;
    searchString = "";
    displayString = "______________";
    document.getElementById("searchString").style.color = "black";
    document.getElementById("buttonCenter").style.color = "black";
    document.getElementById("test1").innerHTML = "";
    document.getElementById("test1").style.color = "black"; 
    shortList = [];
    resetKeyboard();
    chooseCursorLocation();
    updateDisplay();
}

// Skips over empty keys when scrolling
function skipEmptyCharactersToLetters() {
    console.log("skipEmptyCharactersToLetters()")
        characterSet = "onLetters";
        letterPosition = 6;
        characterCursorPosition = 1;
        character1 = letters[0];
        character2 = letters[1];
        character3 = letters[2];
        character4 = letters[3];
        character5 = letters[4];
        character6 = letters[5];
        character7 = letters[6];
}

// Skips
function skipEmptyCharactersToNumbers() {
    console.log("skipEmptyCharactersToNumbers()")
        characterSet = "onNumbers";
        numberPosition = 6;
        characterCursorPosition = 7;
        character1 = numbers[6];
        character2 = numbers[5];
        character3 = numbers[4];
        character4 = numbers[3];
        character5 = numbers[2];
        character6 = numbers[1];
        character7 = numbers[0];
    
}

// Updates the button labels when the user switches between the keyboard and the results
function updateButtonLabels() {
    console.log("updateButtonLabels()")
    //document.getElementById("test1").innerHTML = `${selectorLocation}, ${characterSet}, lp=${letterPosition}, np=${numberPosition}`;
    switch (selectorLocation) {
        case "onCharacters":
            document.getElementById("buttonLeft").innerHTML = "Backspace";
            document.getElementById("buttonLeft").style.fontStyle = "normal";
            document.getElementById("buttonRight").innerHTML = "To Results";
            document.getElementById("buttonRight").style.fontStyle = "italic";
            document.getElementById("buttonCenter").innerHTML = "Select";
            document.getElementById("buttonCenter").style.color = "black";
            document.getElementById("buttonUp").innerHTML = "Scroll Up";
            document.getElementById("buttonDown").innerHTML = "Scroll Down";
            break;
        case "complete":
            document.getElementById("buttonLeft").innerHTML = "New Search";
            document.getElementById("buttonRight").innerHTML = "&nbsp";
            document.getElementById("buttonCenter").innerHTML = "&nbsp";
            document.getElementById("buttonUp").innerHTML = "&nbsp";
            document.getElementById("buttonDown").innerHTML = "&nbsp";
            break;
        case "onResults":
            document.getElementById("buttonLeft").innerHTML = "To Keyboard";
            document.getElementById("buttonLeft").style.fontStyle = "italic";
            document.getElementById("buttonRight").innerHTML = "Space";
            document.getElementById("buttonRight").style.fontStyle = "normal";
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
                document.getElementById("buttonCenter").style.color = "green";
            }
            else {
                document.getElementById("buttonCenter").innerHTML = "Select";
                document.getElementById("buttonCenter").style.color = "black";
            }
        break;
        
    }
}

// Updates the displayed character options on the keyboard
function updateCharacters() {
    console.log("updateCharacters()")
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
    console.log("updateCharacterCursor()");
    clearCursor();
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
    console.log("updateDisplay()")
    if (searchString.length == 0) {
        resetKeyboard();
    }
    displayString = searchString + "_";
    for (var i = searchString.length; i<12; i++) {
        displayString += "_";
    }
    document.getElementById("searchString").innerHTML = displayString;
    if (selectorLocation == "onCharacters") {
        if(character4 == "&nbsp") {
            characterCursorPosition = 1;
        }
        else {
            characterCursorPosition = 4;
        }
        updateCharacterCursor();
    }
    else if(SelectorLocation = "onResults") {
        resultCursorPosition = 1;
        updateResultCursor();
    }
    updateCharacters();
    updateResults();
}

// Updates the displayed character options on the keyboard
function updateResults() {
    console.log("updateResults()")
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
    console.log("updateResultCursor()")
    clearCursor();
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
