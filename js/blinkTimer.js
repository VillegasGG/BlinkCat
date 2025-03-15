const btnBlink = document.getElementById('btnBlink');
const content = document.getElementById('content');

btnBlink.addEventListener('click', () => {
  content.innerHTML = `<p>¡Parpadea cada minuto para cuidar tus ojos! 🐱👁️</p>`;
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


function startBlinkTimer() {
  setInterval(() => {
    if (Notification.permission === 'granted') {
      new Notification('¡Parpadea! 🐱👁️'), {
        body: '¡Cuida tus ojos! 👀',
        icon: 'assets/eye.png'
      };
    }
    }, 60000);
}