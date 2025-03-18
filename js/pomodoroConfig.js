// break html 
const breakForm = document.getElementById('breakForm');

// index html
const panel = document.getElementById('ActiveTimers');

// When submit button is clicked, the break timer is created
breakForm.addEventListener('submit', (event) => {
    // Close break window and add break timer to index panel
    event.preventDefault();
    const workTime = document.getElementById('workTime').value;
    const breakTime = document.getElementById('breakTime').value;
    
    if(window.electron && typeof window.electron.send === 'function') {
        window.electron.send('close-break-window', 'close');
        window.electron.send('send-times', {workTime, breakTime});
    } else {
        console.log('Electron not available');
    }

});