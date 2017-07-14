// In the given index.js file, replace the "Your code goes here" comment with JavaScript that can:
//
// * Validate data entry (age is required and > 0, relationship is required)
// * Add people to a growing household list
// * Remove a previously added person from the list
// * Display the household list in the HTML as it is modified
// * Serialize the household as JSON upon form submission as a fake trip to the server
var household = [];
var errorMessages = [];

function validateInput(){
  errorMessages = [];

  if( ageEl.value === "" ){
    errorMessages.push("Age is required field");
  } else if (!parseInt(ageEl.value) || parseInt(ageEl.value) < 0){
    errorMessages.push("Invalid age input");
  }

  if( relEl.value === "" ){
    errorMessages.push("Relationship is required field");
  }

}

function rerenderHousehold(){
  //clear all li elements from household ol
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
}

function displayErrorMessages(){
  while (errorsEl.firstChild) {
    errorsEl.removeChild(errorsEl.firstChild);
  }

  for(var i = 0; i < errorMessages.length ; i++){
    var errorLiNode = document.createElement("LI");
    var textnode = document.createTextNode(errorMessages[i]);
    errorLiNode.appendChild(textnode);
    errorsEl.appendChild(errorLiNode);
  }
}

function clearErrorMessages(){
  errorMessages = [];
  
  while (errorsEl.firstChild) {
    errorsEl.removeChild(errorsEl.firstChild);
  }
}

function onAddBtnClick (e){
  e.preventDefault();

  validateInput();

  if( errorMessages.length === 0 ){
    clearErrorMessages();
    household.push({
      age: ageEl.value,
      rel: relEl.value,
      smoker: smokerEl.checked ? "true" : "false"
    });
    rerenderHousehold();
    formEl.reset();
  } else {
    displayErrorMessages();
  }

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

//create a ul for error messages
var errorsEl = document.createElement("UL");
errorsEl.setAttribute("id", "error-messages");
formEl.insertBefore(errorsEl, formEl.childNodes[0]);
