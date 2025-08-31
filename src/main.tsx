import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Service Worker management for API bypass
if ('serviceWorker' in navigator) {
  // Unregister any existing service workers that might interfere
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      console.log('Unregistering existing service worker:', registration.scope);
      registration.unregister();
    }
  });

  // Register our bypass service worker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw-bypass.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
