// Card Selectors

var stepOneCard = $("#basic-information-card");
var stepTwoCard = $("#contact-information-card");
var stepThreeCard = $("#additional-information-card");
var stepFourCard = $("#confirmation-card");

// Stepper Header Selectors

var stepperHeaderStepOne = $("#stepper-basic-header");
var stepperHeaderStepTwo = $("#stepper-contact-header");
var stepperHeaderStepThree = $("#stepper-additional-header");
var stepperHeaderStepFour = $("#stepper-confirm-header");

// Form Selectors

var stepOneForm = $("#form-basic");
var stepTwoForm = $("#form-contact");
var stepThreeForm = $("#form-additional");

// Navigation

$("#step-two-back-button").click(stepTwoBack); // No validation for navigating backwards
$("#step-three-back-button").click(stepThreeBack); // No validation for navigating backwards
$("#step-four-back-button").click(stepFourBack); // (Back to Beginning) No validation for navigating backwards

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
  // Loads form and continues to Confirmation
  var formData = loadFormData();
  var formattedUserData = formatUserData(formData);
  appendFormData(formattedUserData);
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
  stepperHeaderStepTwo.toggleClass("current-step");
  stepTwoCard.show();
  $("#first-name").focus();
}

function stepFourBack() {
  stepFourCard.hide();
  stepperHeaderStepFour.toggleclass("current-step");
  stepperHeaderStepOne.toggleClass("current-step");
  stepOneCard.show();
  $("#username-input").focus();
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

var passwordInput = document.querySelector("#password-input");
var passwordConfirmInput = document.querySelector("#password-confirm-input");

passwordInput.addEventListener("change", validatePassword);
passwordConfirmInput.addEventListener("keyup", validatePassword);
passwordInput.addEventListener("blur", passwordBlueValidity);
passwordConfirmInput.addEventListener("blur", passwordMatchBlurValidity);

function validatePassword() {
  passwordInput.value !== passwordConfirmInput.value
    ? passwordConfirmInput.setCustomValidity("Passwords Must Match")
    : passwordConfirmInput.setCustomValidity("");
}

function passwordBlueValidity() {
  passwordInput.checkValidity();
  passwordInput.parentElement.classList.add("was-validated");
}

function passwordMatchBlurValidity() {
  passwordConfirmInput.checkValidity();
  passwordConfirmInput.parentElement.classList.add("was-validated");
}

// Load and Fill Form Data

function loadFormData() {
  var data = {};
  stepOneForm.serializeArray().forEach(function(ele) {
    data[ele.name] = ele.value;
  });
  stepTwoForm.serializeArray().forEach(function(ele) {
    data[ele.name] = ele.value;
  });
  stepThreeForm.serializeArray().forEach(function(ele) {
    data[ele.name] = ele.value;
  });
  console.log(data);
  return data;
}

function formatUserData(data) {
  var basicOrder = [
    "username",
    "prefix",
    "firstName",
    "lastName",
    "email",
    "jobTitle",
    "companyName"
  ];
  var contactOrder = [
    "addressType",
    "mailingAddress",
    "mailingAddress2",
    "mailingCity",
    "mailingState",
    "mailingZip",
    "country",
    "workPhone",
    "workPhoneExt"
  ];
  var additionalOrder = [
    "homePhone",
    "cellPhone",
    "fax",
    "altEmail",
    "website"
  ];

  var formattedUserData = {
    basic: "",
    contact: "",
    additional: ""
  };

  basicOrder.forEach(function(datum) {
    formattedUserData.basic += generateP(data[datum]);
  });

  contactOrder.forEach(function(datum) {
    formattedUserData.contact += generateP(data[datum]);
  });

  additionalOrder.forEach(function(datum) {
    formattedUserData.additional += generateP(data[datum]);
  });
  console.log(formattedUserData);
  return formattedUserData;
}

function generateP(text) {
  return '<p class="mb-0">' + text + "</p>";
}

function appendFormData(formattedData) {
  $("#basic-details-confirm")
    .empty()
    .append(formattedData.basic);
  $("#contact-details-confirm")
    .empty()
    .append(formattedData.contact);
  $("#additional-details-confirm")
    .empty()
    .append(formattedData.additional);
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

var cleaveFax = new Cleave("#fax-input", {
  phone: true,
  phoneRegionCode: "US"
});

// Initialize

function initialize() {
  $("#username-input").focus();
}

$(initialize);
