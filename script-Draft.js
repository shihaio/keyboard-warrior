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
 * 3. display resultCode
 *  */
// const codeList = [`apple`, `banana`, `charlie`, `delta`, `echo`];
// const codeList = [
//   { title: "DOM-jquery : select element", code: `("div")`, timing: 5 },
//   {
//     title: "forEach method",
//     code: `[1,2,3].forEach((item) => { console.log(item)})`,
//     timing: 10,
//   },
//   {
//     title: "DOM-jquery : create element",
//     code: `("<div>").text("apple").addClass("fruit")`,
//     timing: 10,
//   },
//   {
//     title: "DOM-jquery : add attribute",
//     code: `(".fruit").css("background-color", "red")`,
//     timing: 10,
//   },
//   {
//     title: "Variable",
//     code: `const myName = "teddy"`,
//     timing: 10,
//   },
// ];

const codeList = [
  { title: "DOM-jquery : select element", code: `apple`, timing: 5 },
  {
    title:
      "Datatypes : A string is made up of characters, it is wrapped in quotes or backticks.",
    code: `String`,
    timing: 5,
  },
  {
    title:
      "Datatypes : Numbers, in JavaScript can be both integers and floating point numbers (numbers with decimals).",
    code: `Numbers`,
    timing: 5,
  },
  { title: "Datatypes : A variable can be made up of letters, numbers and some characters (like _ and $)", code: `variables`, timing: 5 },
  { title: "Datatypes : select element", code: `apple`, timing: 5 },
];

const codeListDisplay = codeList.slice();
let currentCodeDisplayObject; //{ title: "DOM-jquery : select element", code: `apple`, timing: 5 },
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
const codeEncounteredBox = $(".code-encountered");

let totalTimeSpent = 0;
let totalCharacterTyped = 0;
let cps = 0; // totalCharacterTyped / totalTimeSpent;
let recordElementArray = []; // ["apple"]
let gameInRunning; // condition to keep the game running
let testFruitLength = codeListDisplay.length;
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
    codeArray[i] = `<span>${character}</span>`;
  }
  const formattedCode = codeArray.join("");
  return formattedCode; // <span>a</span><span>p></span>
};

const displayNewCode = () => {
  gameInRunning = codeListDisplay.length > 0;
  if (gameInRunning) {
    startTimer();
    const randomIndex = Math.floor(Math.random() * codeListDisplay.length);
    currentCodeDisplayObject = codeListDisplay[randomIndex];
    const randomCode = currentCodeDisplayObject.code; // "apple"
    codeListDisplay.splice(randomIndex, 1);
    const displayCode = formatCode(randomCode);
    displayCodeBox.html(displayCode); // SH: this shows an object.
    inputCodeBox.val(""); //
  } else {
    endGame();
  }
};

// displayNewCode();

const compareValues = (inputValue) => {
  // Step 2a
  const inputValueArray = inputValue.split(""); // ['b','a','n','n','a','a']
  let resultCode = true;

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
      resultCode = false;

      // Step 2e + 3
      // if user key in incorrect character
    } else {
      $(`pre.display-code > span:eq(${index})`).toggleClass("correct", false);
      $(`pre.display-code > span:eq(${index})`).toggleClass("incorrect", true);
      resultCode = false;
    }
  });

  // Store code into array
  storeCodeArray = (item) => {
    recordElementArray.push(item); //array of displayCodeObject :{ title: "DOM-jquery : select element", code: `apple`, timing: 5 },
  };

  // Display store code array

  // step 2f
  // consolidate the resultCode
  // if all matches, move to another question
  if (resultCode === true) {
    storeCodeArray(currentCodeDisplayObject);

    const currentTimeSpend = maxTime - remainingTime;

    const currentCharacterTyped = inputValueArray.length;
    totalCharacterTyped = totalCharacterTyped += currentCharacterTyped;
    totalTimeSpent = totalTimeSpent + currentTimeSpend;
    cps = totalCharacterTyped / totalTimeSpent;
    displayNewCode();
    return;
  }
  // condition when the last question typing wrong, and timeout, it will go to endGame()
  if (
    resultCode === false &&
    remainingTime < 0 &&
    codeListDisplay.length === 0
  ) {
    endGame();
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

// ----------------------------Timer-------------------------------------

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
  if (remainingTime < 0 && codeListDisplay.length > 0) {
    stopTime();
    displayNewCode();
    // startTimer();
    return;
  }
  // condition when the last question typing wrong, and timeout, it will go to endGame()
  // if (remainingTime < 0 && codeListDisplay.length === 0) {
  //   endGame();
  // }
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
    endGame();
  }
};

//---------------------------ENDGAME--------------------------
function addRecordElement() {
  recordElementArray.forEach((item) => {
    const newRecordElement = $("<div>")
      .text(item.title)
      .addClass("record-element");
    codeEncounteredBox.append(newRecordElement);
  });
}
function endGame() {
  modalEndGame.css("display", "block"); // show modal-endgame
  container.css("display", "none"); // hide container box
  timerText.css("display", "none");
  cpsBox.text(cps);
  addRecordElement(); // show stored record in last page, display every element in the array
  // codeEncounteredArray();
}

restartButton.on("click", () => {
  window.location.reload();
});

$(document).ready(function () {
  displayNewCode();
});

/*

1) Store the input code into codeEncounteredArray
2) Use push method to do it and store element
---> declare a variable and assign it with
---> let storeCodeTypedArray = [];
Display codeEncounteredArray in endGame fn
*/

// take element from recordElementArray ,
//show it in <div class="record-element">element</div> ,
//put inside element have class "code-encounted"

//---------------------------ENOUNTERCODE HOVER--------------------------
$("div.record-element").hover((event) => {
  console.log(event.target.children);
  event.target.children().css("background-color", "red");
});
