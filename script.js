// $(document).ready(printLabel);
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
//Select Element:
const $displayCodeBox = $(".display-code");
const $inputCode = $(".input-code");

$inputCode.on("input", () => console.log($inputCode.val()));
// $inputCode.val().on("input");

// display new code
function displayNewCode() {
  const randomIndex = Math.floor(Math.random() * codeList.length);
  $displayCodeBox.text(codeList[randomIndex]);
}

// transfer displayNewCode a inputNewCode
function transferCode() {
  let typedCode = $inputCode.val();
  return typedCode;
}
// create compare value function
// displayCodeBox VS

// const typedCode = $(".input-code").val();
// console.log(typedCode);
// create a function that compare between displayNewCode and inputNewCode

// Check acurracy
// Move to next round

$(() => {
  displayNewCode();
  const codeInput = transferCode();
  console.log(codeInput);
});
