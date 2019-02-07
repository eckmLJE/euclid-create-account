// Password Match Validation
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

// Navigation

var stepOneCard = $("#basic-information-card");
var stepTwoCard = $("#contact-information-card");
var stepThreeCard = $("#additional-card");

$("#step-two-back-button").click(stepTwoBackToThree); // No validation for navigating backwards
$("#step-three-back-button").click(stepThreeBackToOne); // No validation for navigating backwards

var stepperHeaderStepOne = $("#stepper-basic-header");
var stepperHeaderStepTwo = $("#stepper-contact-header");
var stepperHeaderStepThree = $("#stepper-additional-header");

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

// Load and Fill Form Data

function loadFormData() {
  var data = {
    billingData: {},
    paymentData: {}
  };
  billingForm.serializeArray().forEach(function(ele) {
    data.billingData[ele.name] = ele.value;
  });
  paymentForm.serializeArray().forEach(function(ele) {
    data.paymentData[ele.name] = ele.value;
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

// Initialize

function initialize() {
  $("#username-input").focus();
}

$(initialize);
