import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './CartContext.jsx';
// 1. Importar AuthProvider
import { AuthProvider } from './AuthContext.jsx'; 
import './index.css';

// TU ID DE CLIENTE DE GOOGLE
const GOOGLE_CLIENT_ID = "248687506286-lamrgjn7pslrp9nrci9sdrvjcgma35fa.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CartProvider>
        {/* 2. Envolver la App con AuthProvider */}
        <AuthProvider> 
          <App />
        </AuthProvider>
      </CartProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);