import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext'; // Importamos Auth para saber si está logueado

function Header() {
  const { carrito } = useCart();
  const { user, logout } = useAuth(); // Obtenemos usuario y función logout

  return (
    <header className="header-aliexpress">
      <div className="logo">
        <Link to="/">Mi Tienda PWA</Link>
      </div>
      
      <nav className="main-nav">
        <Link to="/">Tienda</Link>
        <Link to="/carrito">
          🛒 ({carrito.length})
        </Link>

        {/* LÓGICA CONDICIONAL: */}
        {/* Si 'user' existe (está logueado), mostramos su perfil. */}
        {/* Si 'user' es null (no logueado), mostramos el botón de login. */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '15px' }}>
            <img 
                src={user.picture} 
                alt="Perfil" 
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ccc' }} 
            />
            <span style={{ fontSize: '0.9em', fontWeight: 'bold', color: '#333' }}>
                {user.given_name}
            </span>
            <button 
                onClick={logout} 
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#E83332', 
                    cursor: 'pointer', 
                    fontSize: '0.85em', 
                    textDecoration: 'underline', 
                    padding: '0 5px', 
                    width: 'auto' 
                }}
            >
                Salir
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
