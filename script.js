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
function displayNewCode() {
  // get random index from array
  // display random element
  $displayCodeBox.text(codeList[0]);
}
$(() => {
  displayNewCode();
});
