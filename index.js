// index.js

// Function definitions for arming and disarming the system
function submitForm() {
  // Get the selected radio button with the name "immediate-action"
  var selectedValue = document.querySelector('input[name="immediate-action"]:checked');
  
  // Check if a radio button is selected
  if (selectedValue) {
    // Output the selected value (1 for arm, 0 for disarm) to the console
    console.log(selectedValue.value);
    if(selectedValue.value){
      updateSystemStatus('Armed');
    }
    else{
      updateSystemStatus('Disarmed');
    }

    // Submit the form with the id "preferences-form" to the server
    document.getElementById('preferences-form').submit();
  } else {
    // If no radio button is selected, display an alert
    alert("Please select an option before submitting.");
  }
}

  
  // Update the system status on the homepage
  function updateSystemStatus(status) {
    const statusElement = document.getElementById('system-status');
    if (statusElement) {
      statusElement.textContent = status;
    }
    localStorage.setItem('systemStatus', status);
  }
  
  // Update the display of activation times and current time
  function updateTimesDisplay() {
    const currentTimeElement = document.getElementById('current-time');
    const activationStartDisplayElement = document.getElementById('activation-start-display');
    const activationEndDisplayElement = document.getElementById('activation-end-display');
  
    if (currentTimeElement) {
      const now = new Date();
      currentTimeElement.textContent = now.toLocaleTimeString(); // Display current time
    }
  
    if (activationStartDisplayElement && activationEndDisplayElement) {
      const activationStart = localStorage.getItem('activationStart') || 'Not Set';
      const activationEnd = localStorage.getItem('activationEnd') || 'Not Set';
      activationStartDisplayElement.textContent = activationStart;
      activationEndDisplayElement.textContent = activationEnd;
    }
  }
  
  // Function to check system status based on the activation times
  function checkSystemStatus() {
    const activationStart = localStorage.getItem('activationStart');
    const activationEnd = localStorage.getItem('activationEnd');
  
    if (!activationStart || !activationEnd) {
      // If times are not set, or settings have not been saved yet, default to disarmed
      updateSystemStatus('Disarmed');
      return;
    }
  
    // Get the user's local timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    // Create date objects using the local timezone
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
    const start = new Date();
    const [startHours, startMinutes] = activationStart.split(':');
    start.setHours(startHours, startMinutes, 0, 0);
  
    const end = new Date();
    const [endHours, endMinutes] = activationEnd.split(':');
    end.setHours(endHours, endMinutes, 0, 0);
  
    // Arm or disarm the system based on the current time
    if (now >= start && now < end) {
      armSystem();
    } else {
      disarmSystem();
    }
  }
  
  // Event listener for form submission on Homepage
  document.addEventListener('DOMContentLoaded', function() {
    // Update the times and system status text on load
    updateTimesDisplay();
    const systemStatus = localStorage.getItem('systemStatus');
    updateSystemStatus(systemStatus || 'Disarmed');
  
    // Listener for the immediate actions form
    const immediateActionForm = document.getElementById('immediate-action-form');
    if (immediateActionForm) {
      immediateActionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const action = document.querySelector('input[name="immediate-action"]:checked').value;
        if (action === 'arm') {
          armSystem();
        } else if (action === 'disarm') {
          disarmSystem();
        }
      });
    }
  
    // Set an interval to update the current time every second
    setInterval(updateTimesDisplay, 1000);
  
    // Set an interval to check the system status every minute
    setInterval(checkSystemStatus, 60000);
  
    // Also check the system status immediately when the page loads
    checkSystemStatus();
  });
  