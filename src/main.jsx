import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './registerServiceWorker'; // Load PWA service worker

// ⚡ Anti-FOIT: apply saved theme before first paint to prevent flash
const savedTheme = (() => {
  try { return JSON.parse(localStorage.getItem('studentos_theme')) || 'dark'; }
  catch { return 'dark'; }
})();
document.documentElement.setAttribute('data-theme', savedTheme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
