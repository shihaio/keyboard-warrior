// // $(document).ready(printLabel);

// $(() => {
//   let timer = 60; // create hero
//   let interval;

//   function printLabel() {
//     console.log(timer);
//     $("#timer").text(timer); // insert text into html!
//   }

//   function addInterval() {
//     interval = setInterval(() => {
//       if (timer === 0) {
//         clearInterval(interval);
//         return;
//       }

//       timer--;
//       printLabel();
//     }, 1000);
//   }

//   printLabel(); // call functions
//   addInterval(); // call functions
// });

const dinosaurs = [
  "T-Rex",
  "Velociraptor",
  "Stegosaurus",
  "Triceraptors",
  "Branchiosaurus",
  "Pteranodon",
  "Apatosaurus",
  "Diplodocus",
  "Compsognathus",
];

// console.log(dinosaurs);
// console.log(dinosaurs[5]);
// console.log(dinosaurs[1].length);

// dinosaurs.forEach((apple) => {
//   console.log(apple);
// });

for (i = 0; i < dinosaurs.length; i++) {
  console.log(dinosaurs[i]);
  
}
