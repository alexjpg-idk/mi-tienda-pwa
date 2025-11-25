import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estado del usuario 
  const [user, setUser] = useState(null);

  // Función para iniciar sesión 
  const login = (userData) => {
    setUser(userData);
    
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  // Función  cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  // Opcional: Efecto para recuperar sesión al recargar página
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};