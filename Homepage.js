function submitForm() {
    // Get the selected radio button with the name "immediate-action"
    var selectedValue = document.querySelector('input[name="immediate-action"]:checked');
    
    // Check if a radio button is selected
    if (selectedValue) {
      // Output the selected value (1 for arm, 0 for disarm) to the console
      console.log(selectedValue.value);
  
      // Submit the form with the id "preferences-form" to the server
      document.getElementById('preferences-form').submit();
    } else {
      // If no radio button is selected, display an alert
      alert("Please select an option before submitting.");
    }
  }