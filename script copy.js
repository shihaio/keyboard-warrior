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
const codeList = [`apple`, `banana`];
let codeListDisplay;

// Element Sectors.
const inputCodeBox = $(".input-code"); // select element using jQuery, player inputs code here
const displayCodeBox = $(".display-code"); // select element using jQuery, display code here
let initialCodeArray; // declare a variable without assignment
const modalEndGame = $(".modal-endgame");
const container = $(".container");
const timerText = $(".timer-text");
const timerBox = $(".timer-box");
const cpsBox = $(".character-per-count");
let cps; //codeListDisplay.length / 10
let accTime;
let doneText;
// Step 1:
const formatCode = (code) => {
  initialCodeArray = code.split(""); // ["a","p","p","l","e"]
  const codeArray = initialCodeArray.slice(); // ["a","p","p","l","e"]

  for (let i = 0; i < codeArray.length; i++) {
    const character = codeArray[i];
    // codeArray[i] = `<span class="correct>${character}</span>`;
    // codeArray[i] = `<span class="incorrect>${character}</span>`;
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
    const displayCode = formatCode(randomCode);
    displayCodeBox.html(displayCode);
    inputCodeBox.val("");
    console.log("codeListDisplay:", codeListDisplay);
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

  // step 2f
  // consolidate the result
  // if all matches, move to another question
  if (result === true) {
    displayNewCode();
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

const maxTime = 10;
let remainingTime;
let runningTimeInterval;

const stopTime = () => {
  console.log("end");
  clearInterval(runningTimeInterval);
  return;
};

const decreaseTime = () => {
  remainingTime--;

  if (remainingTime === 0) {
    stopTime();
    displayNewCode();
    startTimer();
    return;
  } else {
    const remainingWidth = remainingTime / 10;
    timerBox.css("width", `${remainingWidth}%`);
    timerText.text(`${remainingTime}`);
  }
};

const startTimer = () => {
  remainingTime = maxTime;
  // timerBox.css("width", "100%");
  runningTimeInterval = setInterval(decreaseTime, 1000);
};

//---------------------------ENDGAME--------------------------
function endGame() {
  modalEndGame.css("display", "block"); // show modal-endgame
  container.css("display", "none"); // hide container box
  timerText.css("display", "none");
  cpsBox.text(4);
}

window.BeforeUnloadEvent();

$(document).ready(function () {
  codeListDisplay = codeList.slice();
  displayNewCode();
  // startTimer();
});

// -----------------RESTART-BUTTON------------
