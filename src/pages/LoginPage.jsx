import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
// Importamos jwtDecode para leer los datos de Google
import { jwtDecode } from "jwt-decode"; 
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    // 1. Decodificar el token que nos da Google
    const decodedUser = jwtDecode(credentialResponse.credential);
    console.log("Usuario Logueado:", decodedUser);

    // 2. Guardar en nuestro contexto
    // decodedUser trae: name, email, picture, sub (id), etc.
    login(decodedUser);

    // 3. Redireccionar al Checkout (o al Home)
    navigate('/checkout');
  };

  const handleError = () => {
    console.log('Login Failed');
    alert("Hubo un error al iniciar sesión con Google");
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="login-container">
        <h2 style={{ marginBottom: '20px' }}>Bienvenido</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>Inicia sesión con Google para continuar con tu compra segura.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              theme="filled_blue"
              shape="pill"
            />
        </div>
        
        <p style={{ marginTop: '20px', fontSize: '0.8em', color: '#999' }}>
          Al continuar, aceptas los términos y condiciones de Mi Tienda PWA.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;