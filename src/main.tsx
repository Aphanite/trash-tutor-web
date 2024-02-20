import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/index.css' // needs to be first!!

import App from './App.tsx'

import { PageProvider } from './providers/PageProvider'
import { LocationProvider } from './providers/LocationProvider.tsx'
import { KeyProvider } from './providers/KeyProvider.tsx'
import { WasteCategoriesProvider } from './providers/WasteCategoriesProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageProvider>
      <LocationProvider>
        <KeyProvider>
          <WasteCategoriesProvider>
            <App />
          </WasteCategoriesProvider>
        </KeyProvider>
      </LocationProvider>
    </PageProvider>
  </React.StrictMode>,
)
