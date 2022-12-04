// $(document).ready(printLabel);

// Global variable
const codeList = [`Apple`, `Banana`, `Carrot`, `Durian`, `Eggplant`];
//Select Element:
const $displayCodeBox = $(".display-code");
const $inputCodeBox = $(".input-code");

// 1) set the foundation first
// Objective: to pick any number

const randomIndex = Math.floor(Math.random() * codeList.length);
const randomCode = codeList[randomIndex]
const displa
// function compareValue() {
//   // compare the every character between displayCodeBox.text() and inputCodeBox.val()
//   // set initial result:
//   let result = true;
//   // select all the span of displayCode
//   const displayCharacterArray = document.querySelectorAll("span"); // array of span [span, span, span]
//   // Character from textarea split into array of input character.
//   const codeInputStrToArr = $inputCodeBox.val().split("");
//   // console.log(codeInputStrToArr);
//   displayCharacterArray.forEach((displayCharacter, index) => {
//     const inputCharacter = codeInputStrToArr[index];
//     // if both character match add class correct into span of display charcater code.
//     if (!inputCharacter) {
//       displayCharacter.classList.remove("correct");
//       displayCharacter.classList.remove("incorrect");
//       console.log("huhu");
//       result = false;
//     }
//     if (displayCharacter.innerText === inputCharacter) {
//       // change the sequence here
//       displayCharacter.classList.add("correct");
//       displayCharacter.classList.remove("incorrect");
//       console.log("this letter is true");
//       // result = true; // use boolean to assess the result
//     } else {
//       // if both character don't macth add class incorrect into span of display character code.
//       displayCharacter.classList.add("incorrect");
//       displayCharacter.classList.remove("correct");
//       result = false;
//     }
//   });
//   if (result) {
//     console.log("all true");
//     displayNewCode();
//     $inputCodeBox.val("");
//   }
// }
// // display new code
// function displayNewCode() {
//   $displayCodeBox.text("");
//   const randomIndex = Math.floor(Math.random() * codeList.length);
//   // Split the question into an array of characters
//   const codeDisplayStrToArr = codeList[randomIndex].split("");
//   // Create span for each character of the array
//   codeDisplayStrToArr.forEach((character) => {
//     const $newDisplayCharacter = $("<span>").text(character);
//     // insert content in span tag into display-code
//     $(".display-code").append($newDisplayCharacter);
//   });
// }

// create compare value function
// displayCodeBox VS

// const typedCode = $(".input-code").val();
// console.log(typedCode);
// create a function that compare between displayNewCode and inputNewCode

// Check acurracy
// Move to next round

// $(() => {
//   displayNewCode();
// });
