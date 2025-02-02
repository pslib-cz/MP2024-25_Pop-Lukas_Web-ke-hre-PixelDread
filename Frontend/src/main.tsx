import React from 'react'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './AppContext.tsx'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);