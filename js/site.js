// IMPORT ENGLISH DICTIONARY

// From dictionary.js, the 4,000 most common English words
var wordList = allWords1.concat(allWords2, allWords3, allWords4, allWords5, allWords6, allWords7, allWords8, allWords9, allWords10, allWords11, allWords12, allWords13, allWords14, allWords15, allWords16, allWords17, allWords18, allWords19);

// GLOBAL VARIABLES

// Position of the "mouse"
var selectorLocation; // onCharacters, onResults, complete
var characterCursorPosition; // 0 to 8
var resultCursorPosition; // 1 to 9
var topCharacterSet; // HotKeys, Letters, Numbers
var topCharacterIndex;
var bottomCharacterSet;
var bottomCharacterIndex;

// User's search query
var fullSearchString;
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
var hotKeys = [0, 1, 2, 3, 4, 5, 6];
var hotKeyPosition;
var numberOfHotKeys; // number of active hot keys

// Key sets
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789,.!?-/@#%()";

// For control flow
var lastButton;
var nextAction;

// EVENTS

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

// PRIMARY FUNCTIONS for control flow

// Determines what to do when the center button is pressed
function pressButtonCenter() {
    console.log("*****pressButtonCenter()*****")
    lastButton = "buttonCenter";
    nextAction = "";
    flashButtonColor();
    changeCursorLocation();
    switch (nextAction) {
        case "addCharacter":
            addCharacter();
            findPossibleResults();
            updateSearchString();
            updateResults();
            calculateNextCharacterProbabilities();
            determineKeyLayout();
            updateButtonLabels();
            updateSearchString();
            resetCursor();
            clearCursor();
            updateCharacterCursor();
            updateCharacters();
            break;
        case "selectResult":
            selectResult();
            switch (nextAction) {
                case "completeSearch":
                    completeSearch();
                    updateButtonLabels();
                    break;
                case "findPossibleResults":
                    findPossibleResults();
                    updateSearchString();
                    updateResults();
                    calculateNextCharacterProbabilities();
                    determineKeyLayout();
                    updateButtonLabels();
                    updateSearchString();
                    resetCursor();
                    clearCursor();
                    updateResultCursor();
                    updateCharacters();
                    break;
            }
            break;
    }
}

// Determines what to do when the down button is pressed
function pressButtonDown() {
    console.log("*****pressButtonDown()*****")
    lastButton = "buttonDown";
    nextAction = "";
    flashButtonColor();
    changeCursorLocation();
    clearCursor();
    checkForScrolling();
    if (nextAction == "moveCharacterKeysDown") {
        moveCharacterKeysDown();
    }
    if (selectorLocation == "onCharacters") {
        updateCharacterCursor();
        updateCharacters();
    }
    else if (selectorLocation == "onResults") {
        updateResultCursor();
    }
    
    
}

// Determines what to do when the left button is pressed
function pressButtonLeft() {
    console.log("*****pressButtonLeft()*****")
    lastButton = "buttonLeft";
    nextAction = "";
    flashButtonColor();
    clearCursor();
    changeCursorLocation();
    switch (nextAction) {
        case "setStartingVariables":
            setStartingVariables();
            updateCharacters();
            updateResults();
            updateButtonLabels();
        case "resetCursor":
            resetCursor();
            clearCursor();
            updateCharacterCursor();
            updateButtonLabels();
            break;
        case "deleteCharacter":
            deleteCharacter();
            updateSearchString();
            switch (nextAction) {
                case "findPossibleResults":
                    findPossibleResults();
                    updateResults();
                    calculateNextCharacterProbabilities();
                    determineKeyLayout();
                    resetCursor();
                    clearCursor();
                    updateCharacterCursor();
                    updateCharacters(); 
                    break;
                case "resetKeyboard":
                    resetKeyboard();
                    resetCursor();
                    updateCharacterCursor();
                    updateCharacters();
                    updateResults();
                    break;
            }
            break;
        
    }
}

// Determines what to do when the rught button is pressed
function pressButtonRight() {
    console.log("*****pressButtonRight()*****")
    lastButton = "buttonRight";
    nextAction = "";
    flashButtonColor();
    clearCursor();
    changeCursorLocation();
    switch (nextAction) {
        case "resetCursor":
            resetCursor();
            updateResultCursor();
            updateButtonLabels();
            break;
        case "addSpace":
            addSpace();
            updateSearchString();
            resetKeyboard();
            resetCursor();
            updateCharacterCursor();
            updateCharacters();
            updateResults();
            updateButtonLabels();
            break;
    }
}

