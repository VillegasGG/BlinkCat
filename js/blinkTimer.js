const btnBlink = document.getElementById('btnBlink');
const panel = document.getElementById('ActiveTimers');
const dBlink = document.getElementById('dBlink');

btnBlink.addEventListener('click', () => {
  panel.innerHTML += `
  <div id='blinkDiv'>
  <p>👁️ Timer de parpadeo activo 
  <button id='dBlink'> Eliminar </button>
  </p>
  </div>`;
  requestNotificationPermission();
  startBlinkTimer();
});

function requestNotificationPermission() {
    console.log('Requesting permission...');
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('¡Permiso concedido! 🎉');
        } else if (permission === 'denied') {
            alert('¡Permiso denegado! 😢 \n Por favor, habilita las notificaciones 🙏');
      }
    });
    } else if (Notification.permission === 'denied') {
        alert('¡Permiso denegado! 😢 \n Por favor, habilita las notificaciones 🙏');
    } else if (Notification.permission === 'granted') {
        alert('¡Permiso ya concedido! 🎉');
    }
}

let blinkTimerInterval;

function startBlinkTimer() {
  blinkTimerInterval = setInterval(() => {
    if (Notification.permission === 'granted') {
      new Notification('¡Parpadea! 🐱👁️'), {
        body: '¡Cuida tus ojos! 👀',
        icon: 'assets/eye.png'
      };
    }
    }, 6000);
}

panel.addEventListener('click', (event) => {
  if (event.target && event.target.id === 'dBlink') {
    const blinkDiv = document.getElementById('blinkDiv');
    if (blinkDiv) {
      blinkDiv.remove();
    }
    clearInterval(blinkTimerInterval);
    blinkTimerInterval = null;
  }
});