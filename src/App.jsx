import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
// Importamos la nueva página de detalle
import ProductDetailPage from './pages/ProductDetailPage'; 
import Header from './components/Header'; 
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* 👈 NUEVA RUTA DINÁMICA: :id captura el número del producto */}
          <Route path="/producto/:id" element={<ProductDetailPage />} /> 

          <Route path="*" element={<h1>404: Página no encontrada</h1>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;