// Determines what to do when the up button is pressed
function pressButtonUp() {
    console.log("*****pressButtonUp()*****");
    lastButton = "buttonUp";
    nextAction = "";
    flashButtonColor();
    changeCursorLocation();
    clearCursor();
    checkForScrolling();
    if (nextAction == "moveCharacterKeysUp") {
        moveCharacterKeysUp();
    }
    if (selectorLocation == "onCharacters") {
        updateCharacterCursor();
        updateCharacters();
    }
    else if (selectorLocation == "onResults") {
        updateResultCursor();
    }
}

// SECONDARY FUNCTIONS called by primary functions

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
    fullSearchString += characterToAdd;
}

// Adds a space to the search string
function addSpace() {
    console.log("addSpace()");
    fullSearchString += " ";
}

// Finds the most common next characters and displays them as keys
function calculateNextCharacterProbabilities() {
    console.log("calculateNextCharacterProbabilities()")
    if (searchString.length > 0) {
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
        numberOfHotKeys = top7Letters.length;
        hotKeys = [hotKey1, hotKey2, hotKey3, hotKey4, hotKey5, hotKey6, hotKey7];
    }
}

// Determines the new cursor location
function changeCursorLocation() {
    console.log("changeCursorLocation()");
    switch (lastButton) {
        case "buttonLeft":
            switch (selectorLocation) {
                case "onCharacters":
                    nextAction = "deleteCharacter";
                    break;
                case "onResults":
                    selectorLocation = "onCharacters";
                    resultCursorPosition = 1;
                    nextAction="resetCursor";
                    break;
                case "complete":
                    nextAction="setStartingVariables";
                    break;
            }
            break;
        case "buttonRight":
            if (selectorLocation == "onCharacters") {
                selectorLocation = "onResults";
                nextAction ="resetCursor";
            }
            else if (selectorLocation == "onResults") {
                selectorLocation = "onCharacters";
                nextAction="addSpace";
            }
            break;
        case "buttonUp":
            if (selectorLocation == "onCharacters" && characterCursorPosition >0) {
                characterCursorPosition -= 1;
            }
            else if (selectorLocation == "onResults" && resultCursorPosition >1) {
                resultCursorPosition -= 1;
            }
            break;
        case "buttonDown":
            if (selectorLocation == "onCharacters" && characterCursorPosition <8) {
                characterCursorPosition += 1;
            }
            else if (selectorLocation == "onResults" && resultCursorPosition <9 && resultCursorPosition <= shortList.length) {
                resultCursorPosition += 1;
            }
            break;
        case "buttonCenter":
            if (selectorLocation == "onCharacters") {
                nextAction="addCharacter";
            } 
            else if (selectorLocation == "onResults") {
                nextAction="selectResult";
            }
            break;
        default:
            break;
    }
}
   
// Determines whether to move the keys up or down
function checkForScrolling() {
    console.log("checkForScrolling()")
    if (selectorLocation == "onCharacters") {
        if (characterCursorPosition == 0) {
                nextAction = "moveCharacterKeysUp";
        }
        else if(characterCursorPosition == 8) {
            nextAction = "moveCharacterKeysDown";
        }
    }
}

// Temporarily clears the "mouse" before assigning its new location
function clearCursor() {
    console.log("clearCursor()")
    document.getElementById("cursor1").style.color = "ghostwhite";
    document.getElementById("cursor2").style.color = "ghostwhite";
    document.getElementById("cursor3").style.color = "ghostwhite";
    document.getElementById("cursor4").style.color = "ghostwhite";
    document.getElementById("cursor5").style.color = "ghostwhite";
    document.getElementById("cursor6").style.color = "ghostwhite";
    document.getElementById("cursor7").style.color = "ghostwhite";
    document.getElementById("selection1").style.color = "ghostwhite";
    document.getElementById("selection2").style.color = "ghostwhite";
    document.getElementById("selection3").style.color = "ghostwhite";
    document.getElementById("selection4").style.color = "ghostwhite";
    document.getElementById("selection5").style.color = "ghostwhite";
    document.getElementById("selection6").style.color = "ghostwhite";
    document.getElementById("selection7").style.color = "ghostwhite";
    document.getElementById("selection8").style.color = "ghostwhite";
    document.getElementById("selection9").style.color = "ghostwhite";
}

// Displays after the user completes their search
function completeSearch() {
    console.log("completeSearch()");
    selectorLocation = "complete";
    document.getElementById("searchString").style.color = "green";
    document.getElementById("resultUp").innerHTML = "Search complete!";
    document.getElementById("resultUp").style.color = "green";    
}

