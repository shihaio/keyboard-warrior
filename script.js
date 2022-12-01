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

// display new code
function displayNewCode() {
  const randomIndex = Math.floor(Math.random() * codeList.length);
  $displayCodeBox.text(codeList[randomIndex]);
}

$(() => {
  displayNewCode();
});
