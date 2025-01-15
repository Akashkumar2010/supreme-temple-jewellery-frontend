import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { CurrencyProvider } from './context/CurrencyContext'; // Import CurrencyProvider
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Ensure there is a div with id 'root' in your public/index.html."
  );
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* CurrencyProvider wraps the app to manage currency context */}
    <CurrencyProvider>
      {/* AuthProvider wraps the app to manage authentication */}
      <AuthProvider>
        <CssBaseline /> {/* Provides a consistent baseline for styles */}
        <App />
      </AuthProvider>
    </CurrencyProvider>
  </React.StrictMode>
);
