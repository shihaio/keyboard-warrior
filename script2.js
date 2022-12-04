const codeList = [
  `dinosaurs.forEach((apple) => {
  console.log(apple); 
});`,
  `$("p").remove(".test, .demo");`,
  `$(this).removeClass("incorrect")`,
  `while (alive) {
    east();
    sleep();
    code();
    repeat();
}`,
];

// Element Sectors.
const inputCodeBox = $(".input-code"); // select element using jQuery, player inputs code here
const displayCodeBox = $(".display-code"); // select element using jQuery, display code here
let initialCodeArray // declare a variable without assignment

// Step 1: 
const formatCode = (code) => {
  initialCodeArray = code.split("");
  const codeArray = initialCodeArray.slice();

  for (let i = 0; i < codeArray.length; i++){
    const character = codeArray[i];
    codeArray[i] = `<span class="correct>${character}</span>`;
    codeArray[i] = `<span class="incorrect>${character}</span>`;
    codeArray[i] = `<span>${character}</span>`;

    const formattedCode = codeArray.join("");
    return formattedCode;
    /*You can use .join() to join all the elements in an array together into one big string 
    When you call the join method on an array, it returns a string containing
    all the elements, separated by commas
    If the values in the array aren't strings, JavaScript will convert them to strings
    before joining them together */
  }
}

const displayNewCode = () => {
  const randomIndex = Math.floor(Math.random() * codeList.length);
  const randomCode = codeList[randomIndex]
  const displayCode = formatCode(randomCode);
  displayCodeBox.html(displayCode); // this is used to set content. jQuery, Manipulation purpose, DOM insertion, inside
  inputCodeBox.text("") // this is used to set the text content of input text code. execute user input.
};

displayNewCode();

const compareValues = (inputValue) => {
// Step 2a
  const inputValueArray = inputValue.split();

// Step 2b
  initialCodeArray.forEach((character, index) => {
    // step 2c + 3
    if (character === inputValueArray[index]) {
      $(`pre.display-code > span:eq(${index})`).toggleClass("correct", true);
      $(`pre.display-code > span:eq(${index})`).toggleClass("incorrect", false);
      
      // step 2d + 3
    } else if (inputValueArray[index] === undefined) { // if input code box is blank
      $(`pre.display-code > span:eq(${index})`).toggleClass("correct", false);
      $(`pre.display-code > span:eq(${index})`).toggleClass("incorrect", false);
      
      // step 2e + 3
    } else {
      $(`pre.display-code > span:eq(${index})`).toggleClass("correct", false);
      $(`pre.display-code > span:eq(${index})`).toggleClass("incorrect", true);
    }
  })
}
const handleInput = (event) => {
  // Step 2
  compareValues(event.target.value);
};

inputCodeBox.on("input", handleInput);

