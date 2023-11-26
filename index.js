// index.js

// Function definitions for arming and disarming the system
function armSystem() {
    console.log('System armed.');
    updateSystemStatus('Armed');
    // Add actual code to arm the system here
  }
  
  function disarmSystem() {
    console.log('System disarmed.');
    updateSystemStatus('Disarmed');
    // Add actual code to disarm the system here
  }
  
  // Update the system status on the homepage
  function updateSystemStatus(status) {
    const statusElement = document.getElementById('system-status');
    if (statusElement) {
      statusElement.textContent = status;
    }
    localStorage.setItem('systemStatus', status);
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
    // Update the system status text on load if element exists
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
  
    // Set an interval to check the system status every minute
    setInterval(checkSystemStatus, 60000);
  
    // Also check the system status immediately when the page loads
    checkSystemStatus();
  });
  