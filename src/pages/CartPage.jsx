import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

function CartPage() {
  // Obtenemos todos los datos y funciones del carrito
  const { carrito, calcularTotal, vaciarCarrito } = useCart();

  return (
    <div className="page-container">
      <h1>Tu Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p className="text-center">El carrito está vacío. ¡Empieza a comprar!</p>
      ) : (
        <div>
          {/* Listado de Productos en el Carrito */}
          {carrito.map((item, index) => (
            <div key={index} className="cart-item">
              <span className="cart-item-name">{item.nombre}</span>
              <span className="cart-item-price">MX${item.precio}</span>
            </div>
          ))}

          {/* Resumen del Total */}
          <div className="cart-total-summary">
            <h3>Total: MX${calcularTotal()}</h3>
          </div>

          {/* Botones de Acción */}
          <div className="flex-actions" style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
            <button onClick={vaciarCarrito} className="resumen-button">
              Vaciar Carrito
            </button>
            <Link to="/checkout" className="checkout-link">
              Proceder al Pago ({carrito.length} artículos)
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;