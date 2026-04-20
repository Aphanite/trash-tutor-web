import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/index.css' // needs to be first!!

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
