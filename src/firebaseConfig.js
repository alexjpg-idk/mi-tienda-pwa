// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// 1. IMPORTAMOS LAS FUNCIONES DE PERSISTENCIA
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2q1_XAXjaOVYhde6an8br2t59hQuvNIw",
  authDomain: "mi-tienda-pwa.firebaseapp.com",
  projectId: "mi-tienda-pwa",
  storageBucket: "mi-tienda-pwa.firebasestorage.app",
  messagingSenderId: "61191807634",
  appId: "1:61191807634:web:b7e0daaee9e3e9c3707c4b",
  measurementId: "G-MLJK8FZPTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// 2. ACTIVAR LA PERSISTENCIA OFFLINE
// Esto permite que la base de datos funcione sin internet
enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Falló porque probablemente tienes muchas pestañas abiertas a la vez
          console.log("Persistencia falló: Múltiples pestañas abiertas");
      } else if (err.code == 'unimplemented') {
          // El navegador no soporta esta función (raro hoy en día)
          console.log("El navegador no soporta persistencia offline");
      }
  });