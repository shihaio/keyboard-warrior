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
  $displayCodeBox.text("");
  // compare the every character between displayCodeBox.text() and inputCodeBox.val()
  const randomIndex = Math.floor(Math.random() * codeList.length);
  //create a new array
  
  const codeInputStrToArr = $inputCodeBox.val().split("");
  
  codeInputStrToArr.forEach((inputCharacter, index) => {

    // create a HTML (span) element with class "correct"
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
  const randomIndex = Math.floor(Math.random() * codeList.length);
  // $displayCodeBox.text("apple");
  // Split the question into an array of characters
  const codeDisplayStrToArr = "apple".split("");
  // Create span for each character of the array
  codeDisplayStrToArr.forEach((character) => {
    const $newDisplayCharacter = $("<span>").text(character);
    // insert content in span tag into display-code
    $(".display-code").append($newDisplayCharacter);
  });
}

// transfer displayNewCode a inputNewCode
function transferCode() {
  let typedCode = $inputCodeBox.val();
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
