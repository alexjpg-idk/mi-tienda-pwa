// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// 1. IMPORTAMOS FIRESTORE (La base de datos)
import { getFirestore } from "firebase/firestore"; 

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

// 2. INICIALIZAMOS Y EXPORTAMOS LA BASE DE DATOS
// Esto es lo que usará tu HomePage.jsx para pedir los productos
export const db = getFirestore(app);