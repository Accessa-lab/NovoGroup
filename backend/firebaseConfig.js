const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where } = require('firebase/firestore');

// CONFIGURACIÓN DE FIREBASE
// ⚠️ REEMPLAZA LOS VALORES CON LOS DATOS REALES DE TU CONSOLA DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSy...TU_API_KEY_REAL...", 
  authDomain: "sincronizacion-plataforma-novo.firebaseapp.com",
  projectId: "sincronizacion-plataforma-novo",
  storageBucket: "sincronizacion-plataforma-novo.appspot.com",
  messagingSenderId: "TU_SENDER_ID", 
  appId: "1:M2M3MDM0MWQtNWU3OC00OTFkLTljYWMtMWVlMmY5MWJiZWYz:web:TU_APP_ID_REAL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db, collection, addDoc, getDocs, query, where };
