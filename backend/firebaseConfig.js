// Configuración Firebase - Actualizada para Render
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where } = require('firebase/firestore');





console.log("🔥 INICIANDO FIREBASE CON PROYECTO:", process.env.FIREBASE_PROJECT_ID || "NO DETECTADO");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

if (!process.env.FIREBASE_API_KEY) {
  console.error("❌ ERROR CRÍTICO: Falta la variable FIREBASE_API_KEY en Render");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db, collection, addDoc, getDocs, query, where };
