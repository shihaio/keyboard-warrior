// Select an element
const $displayCodeBox = $(".display-code");
$displayCodeBox.text("Apple");

const $inputCodeBox = $(".input-code");
$inputCodeBox.val("");

$inputCodeBox.on("input", compareValue);

function compareValue() {
  $displayCodeBox.text("");
  // this is the place to add in displayCodeBox value
  const randomIndex = Math.floor(Math.random() * codeList.length);
  const codeDisplayStrToArr = codeList[randomIndex].split("");
  const codeInputStrToArr = $inputCodeBox.val().split("");
  codeDisplayStrToArr.forEach((character) => {
    // create a HTML element <span> and include text into it
    const $newCharacter = $("<span>").text(character);
    // insert content (last child) at the end of the selected element
    $(".display-code").append($newCharacter);
    codeInputStrToArr.forEach((inputCharacter, index) => {
      console.log("inputCharacter:", inputCharacter);
      console.log(`codeDisplayStrToArr[${index}]`, codeDisplayStrToArr[index]);
    });
  });
}

function functionX() {
  console.log("This is only a text.");
}

// Compare between the value between the boxes display and input

$(() => {});
