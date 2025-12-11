// PWA Installation and Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}

// Install prompt handling
let deferredPrompt;
const installButton = document.getElementById('install-pwa-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('💾 PWA install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button if it exists
  if (installButton) {
    installButton.style.display = 'block';
  }
});

// Handle install button click
if (installButton) {
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
      console.log('❌ Install prompt not available');
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`👤 User response: ${outcome}`);
    
    deferredPrompt = null;
    installButton.style.display = 'none';
  });
}

// Track install status
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installed successfully');
  deferredPrompt = null;
});

// Online/Offline status
window.addEventListener('online', () => {
  console.log('🌐 Back online');
  updateOnlineStatus(true);
});

window.addEventListener('offline', () => {
  console.log('📴 Gone offline');
  updateOnlineStatus(false);
});

function updateOnlineStatus(isOnline) {
  const statusIndicator = document.getElementById('online-status');
  if (statusIndicator) {
    statusIndicator.textContent = isOnline ? '🌐 Online' : '📴 Offline';
    statusIndicator.className = isOnline ? 'online' : 'offline';
  }
}

// Check if running as PWA
function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

if (isPWA()) {
  console.log('🚀 Running as PWA');
  document.body.classList.add('pwa-mode');
}
