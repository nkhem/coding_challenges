// In the given index.js file, replace the "Your code goes here" comment with JavaScript that can:
//
// * Validate data entry (age is required and > 0, relationship is required)
// * Add people to a growing household list
// * Remove a previously added person from the list
// * Display the household list in the HTML as it is modified
// * Serialize the household as JSON upon form submission as a fake trip to the server
var household = [];

function displayErrorMessages(){
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode("Required field");
  newDiv.appendChild(newContent); //add the text node to the newly created div.

  ageEl.insertBefore(newDiv);
}

function addNewMemberToHousehold(){

}

function displayCurrentHousehold(){

}

function onAddBtnClick (e){
  e.preventDefault();

  //add the new member to the household
  var newMember = {
    age: ageEl.value,
    rel: relEl.value,
    smoker: smokerEl.checked ? "true" : "false"
  };
  household.push(newMember);

  //clear household ol
  while (householdListEl.firstChild) {
    householdListEl.removeChild(householdListEl.firstChild);
  }

  //update household display
  for(var i = 0; i < household.length ; i++){
    var node = document.createElement("LI");
    var textnode = document.createTextNode("Age: " + household[i].age + ", Rel: " + household[i].rel + ", Smoker: " + household[i].smoker );
    node.appendChild(textnode);

    householdListEl.appendChild(node);
  }

  // displayErrorMessages();

  formEl.reset();

}

var householdListEl = document.getElementsByClassName("household")[0];

var formEl = document.querySelector("form");
var ageEl = document.getElementsByName("age")[0];
var relEl = document.getElementsByName("rel")[0];
var smokerEl = document.getElementsByName("smoker")[0];

var ageValue = ageEl.value;
var relValue = relEl.value;
var smokerValue = smokerEl.value;

var addBtnEl = document.getElementsByClassName('add')[0];
var submitBtnEl = document.querySelector('button[type="submit"]');
// var ageValue = document.getElementById("uniqueID").value;
// var relationshipValue = document.getElementById("uniqueID").value;
// var isSmokerValue = document.getElementById("uniqueID").value;
addBtnEl.addEventListener("click", onAddBtnClick);