// Backspaces the last character
function deleteCharacter() {
    console.log("deleteCharacter()");
    if (fullSearchString.length > 0) {
        fullSearchString = fullSearchString.substring(0, fullSearchString.length - 1);
        
    }
}

function determineKeyLayout() {
    console.log("determineKeyLayout()");
    topCharacterIndex = 0;
    if (numberOfHotKeys == 0) {
        bottomCharacterIndex = 6;
        topCharacterSet = "Letters";
        bottomCharacterSet = "Letters";
    }
    else if (numberOfHotKeys == 7) {
        bottomCharacterIndex = 6;
        topCharacterSet = "HotKeys";
        bottomCharacterSet = "HotKeys";
    }
    else {
        bottomCharacterIndex = 6 - numberOfHotKeys;
        topCharacterSet = "HotKeys";
        bottomCharacterSet = "Letters";
    }
    character1 = numberOfHotKeys >= 1 ? hotKey1 : letters[numberOfHotKeys];
    character2 = numberOfHotKeys >= 2 ? hotKey2 : letters[1-numberOfHotKeys];
    character3 = numberOfHotKeys >= 3 ? hotKey3 : letters[2- numberOfHotKeys];
    character4 = numberOfHotKeys >= 4 ? hotKey4 : letters[3 - numberOfHotKeys];
    character5 = numberOfHotKeys >= 5 ? hotKey5 : letters[4 - numberOfHotKeys];
    character6 = numberOfHotKeys >= 6 ? hotKey6 : letters[5 - numberOfHotKeys];
    character7 = numberOfHotKeys == 7 ? hotKey7: letters[6 - numberOfHotKeys];
}

// Finds every English word that begins with the current search string and displays the top results
function findPossibleResults() {
    console.log("findPossibleResults()")
    searchString = fullSearchString.split(" ").at(-1);
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
    }
}

// Temporarily changes the button color to show it was pressed
function flashButtonColor() {
    console.log("flashButtonColor()");
    document.getElementById(lastButton).style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById(lastButton).style.backgroundColor = "whitesmoke" },250); 
}

// Adjusts keys when moving from one character set to another
function moveCharacterKeysDown()
{
    console.log("moveCharacterKeysDown()");
    characterCursorPosition = 7;
    if (bottomCharacterIndex < letters.length - 1) {
        character1 = character2;
        character2 = character3;
        character3 = character4;
        character4 = character5;
        character5 = character6;
        character6 = character7;
        if (topCharacterSet == "Numbers") {
            topCharacterIndex -= 1;
        }
        else {
            topCharacterIndex += 1;
        }
        if (bottomCharacterSet == "Numbers") {
            bottomCharacterIndex -= 1;
        }
        else {
            bottomCharacterIndex += 1;
        }
        if (bottomCharacterIndex >= 0) {
            switch (bottomCharacterSet) {
                case "Numbers":
                    character7 = numbers[bottomCharacterIndex];
                    break;
                case "Letters":
                    character7 = letters[bottomCharacterIndex];
                    break;
                case "HotKeys":
                    if (bottomCharacterIndex < numberOfHotKeys) {
                        character7 = hotKeys[bottomCharacterIndex];
                    }
                    else {
                        bottomCharacterSet = "Letters";
                        bottomCharacterIndex = 0;
                        character7 = letters[0];
                    }
                    break;
            }
        }
        else if (bottomCharacterSet == "Numbers" && numberOfHotKeys > 0) {
            bottomCharacterIndex = 0;
            bottomCharacterSet = "HotKeys";
            character7 = hotKeys[0];
        }
        else {
            bottomCharacterIndex = 0;
            bottomCharacterSet = "Letters";
            character7 = letters[0];
        }
        if (topCharacterSet == "Numbers" && topCharacterIndex < 0) {
            topCharacterIndex = 0;
            if (numberOfHotKeys > 0) {
                topCharacterSet = "HotKeys";
            }
            else {
                topCharacterSet = "Letters";
            }
        }
        else if (topCharacterSet == "HotKeys" && topCharacterIndex >= numberOfHotKeys) {
            topCharacterSet = "Letters";
            topCharacterIndex = 0;
        }     
    }
    
}

