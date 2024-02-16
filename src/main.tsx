import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { PageProvider } from './providers/PageProvider'
import { LocationProvider } from './providers/LocationProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </PageProvider>
  </React.StrictMode>,
)
