import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client for createRoot
import './index.css';
import App from './App';

// Get the root element
const rootElement = document.getElementById('root');

// Ensure rootElement is not null (necessary for TypeScript safety)
if (rootElement) {
  // Create the root using createRoot
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the App component
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
