import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PortfolioHero from './Portfolio'
import Education from './Education'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PortfolioHero />
    <Education />
  </React.StrictMode>,
)
