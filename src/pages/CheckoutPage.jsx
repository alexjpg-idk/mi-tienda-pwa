import React from 'react';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext'; // Importamos el contexto de Auth
import { Link, useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { calcularTotal, vaciarCarrito, carrito } = useCart();
  const { user } = useAuth(); // Obtenemos el usuario actual (si existe)
  const navigate = useNavigate();

  const handlePagar = () => {
    alert(`¡Gracias por tu compra, ${user.name}! \nSe ha enviado el recibo a ${user.email}.`);
    vaciarCarrito();
    navigate('/');
  };

  // 1. BLOQUEO DE SEGURIDAD:
  // Si "user" es null (no ha iniciado sesión), mostramos la pantalla de acceso restringido.
  if (!user) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#E83332' }}>Acceso Restringido</h2>
        <p style={{ fontSize: '1.2em', margin: '20px 0' }}>
            Debes iniciar sesión con Google para procesar tu compra.
        </p>
        <button onClick={() => navigate('/login')} style={{ padding: '15px 30px', fontSize: '1.1em' }}>
            Ir a Iniciar Sesión
        </button>
      </div>
    );
  }

  // 2. VALIDACIÓN DE CARRITO:
  // Si el carrito está vacío, no tiene sentido estar aquí.
  if (carrito.length === 0) {
     return (
        <div className="page-container">
             <h1>Finalizar Compra</h1>
             <p>No hay artículos para pagar. Vuelve a la <Link to="/">Tienda</Link>.</p>
        </div>
     )
  }

  // 3. PANTALLA DE PAGO (Solo visible si está logueado):
  return (
    <div className="page-container">
      <h1>Finalizar Compra</h1>
      
      {/* Tarjeta de Usuario Logueado */}
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Foto de perfil de Google */}
        <img src={user.picture} alt={user.name} style={{ borderRadius: '50%', width: '50px' }} />
        <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Comprando como: {user.name}</p>
            <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>{user.email}</p>
        </div>
      </div>

      <p>Total a pagar: <strong style={{color: '#E83332', fontSize: '1.5em'}}>MX${calcularTotal()}</strong></p>
      
      <div className="checkout-form">
          <h2>Dirección de Envío</h2>
          <form onSubmit={(e) => { e.preventDefault(); handlePagar(); }} style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>
              <input type="text" placeholder="Calle y Número" required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input type="text" placeholder="Ciudad" required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input type="text" placeholder="Código Postal" required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              
              <button type="submit" style={{ marginTop: '20px', fontSize: '1.1em' }}>
                Confirmar Pago (MX${calcularTotal()})
              </button>
          </form>
      </div>
    </div>
  );
}

export default CheckoutPage;