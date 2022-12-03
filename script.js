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
const $inputCodeBox = $(".input-code");

$inputCodeBox.on("input", compareValue);

function compareValue() {
  // compare the every character between displayCodeBox.text() and inputCodeBox.val()
  // set initial result:
  let result;
  // select all the span of displayCode
  const displayCharacterArray = $("span");

  // Character from textarea split into array of input character.
  const codeInputStrToArr = $inputCodeBox.val().split("");
  codeInputStrToArr.forEach((inputCharacter, index) => {
    // if both character match add class correct into span of display charcater code.
    if (inputCharacter === displayCharacterArray.eq(index).text()) {
      displayCharacterArray.eq(index).addClass("correct");
      result = true;
    } else {
      // if both character don't macth add class incorrect into span of display character code.
      displayCharacterArray.eq(index).addClass("incorrect");
      result = false;
    }
    if (result) {
      displayNewCode();
    }
    // console.log("inputCharacter:", inputCharacter);
    // console.log(`codeDisplayStrToArr[${index}]:`, codeDisplayStrToArr[index]);
  });
  // var html = "";
  // for (let i = 0; i < splitCode.length; i++){
  //   html += "<span class="test">" + splitCode[i] + "</span>";
  // }
  // document.getElementById('demo').innerHTML = html;
}
// display new code
function displayNewCode() {
  $displayCodeBox.text("");
  const randomIndex = Math.floor(Math.random() * codeList.length);
  // $displayCodeBox.text("apple");
  // Split the question into an array of characters
  const codeDisplayStrToArr = codeList[randomIndex].split("");
  // Create span for each character of the array
  codeDisplayStrToArr.forEach((character) => {
    const $newDisplayCharacter = $("<span>").text(character);
    // insert content in span tag into display-code
    $(".display-code").append($newDisplayCharacter);
  });
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
});