// Adjusts keys when moving from one character set to another
function moveCharacterKeysUp()
{
    console.log("moveCharacterKeysUp()")
    characterCursorPosition = 1;
    if (topCharacterIndex < numbers.length - 1) {
        character7 = character6;
        character6 = character5;
        character5 = character4;
        character4 = character3;
        character3 = character2;
        character2 = character1;
        if (topCharacterSet == "Numbers") {
            topCharacterIndex += 1;
        }
        else {
            topCharacterIndex -= 1;
        }
        if (bottomCharacterSet == "Numbers") {
            bottomCharacterIndex += 1;
        }
        else {
            bottomCharacterIndex -= 1;
        }
        if (topCharacterIndex >= 0) {
            switch (topCharacterSet) {
                case "Numbers":
                    character1 = numbers[topCharacterIndex];
                    break;
                case "Letters":
                    character1 = letters[topCharacterIndex];
                    break;
                case "HotKeys":
                    if (topCharacterIndex < numberOfHotKeys) {
                        character1 = hotKeys[topCharacterIndex];
                    }
                    else {
                        topCharacterSet = "Numbers";
                        topCharacterIndex = 0;
                        character1 = numbers[0];
                    }
                    break;
            }
        }
        else if (topCharacterSet == "Letters" && numberOfHotKeys > 0) {
            topCharacterIndex = numberOfHotKeys - 1;
            topCharacterSet = "HotKeys";
            character1 = hotKeys[topCharacterIndex];
        }
        else {
            topCharacterIndex = 0;
            topCharacterSet = "Numbers";
            character1 = numbers[0];
        }
        if (bottomCharacterSet == "Letters" && bottomCharacterIndex < 0) {
            if (numberOfHotKeys > 0) {
                bottomCharacterSet = "HotKeys";
                bottomCharacterIndex = numberOfHotKeys - 1;
            }
            else {
                bottomCharacterSet = "Numbers";
                bottomCharacterIndex = 0;
            }
        }
        else if (bottomCharacterSet == "HotKeys" && bottomCharacterIndex < 0) {
            bottomCharacterSet = "Numbers";
            bottomCharacterIndex = 0;
        }          
    }
        
}

// Repositions the cursor's vertical position when the search string changes
function resetCursor() {
    console.log("resetCursor()")
    if (selectorLocation == "onCharacters") {
        characterCursorPosition = numberOfHotKeys > 0 ? Math.round(numberOfHotKeys/2) : 4;
        nextAction="updateCharacterCursor";
    }
    else if(SelectorLocation = "onResults") {
        resultCursorPosition = 1;
        nextAction="updateResultCursor";
    }
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
    numberOfHotKeys = 7;
    hotKeys = [hotKey1, hotKey2, hotKey3, hotKey4, hotKey5, hotKey6, hotKey7];
    topCharacterSet = "HotKeys";
    topCharacterIndex = 0;
    bottomCharacterSet = "HotKeys";
    bottomCharacterIndex = 6;
    shortList = ["1","2","3","4","5","6","7","8","9"];
    nextAction = "updateCharacterCursor";
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
    var lastWordOfSearch = fullSearchString.split(" ").at(-1);
    var theFirstPartOfSearch = fullSearchString.substring(0, fullSearchString.length - lastWordOfSearch.length);
    if (resultSelected.toUpperCase() == lastWordOfSearch) {
        nextAction="completeSearch";
    }
    else if(resultSelected != "&nbsp") {
        fullSearchString = theFirstPartOfSearch + resultSelected.toUpperCase();
        nextAction="findPossibleResults";
    }
}

// Sets or resets the variable values for beginning a new search
function setStartingVariables() {
    console.log("*****setStartingVariables()*****")
    selectorLocation = "onCharacters";
    characterCursorPosition = 4;
    resultCursorPosition = 1;
    fullSearchString = "";
    searchString = "";
    displayString = "______________";
    document.getElementById("searchString").style.color = "black";
    document.getElementById("buttonCenter").style.color = "black";
    document.getElementById("test1").innerHTML = "";
    document.getElementById("test1").style.color = "black";
    document.getElementById("resultUp").innerHTML = "."; 
    document.getElementById("resultUp").style.color = "ghostwhite";
    shortList = [];
    resetKeyboard();
    checkForScrolling();
    updateSearchString();
}

// Updates the button labels when the user switches between the keyboard and the results
function updateButtonLabels() {
    console.log("updateButtonLabels()")
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

// Updates the display of the search string
function updateSearchString() {
    console.log("updateSearchString()");
    if (fullSearchString.length == 0) {
        nextAction="resetKeyboard";
    }
    else {
        nextAction = "findPossibleResults";
    }
    displayString = fullSearchString + "_";
    for (var i = fullSearchString.length; i<12; i++) {
        displayString += "_";
    }
    document.getElementById("searchString").innerHTML = displayString;
}