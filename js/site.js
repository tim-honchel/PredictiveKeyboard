// IMPORT ENGLISH DICTIONARY

/* original C# script
var filepath = Directory.GetCurrentDirectory().Replace(@"bin\Debug\net5.0", @"Resources\dictionary.txt");
var logFile = File.ReadAllLines(filepath);
var wordList = new List<string>(logFile);
*/

/* 1st attempt JS
var filepath = window.location.pathname;
*/

/* 2nd attempt JS
var dictionaryFile = new XMLHttpRequest();
dictionaryFile.open('GET', '/resources/dictionary.txt');
dictionaryFile.onreadystatechange = function() {
    alert(dictionaryFile.responseText);
}
dictionaryFile.send();
*/

/* 3rd attempt JS
var dictionaryFile = new XMLHttpRequest();
dictionaryFile.open('GET', '/resources/dictionary.txt');
dictionaryFile.onreadystatechange = function() {
    //alert(dictionaryFile.responseText);
    var logFile = JSON.parse(dictionaryFile.responseText);
    var logFileData = logFile.Data;
}
dictionaryFile.send();
*/

/* 4th attempt JS
import { readFile } from "fs";
readFile("/resources/dictionary.txt", function(text){
    var textByLine = text.split("\n");
}); 
*/

/*5th attempt JS
const fs = require('fs')
fs.readFile('resources/dictionary.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
})
*/

// Temporary solution until full dictionary can be loaded
var wordList = ["acorn", "almond", "amaranth", "anchovies", "apple", "applesauce", "apricot", "artichoke", "arugula", "asparagus", "avocado", "banana", "carrot", "daikon", "edamame", "fig", "ginger", "horseradish", "ice", "jackfruit", "kale", "lemon", "melon", "nectarine", "okra", "pineapple", "quail", "radish", "squash", "tangerine", "ulluco", "veal", "watermelon", "xylophone", "zebra"]

// GLOBAL VARIABLES

// Position of the "mouse"
var selectorPosition;
var cursorPosition;
var resultPosition;

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
document.getElementById("testButton").onclick = function () { calculateProbabilities() };

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
    switch (cursorPosition) {
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
    updateDisplay();
}

// Adds a space to the seardh string
function addSpace() {
    searchString += " ";
    updateDisplay();
}


// Determines probabilities of next character and final query
function calculateProbabilities() {
    document.getElementById("testButton").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("testButton").style.backgroundColor = "whitesmoke" },250);
    shortList = wordList.filter(word => word.startsWith(searchString.toLowerCase()));
    result1 = searchString.toLowerCase();
    result2 = (wordList.length>=1) ? shortList[0]: "";
    result3 = (wordList.length>=1) ? shortList[1]: "";
    result4 = (wordList.length>=1) ? shortList[2]: "";
    result5 = (wordList.length>=1) ? shortList[3]: "";
    result6 = (wordList.length>=1) ? shortList[4]: "";
    result7 = (wordList.length>=1) ? shortList[5]: "";
    result8 = (wordList.length>=1) ? shortList[6]: "";
    result9 = (wordList.length>=1) ? shortList[7]: "";
}

// Determines where to place the "mouse"
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
            updateResultCursor();
            break;
        case "complete":
            completeSearch();
            break;
    }
    updateButtonLabels();
}

// Displays after the user completes their search
function completeSearch() {
    document.getElementById("buttonCenter").innerHTML = "Done!";
    document.getElementById("buttonCenter").style.backgroundColor = "red";
    document.getElementById("finished").innerHTML = "Search complete! Press backspace to start a new search.";
}

// Backspaces the last character
function deleteCharacter() {
    if (searchString.length > 0) {
        searchString = searchString.substring(0, searchString.length - 1);
        updateDisplay();
    }
}

// Loads dictionary of English words into a list of strings
function loadDictionary() {
    document.getElementById("testing").innerHTML = "function called";
    var fs = require('fs');
    document.getElementById("testing").innerHTML = "function called, fs required";
    fs.readFile('resources/dictionary.txt', (err, data) => {
        document.getElementById("testing").innerHTML = "function called, fs required, file read";
        if (err) throw err;
        document.getElementById("testing").innerHTML = "function called, fs required, file read, error checked";
        console.log(data.toString());
        document.getElementById("testing").innerHTML = "function called, fs required, file read, error checked, data logged";     
    })
}

// Determines what to do when the up button is pressed
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

// Determines what to do when the down button is pressed
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

// Determines what to do when the left button is pressed
function pressButtonLeft() {
    document.getElementById("buttonLeft").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonLeft").style.backgroundColor = "whitesmoke" },250);
    switch (selectorPosition) {
        case "cursor":
            deleteCharacter();
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

// Determines what to do when the rught button is pressed
function pressButtonRight() {
    document.getElementById("buttonRight").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonRight").style.backgroundColor = "whitesmoke" },250);
    switch (selectorPosition) {
        case "cursor":
            selectorPosition = "result";
            break;
        case "result":
            selectorPosition = "cursor";
            addSpace();
            break; 
    }
    chooseSelector();
}

// Determines what to do when the center button is pressed
function pressButtonCenter() {
    document.getElementById("buttonCenter").style.backgroundColor = "yellow";
    setTimeout(() => { document.getElementById("buttonCenter").style.backgroundColor = "whitesmoke" },250);
    switch (selectorPosition) {
        case "cursor":
            addCharacter();
            break; 
        case "result":
            selectResult();
            break;
    }
    chooseSelector();
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
    switch (resultPosition) {
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
            chooseSelector()
            break;
    }
    if (resultSelected.toUpperCase() == searchString) {
        selectorPosition = "complete";
    }
    else {
        searchString = resultSelected.toUpperCase();
        updateDisplay();
    }
}

// Sets or resets the variable values for beginning a new search
function setStartingVariables() {
    selectorPosition = "cursor"
    cursorPosition = 4;
    resultPosition = 1;
    searchString = "";
    displayString = "______________";
    document.getElementById("finished").innerHTML = "";
    shortList = [];
    resetKeyboard();
    chooseSelector();
    updateDisplay();
    updateButtonLabels();
}

// Updates the button labels when the user switches between the keyboard and the results
function updateButtonLabels() {
    if (selectorPosition == "cursor") {
        document.getElementById("buttonLeft").innerHTML = "Backspace";
        document.getElementById("buttonRight").innerHTML = "To Results";
        document.getElementById("buttonCenter").innerHTML = "Select";
    }
    else if(selectorPosition == "result") {
        document.getElementById("buttonLeft").innerHTML = "To Keyboard";
        document.getElementById("buttonRight").innerHTML = "Space";
        document.getElementById("buttonCenter").innerHTML = "Select";
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

// Updates the display of the search string
function updateDisplay() {
    displayString = searchString + "_";
    for (var i = searchString.length; i<12; i++) {
        displayString += "_";
    }
    document.getElementById("searchString").innerHTML = displayString;
    if (searchString.length == 0) {
        resetKeyboard();
    }
    else {
        calculateProbabilities();
    }
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

