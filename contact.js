var form = document.getElementById("contactForm");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var messageInput = document.getElementById("message");
var formMessage = document.getElementById("formMessage");

function showError(id, text) {
  document.getElementById(id).textContent = text;
}

function isValidEmail(email) {
  var atPosition = email.indexOf("@");
  var dotPosition = email.lastIndexOf(".");

  if (atPosition > 0 && dotPosition > atPosition + 1 && dotPosition < email.length - 1) {
    return true;
  }
  return false;
}

function isOnlyDigits(phone) {
  for (var i = 0; i < phone.length; i++) {

    if (phone[i] < "0" || phone[i] > "9") {
      return false;
    }
  }
  return true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  showError("nameError", "");
  showError("emailError", "");
  showError("phoneError", "");
  showError("messageError", "");
  formMessage.textContent = "";

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var phone = phoneInput.value.trim();
  var message = messageInput.value.trim();

  var allGood = true;  

  if (name === "") {
    showError("nameError", "Please enter your name.");
    allGood = false;
  }

  if (email === "") {
    showError("emailError", "Please enter your email address.");
    allGood = false;
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email, e.g. name@example.com");
    allGood = false;
  }

  if (phone === "") {
    showError("phoneError", "Please enter your phone number.");
    allGood = false;
  } else if (!isOnlyDigits(phone)) {
    showError("phoneError", "Phone number must contain digits only.");
    allGood = false;
  }

  if (message === "") {
    showError("messageError", "Please enter a message.");
    allGood = false;
  }

  if (allGood === true) {
    formMessage.textContent = "Thank you, " + name + "! Your message has been sent.";
    form.reset();
  }
});
