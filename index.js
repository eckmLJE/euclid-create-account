// Selectors

var stepOneCard = $("#basic-information-card");
var stepTwoCard = $("#contact-information-card");
var stepThreeCard = $("#additional-information-card");
var stepFourCard = $("confirmation-card");

var stepperHeaderStepOne = $("#stepper-basic-header");
var stepperHeaderStepTwo = $("#stepper-contact-header");
var stepperHeaderStepThree = $("#stepper-additional-header");
var stepperHeaderStepFour = $("#stepper-confirm-header");

var stepOneForm = $("#form-basic");
var stepTwoForm = $("#form-contact");
var stepThreeForm = $("#form-additional");

var passwordInput = document.querySelector("#password-input");
var passwordConfirmInput = document.querySelector("#password-confirm-input");

// Navigation

$("#step-two-back-button").click(stepTwoBack); // No validation for navigating backwards
$("#step-three-back-button").click(stepThreeBack); // No validation for navigating backwards

function stepOneContinue() {
  stepOneCard.hide();
  stepperHeaderStepOne.toggleClass("current-step");
  stepperHeaderStepTwo.toggleClass("current-step");
  stepTwoCard.show();
  $("address-type-input").focus();
}

function stepTwoContinue() {
  stepTwoCard.hide();
  stepperHeaderStepTwo.toggleClass("current-step");
  stepperHeaderStepThree.toggleClass("current-step");
  stepThreeCard.show();
  $("#home-phone-input").focus();
}

function stepThreeContinue() {
  var formData = loadFormData();
  appendFormData(formData);
  stepThreeCard.hide();
  stepperHeaderStepThree.toggleClass("current-step");
  stepperHeaderStepFour.toggleClass("current-step");
  stepFourCard.show();
}

function stepTwoBack() {
  stepTwoCard.hide();
  stepperHeaderStepOne.toggleClass("current-step");
  stepperHeaderStepTwo.toggleClass("current-step");
  stepOneCard.show();
  $("#username-input").focus();
}

function stepThreeBack() {
  stepThreeCard.hide();
  stepperHeaderStepThree.toggleClass("current-step");
  stepperHeaderStepOne.toggleClass("current-step");
  stepOneCard.show();
  $("#first-name").focus();
}

// Form Validation

stepOneForm.on("submit", validateStepOneInfoSubmit);
stepTwoForm.on("submit", validateStepTwoInfoSubmit);
stepThreeForm.on("submit", validateStepThreeInfoSubmit);

function validateStepOneInfoSubmit(e) {
  e.preventDefault();
  e.currentTarget.checkValidity()
    ? stepOneContinue()
    : e.currentTarget.classList.add("was-validated");
}

function validateStepTwoInfoSubmit(e) {
  e.preventDefault();
  e.currentTarget.checkValidity()
    ? stepTwoContinue()
    : e.currentTarget.classList.add("was-validated");
}

function validateStepThreeInfoSubmit(e) {
  e.preventDefault();
  e.currentTarget.checkValidity()
    ? stepThreeContinue()
    : e.currentTarget.classList.add("was-validated");
}

// Password Match Validation

passwordInput.addEventListener("change", validatePassword);
passwordConfirmInput.addEventListener("keyup", validatePassword);

function validatePassword() {
  passwordInput.value !== passwordConfirmInput.value
    ? passwordConfirm.setCustomValidity("Passwords Must Match")
    : passwordConfirm.setCustomValidity("");
}

// Load and Fill Form Data

function loadFormData() {
  var data = {
    stepOneData: {},
    stepTwoData: {},
    stepThreeData: {}
  };
  stepOneForm.serializeArray().forEach(function(ele) {
    data.stepOneData[ele.name] = ele.value;
  });
  stepTwoForm.serializeArray().forEach(function(ele) {
    data.stepTwoData[ele.name] = ele.value;
  });
  stepThreeForm.serializeArray().forEach(function(ele) {
    data.stepThreeData[ele.name] = ele.value;
  });
  return data;
}

function appendFormData(data) {
  var billingDetails =
    '<p class="mb-0">' +
    data.billingData.firstName +
    " " +
    data.billingData.lastName +
    '</p><p class="mb-0">' +
    data.billingData.streetAddress +
    '</p><p class="mb-0' +
    (data.billingData.streetAddress2
      ? '">' + data.billingData.streetAddress2
      : ' d-none d-sm-block d-md-none d-lg-block">' + "<span>&nbsp</span>") +
    '</p><p class="mb-0">' +
    data.billingData.city +
    ", " +
    data.billingData.state +
    '</p><p class="mb-0">' +
    data.billingData.zip +
    "</p>";
  var cardNumber = data.paymentData.cardNumber;
  var paymentDetails =
    '<p class="mb-0">' +
    data.paymentData.cardName +
    '</p><p class="mb-0">' +
    (cardNumber.length === 15
      ? "**** ****** *" + cardNumber.slice(14)
      : "**** **** **** " + cardNumber.slice(15)) +
    '</p><p class="mb-0">' +
    data.paymentData.expiration +
    '</p><p class="mb-0">***</p>';
  $("#billing-details-confirm")
    .empty()
    .append(billingDetails);
  $("#payment-details-confirm")
    .empty()
    .append(paymentDetails);
}

// Cleave input formatting

var cleaveMailingState = new Cleave("#mailing-state-input", {
  blocks: [2],
  uppercase: true
});

var cleaveMailingZIP = new Cleave("#mailing-zip-input", {
  numeral: true,
  stripLeadingZeroes: false,
  delimiter: ""
});

var cleaveWorkPhone = new Cleave("#work-phone-input", {
  phone: true,
  phoneRegionCode: "US"
});

var cleaveHomePhone = new Cleave("#home-phone-input", {
  phone: true,
  phoneRegionCode: "US"
});

var cleaveCellPhone = new Cleave("#cell-phone-input", {
  phone: true,
  phoneRegionCode: "US"
});

// Initialize

function initialize() {
  $("#username-input").focus();
}

$(initialize);
