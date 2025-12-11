if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        setInterval(function() {
          registration.update();
        }, 60000);
      })
      .catch(function(error) {
        console.error('Service Worker failed:', error);
      });
  });
}

var installPrompt = null;
var installBtn = document.getElementById('install-pwa-btn');

window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  installPrompt = e;
  
  if (installBtn) {
    installBtn.style.display = 'block';
  }
});

if (installBtn) {
  installBtn.addEventListener('click', function() {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    installPrompt.userChoice.then(function(choice) {
      installPrompt = null;
      installBtn.style.display = 'none';
    });
  });
}

window.addEventListener('appinstalled', function() {
  installPrompt = null;
});

function updateStatus(online) {
  var indicator = document.getElementById('online-status');
  if (indicator) {
    indicator.textContent = online ? 'Online' : 'Offline';
    indicator.className = online ? 'online' : 'offline';
  }
}

window.addEventListener('online', function() {
  updateStatus(true);
});

window.addEventListener('offline', function() {
  updateStatus(false);
});

function checkPWA() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
}

if (checkPWA()) {
  document.body.classList.add('pwa-mode');
}
