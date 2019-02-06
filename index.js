var stepOneCard = $("#basic-information-card");
var stepTwoCard = $("#contact-information-card");
var stepThreeCard = $("#extra-card");

// Password Validation
var password = document.querySelector("#password-input");
var passwordConfirm = document.querySelector("#password-confirm-input");

password.addEventListener("change", validatePassword);
passwordConfirm.addEventListener("keyup", validatePassword);

function validatePassword() {
  password.value !== passwordConfirm.value
    ? passwordConfirm.setCustomValidity("Passwords Must Match")
    : passwordConfirm.setCustomValidity("");
}

// Form Validation

var stepOneForm = $("#form-basic");
var stepTwoForm = $("#form-payment");

stepOneForm.on("submit", validateStepOneInfoSubmit);
stepTwoForm.on("submit", validateStepTwoInfoSubmit);

function validateStepOneInfoSubmit(e) {
  e.preventDefault();
  e.currentTarget.checkValidity()
    ? stepOneToTwo()
    : e.currentTarget.classList.add("was-validated");
}

function validateStepTwoInfoSubmit(e) {
  e.preventDefault();
  e.currentTarget.checkValidity()
    ? stepTwoToThree()
    : e.currentTarget.classList.add("was-validated");
}

// Checkout Navigation

$("#step-two-back-button").click(stepTwoBackToThree); // No validation for navigating backwards
$("#step-three-back-button").click(stepThreeBackToOne); // No validation for navigating backwards

var stepperHeaderStepOne = $("#stepper-basic-header");
var stepperHeaderStepTwo = $("#stepper-contact-header");
var stepperHeaderStepThree = $("#stepper-extra-header");

function stepOneToTwo() {
  stepOneCard.hide();
  stepperHeaderStepOne.toggleClass("current-step");
  stepperHeaderStepTwo.toggleClass("current-step");
  stepTwoCard.show();
  $("#card-name").focus();
}

function stepTwoBackToThree() {
  stepTwoCard.hide();
  stepperHeaderStepOne.toggleClass("current-step");
  stepperHeaderStepTwo.toggleClass("current-step");
  stepOneCard.show();
  $("#first-name").focus();
}

function stepTwoToThree() {
  var formData = loadFormData();
  appendFormData(formData);
  stepTwoCard.hide();
  stepperHeaderStepTwo.toggleClass("current-step");
  stepperHeaderStepThree.toggleClass("current-step");
  stepThreeCard.show();
}

function stepThreeBackToOne() {
  stepThreeCard.hide();
  stepperHeaderStepThree.toggleClass("current-step");
  stepperHeaderStepOne.toggleClass("current-step");
  stepOneCard.show();
  $("#first-name").focus();
}

// Cleave input formatting

var cleaveCreditCard = new Cleave("#card-number", {
  creditCard: true,
  onCreditCardTypeChanged: cleaveSetCvvAndCardPattern
});

var cleaveExpiryDate = new Cleave("#expiration", {
  date: true,
  datePattern: ["m", "Y"]
});

var cleaveState = new Cleave("#state-input", {
  blocks: [2],
  uppercase: true
});

var cleaveZIP = new Cleave("#zip-input", {
  numeral: true,
  stripLeadingZeroes: false,
  delimiter: ""
});

var cleaveExpiryDate = new Cleave("#cvv-code", {
  numeral: true,
  stripLeadingZeroes: false,
  delimiter: ""
});

function cleaveSetCvvAndCardPattern(type) {
  if (type === "amex") {
    $("#card-number").attr("pattern", "[0-9]{4} [0-9]{6} [0-9]{5}");
    $("#cvv-code").attr({
      maxlength: 4,
      pattern: "[0-9]{4}",
      placeholder: "  1234"
    });
  } else {
    $("#card-number").attr("pattern", "[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}");
    $("#cvv-code").attr({
      maxlength: 3,
      pattern: "[0-9]{3}",
      placeholder: "  123"
    });
  }
  $("#cc-icons-span")
    .find("i")
    .removeClass("text-info");
  var ccSelector = "#cc-icon-" + type;
  $(ccSelector).addClass("text-info");
}

// Initialization

function initialize() {
  $("#first-name").focus();
}

$(initialize);
