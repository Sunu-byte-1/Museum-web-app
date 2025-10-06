
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize theme early based on saved preference or system setting
try {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  const root = document.documentElement;
  if (useDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
} catch (_) {
  // ignore access errors (e.g., SSR or privacy mode)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)