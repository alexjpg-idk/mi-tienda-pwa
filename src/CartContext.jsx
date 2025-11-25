import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear un Custom Hook para usar el contexto fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Crear el Componente Proveedor (Provider)
export const CartProvider = ({ children }) => {
  // === LÓGICA DEL CARRITO (MOVIDA DE App.jsx) ===
  
  // 3a. Inicializar el estado leyendo LocalStorage
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('tienda-carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 3b. Efecto para guardar el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem('tienda-carrito', JSON.stringify(carrito));
  }, [carrito]);

  // 3c. Funciones de acción
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
  };
  
  // 4. Crear el objeto de valor que se compartirá
  const contextValue = {
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    calcularTotal,
  };

  // 5. Retornar el Proveedor que envuelve a los hijos (App)
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};