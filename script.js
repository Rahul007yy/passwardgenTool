$(document).ready(function () {
    // Generate Password Button Click
    $("#generate-button").on("click", function () {
      var length = parseInt($("#password-length").val());
  
      // Validate input length
      if (isNaN(length) || length < 8 || length > 64) {
        alert("Please enter a valid password length between 8 and 64.");
        return;
      }
  
      var password = generatePassword(length);
      $("#password-display").val(password);
    });
  
    // Copy Password to Clipboard
    $("#copy-button").on("click", function () {
      var password = $("#password-display").val();
  
      if (!password) {
        alert("No password generated yet!");
        return;
      }
  
      // Use modern clipboard API
      navigator.clipboard
        .writeText(password)
        .then(() => alert("Password copied to clipboard!"))
        .catch(() => alert("Failed to copy password."));
    });
  });
  
  // More Secure Password Generation
  function generatePassword(length) {
    var charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    var password = "";
    var randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues); // Generate secure random numbers
  
    for (var i = 0; i < length; i++) {
      var index = Math.floor(randomValues[i] / (2 ** 32) * charset.length);
      password += charset[index];
    }
  
    return password;
  }  