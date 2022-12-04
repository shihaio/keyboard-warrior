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

const codeList = [`apple`, `banana`, `charlie`, `delta`, `echo`];

// Element Sectors.
const inputCodeBox = $(".input-code"); // select element using jQuery, player inputs code here
const displayCodeBox = $(".display-code"); // select element using jQuery, display code here
let initialCodeArray; // declare a variable without assignment

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
  const randomIndex = Math.floor(Math.random() * codeList.length);
  const randomCode = codeList[randomIndex];
  const displayCode = formatCode(randomCode);
  displayCodeBox.html(displayCode);
  inputCodeBox.val("");
};

displayNewCode();

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
