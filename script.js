/**
 * 1. display new code with span
 *
 *
 *    1a. if correct display correct color
 *
 *    1b. if wrong display wrong color
 *
 *    1c. otherwise, display black
 *
 * 2. check whether input is right or wrong
 *
 *    2a. read user input
 *
 *    2b. check if user input match code
 *
 *    2c. if character match, display right color
 *
 *    2d. if character is undefined, display black color
 *
 *    2e. if character does not match, display wrong color
 *
 *    NOTE: 2f. Once all character matches, we change to another question. clear input text box
 *
 * 3. display result
 *  */

// const codeList = [`apple`, `banana`, `charlie`, `delta`, `echo`];
const codeList = [`apple`, `banana`, `charlie`, `delta`];
let codeListDisplay;

// Element Sectors.
const inputCodeBox = $(".input-code"); // select element using jQuery, player inputs code here
const displayCodeBox = $(".display-code"); // select element using jQuery, display code here
let initialCodeArray; // declare a variable without assignment
const modalEndGame = $(".modal-endgame");
const container = $(".container");
const timerText = $(".timer-text");
const timerBox = $(".timer-box");
const cpsBox = $(".character-per-count"); // box to store cps
const restartButton = $("#restart-game");
let totalTimeSpent = 0;
let totalCharacterTyped = 0;
let cps = 0; // totalCharacterTyped / totalTimeSpent;
let stopGame;
let combineTypedCharacters;
let combineCharactersArray;

// Seletion for Timing:
const maxTime = 10;
let remainingTime;
let runingTimeInterval;
// Step 1:
const formatCode = (code) => {
  initialCodeArray = code.split(""); // ["a","p","p","l","e"]
  const codeArray = initialCodeArray.slice(); // ["a","p","p","l","e"]

  for (let i = 0; i < codeArray.length; i++) {
    const character = codeArray[i];
    // codeArray[i] = `<span class="correct">${character}</span>`;
    // codeArray[i] = `<span class="incorrect">${character}</span>`;
    codeArray[i] = `<span>${character}</span>`;
  }
  const formattedCode = codeArray.join("");
  return formattedCode; // <span>a</span><span>p></span>
};

const displayNewCode = () => {
  if (codeListDisplay.length > 0) {
    startTimer();
    const randomIndex = Math.floor(Math.random() * codeListDisplay.length);
    const randomCode = codeListDisplay[randomIndex];
    codeListDisplay.splice(randomIndex, 1);
    stopGame = !codeListDisplay.length;
    const displayCode = formatCode(randomCode);
    displayCodeBox.html(displayCode); // SH: this shows an object.
    inputCodeBox.val(""); // SH: this shows an object.
  } else {
    endGame();
  }
};

// displayNewCode();

const compareValues = (inputValue) => {
  // Step 2a
  const inputValueArray = inputValue.split(""); // ['b','a','n','n','a','a']
  let result = true;

  // Step 2b
  initialCodeArray.forEach((character, index) => {
    // Step 2c + 3
    // if the user type correctly
    if (character === inputValueArray[index]) {
      $(`pre.display-code > span:eq(${index})`).toggleClass("correct", true);
      $(`pre.display-code > span:eq(${index})`).toggleClass("incorrect", false);

      // Step 2d + 3
      // if user havent type any charcter
    } else if (inputValueArray[index] === undefined) {
      $(`pre.display-code > span:eq(${index})`).toggleClass("correct", false);
      $(`pre.display-code > span:eq(${index})`).toggleClass("incorrect", false);
      result = false;

      // Step 2e + 3
      // if user key in incorrect character
    } else {
      $(`pre.display-code > span:eq(${index})`).toggleClass("correct", false);
      $(`pre.display-code > span:eq(${index})`).toggleClass("incorrect", true);
      result = false;
    }
  });

  // Store code into array
  storeCodeArray = () => {
    combineTypedCharacters = inputValueArray.join("");
    combineCharactersArray = [];
    combineCharactersArray.push(combineTypedCharacters);
    console.log(combineCharactersArray);
  };

  // step 2f
  // consolidate the result
  // if all matches, move to another question
  if (result === true) {
    storeCodeArray();
    const currentTimeSpend = maxTime - remainingTime;
    const currentCharacterTyped = inputValueArray.length;
    totalCharacterTyped = totalCharacterTyped += currentCharacterTyped;
    totalTimeSpent = totalTimeSpent + currentTimeSpend;
    cps = totalCharacterTyped / totalTimeSpent;
    displayNewCode();
    return;
  }
};

const handleInput = (event) => {
  // Step 2
  compareValues(event.target.value);
};
inputCodeBox.on("input", handleInput);
/* Timing: 
1. setMaxTime = 10; 
  set TimerBoxWidth = 100%
2. declare remainingTime ( declare only, will assign remaining Time = maxTIme in function starterTime), because we need to set remainingTime = maxTime in everyTime startTimer() run
3. start to calculateTIme by repeat functon reduceTime Untill Time === 0
  3.1. Set remainingTime = maxTime
  3.2. Reduce remainingTime; & Rerduce TimerBoxWidth by remainingTIme% 
  3.3. If remainingTIme === 0:
      + Stop decreaseTime
      + Reduce TimerBoxWidth = 0
      + DisplayNewCode();
      + setTimer() again
*/

// Timer

const stopTime = () => {
  clearInterval(runingTimeInterval);
  return;
};
const decreaseTime = () => {
  remainingTime--; // 10 9 8 7 6 5 4 3 2 1 0
  timerText.text(remainingTime);
  timerBox.css("width", "0%");
  timerBox.css("background-color", "cyan");
  timerBox.css("transition", `${maxTime - 1}s linear`);
  if (remainingTime < 0) {
    stopTime();
    displayNewCode();
    startTimer();
    return;
  }
};
const startTimer = () => {
  if (codeListDisplay.length > 0) {
    remainingTime = maxTime;
    timerBox.css("transition", "none");
    timerBox.css("background-color", "yellow");
    timerBox.css("width", "100%");
    timerText.text(maxTime);
    runingTimeInterval = setInterval(decreaseTime, 1000);
  } else {
    return;
  }
};

//---------------------------ENDGAME--------------------------
function endGame() {
  modalEndGame.css("display", "block"); // show modal-endgame
  container.css("display", "none"); // hide container box
  timerText.css("display", "none");
  cpsBox.text(cps);
}

restartButton.on("click", () => {
  window.location.reload();
});

$(document).ready(function () {
  codeListDisplay = codeList.slice();
  displayNewCode();
});

/*

1) Store the input code into codeEncounteredArray
2) Use push method to do it and store element
---> declare a variable and assign it with
---> let storeCodeTypedArray = [];
Display codeEncounteredArray in endGame fn
*/
