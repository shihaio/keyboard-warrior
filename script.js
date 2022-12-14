const codeList = [
  `const display = "Hello World"`,
  `let resultCode = true;`,
  `Semicolons`,
  `Null, Undefined`,
  `[1,2,3].push(4)`,
  `typeof`,
  `Equality (==)`,
  `Math.ceil()`,
  `6%2 === 0`,
  `[1,2,3].forEach(item => item*2`,
  `const newArray = [1,2,3].filter(item => item > 1)`, // newArray = [2,3]
  `const newArray = [1,2,3].map(item => item*2)`, // newArray = [2,4,6]
  `let num = num[3]`,
  `[1,2,3].length`,
  `[[1,2,3],[4,5,6]]`,
  `indexOf`,
  `[1,2,3].push()`,
  `[1,2,3].pop()`,
  `[1,2,3].reverse()`,
  `[1,2,3].unshift()`,
];

const codeListDisplay = codeList.slice();

// Element Sectors.
const inputCodeBox = $(".input-code"); // select element using jQuery, player inputs code here
const displayCodeBox = $(".display-code"); // select element using jQuery, display code here
const modalEndGame = $(".modal-endgame");
const container = $(".container");
const timerText = $(".timer-text");
const timerBox = $(".timer-box");
const cpsBox = $(".character-per-count");
const restartButton = $("#restart-game");
const codeEncounteredBox = $(".code-encountered");

let totalTimeSpent = 0;
let totalCharacterTyped = 0;
let cps = 0; // totalCharacterTyped / totalTimeSpent;
let recordElementArray = []; // ["apple"]
let maxQuestion = 5; // condition to keep the game running
// let gameInRunning = maxQuestion > 0;

// Seletion for Timing:
const maxTime = 20;
let remainingTime;
let runingTimeInterval;

// Step 1:
const formatCode = (code) => {
  const initialCodeArray = code.split(""); // ["h". "u", "h", "u"]
  const codeArray = initialCodeArray.slice(); // ["a","p","p","l","e"]
  for (let i = 0; i < codeArray.length; i++) {
    const character = codeArray[i];
    codeArray[i] = `<span>${character}</span>`;
  }
  const formattedCode = codeArray.join("");
  return formattedCode; // <span>a</span><span>p></span>
};

const displayNewCode = () => {
  if (maxQuestion > 0) {
    startTimer();
    const randomIndex = Math.floor(Math.random() * codeListDisplay.length);
    const randomCodeArray = codeListDisplay[randomIndex];
    const randomCode = randomCodeArray;
    codeListDisplay.splice(randomIndex, 1);
    const displayCode = formatCode(randomCode);
    displayCodeBox.html(displayCode);
    inputCodeBox.val("");
    maxQuestion--;
  } else {
    endGame();
  }
};

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
  const storeCodeArray = (inputValue) => {
    recordElementArray.push(inputValue);
  };

  // Display store code array

  // step 2f
  // consolidate the resultCode
  // if all matches, move to another question
  if (resultCode) {
    storeCodeArray(inputValue);
    const currentTimeSpend = maxTime - remainingTime;
    const currentCharacterTyped = inputValueArray.length;
    totalCharacterTyped = totalCharacterTyped += currentCharacterTyped;
    totalTimeSpent = totalTimeSpent + currentTimeSpend;
    cps = (totalCharacterTyped / totalTimeSpent).toFixed(2);
    displayNewCode();
    return;
  }
  // condition when the last question typing wrong, and timeout, it will go to endGame()
  if (resultCode === false && remainingTime < 0 && maxQuestion === 0) {
    endGame();
  }
  if (resultCode && remainingTime < 0 && maxQuestion === 0) {
    endGame();
  }
};

const handleInput = (event) => {
  // Step 2
  compareValues(event.target.value);
};
inputCodeBox.on("input", handleInput);

const startTimer = () => {
  if (maxQuestion > 0) {
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
const decreaseTime = () => {
  if (maxQuestion > 0) {
    remainingTime--; // 10 9 8 7 6 5 4 3 2 1 0
    timerText.text(remainingTime);
    timerBox.css("width", "0%");
    timerBox.css("background-color", "cyan");
    timerBox.css("transition", `${maxTime - 1}s linear`);
    if (remainingTime === 0) {
      // stopTime();
      clearInterval(runingTimeInterval);
      displayNewCode();
      // startTimer();
      return;
    }
  } else clearInterval(runingTimeInterval);
};

//---------------------------ENDGAME--------------------------
function addRecordElement() {
  recordElementArray.forEach((item) => {
    const newRecordElement = $("<div>").text(item).addClass("record-element");
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
