
// Function definitions for arming and disarming the system
function armSystem() {
    console.log('System armed.');
    // Actual code for arming the system (communication with Arduino)
  }
  
  function disarmSystem() {
    console.log('System disarmed.');
    // Actual code for disarming the system (communication with Arduino)
  }
  
  // Event listener for form submission on Homepage
  document.addEventListener('DOMContentLoaded', function() {
    const immediateActionForm = document.querySelector('form[action="/submit-preferences"]');
    if (immediateActionForm) {
      immediateActionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const action = document.querySelector('input[name="immediate-action"]:checked').value;
        if (action === 'arm') {
          armSystem();
        } else if (action === 'disarm') {
          disarmSystem();
        }
  
        // After action, save the status to local storage (this needs to be changed to a server)
        localStorage.setItem('systemStatus', action);
      });
    }
  
    // 
  });
  