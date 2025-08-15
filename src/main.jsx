// Entry point for the React application
// Renders the App component inside the root div

// Import StrictMode for highlighting potential problems
import { StrictMode } from 'react'
// Import createRoot for React 18+ rendering
import { createRoot } from 'react-dom/client'
// Import BrowserRouter for client-side routing
import { BrowserRouter } from 'react-router-dom'
// Import global styles
import './index.css'
// Import the main App component
import App from './App.jsx'

// Render the App component inside the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
