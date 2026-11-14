// =========================================================
// contact.js - Contact form validation
// Checks: no empty fields, valid email, phone has digits only
// =========================================================

// 1. Get the form and its fields
var form = document.getElementById("contactForm");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var messageInput = document.getElementById("message");
var formMessage = document.getElementById("formMessage");

// 2. Function to show an error under a field
function showError(id, text) {
  document.getElementById(id).textContent = text;
}

// 3. Function to check the email format (must look like name@site.com)
function isValidEmail(email) {
  var atPosition = email.indexOf("@");
  var dotPosition = email.lastIndexOf(".");

  // "@" must not be first, "." must come after "@", and something must follow the "."
  if (atPosition > 0 && dotPosition > atPosition + 1 && dotPosition < email.length - 1) {
    return true;
  }
  return false;
}

// 4. Function to check that the phone number has digits only
function isOnlyDigits(phone) {
  for (var i = 0; i < phone.length; i++) {
    // Each character must be between "0" and "9"
    if (phone[i] < "0" || phone[i] > "9") {
      return false;
    }
  }
  return true;
}

// 5. Run this when the form is submitted
form.addEventListener("submit", function (event) {
  // Stop the page from reloading
  event.preventDefault();

  // Clear old messages
  showError("nameError", "");
  showError("emailError", "");
  showError("phoneError", "");
  showError("messageError", "");
  formMessage.textContent = "";

  // Get what the user typed (trim removes extra spaces)
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var phone = phoneInput.value.trim();
  var message = messageInput.value.trim();

  var allGood = true;   // stays true if there are no mistakes

  // Check name
  if (name === "") {
    showError("nameError", "Please enter your name.");
    allGood = false;
  }

  // Check email
  if (email === "") {
    showError("emailError", "Please enter your email address.");
    allGood = false;
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email, e.g. name@example.com");
    allGood = false;
  }

  // Check phone
  if (phone === "") {
    showError("phoneError", "Please enter your phone number.");
    allGood = false;
  } else if (!isOnlyDigits(phone)) {
    showError("phoneError", "Phone number must contain digits only.");
    allGood = false;
  }

  // Check message
  if (message === "") {
    showError("messageError", "Please enter a message.");
    allGood = false;
  }

  // If everything is correct, show a success message and clear the form
  if (allGood === true) {
    formMessage.textContent = "Thank you, " + name + "! Your message has been sent.";
    form.reset();
  }
});
