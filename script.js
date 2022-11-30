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
// display code
function getRandomCode() {
  // get random index from array
  const randomIndex = Math.floor(Math.random() * codeList.length);
  // return random element
  return codeList[randomIndex];
}
function displayNewCode() {
  // get randomeCode, assign into new variable
  const newCode = getRandomCode();
  // display new code into displayCodeBox
  $displayCodeBox.text(newCode);
}
$(() => {
  displayNewCode();
});
