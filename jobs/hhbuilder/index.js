// In the given index.js file, replace the "Your code goes here" comment with JavaScript that can:
//
// * Validate data entry (age is required and > 0, relationship is required)
// * Add people to a growing household list
// * Remove a previously added person from the list
// * Display the household list in the HTML as it is modified
// * Serialize the household as JSON upon form submission as a fake trip to the server
var household = {};
var isValidSubmission;

function trim (str) {
  return str.replace (/^\s+|\s+$/g, '');
}
//
// function validateAddition(searchTerm){
//   // remove "?age=" from beginning
//
//   var age = str.slice("?age=".length, str.length - 1)
//
//   isValidSubmission =
// }
function onSubmit (e){
  e.preventDefault();
  var age = document.getElementsByName("age")[0].value;
  var rel = document.getElementsByName("rel")[0].value;
  var smoker = document.getElementsByName("smoker")[0].value;

  console.log(age, rel, smoker);
  if(isValidSubmission)
  console.log();

  //
  // if(isValidSubmission){
  //
  // }

}

var addBtnEl = document.getElementsByClassName('add')[0];
var submitBtnEl = document.querySelector('button[type="submit"]');
// var ageValue = document.getElementById("uniqueID").value;
// var relationshipValue = document.getElementById("uniqueID").value;
// var isSmokerValue = document.getElementById("uniqueID").value;
addBtnEl.addEventListener("click", onSubmit);
