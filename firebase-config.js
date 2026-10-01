// Configuración de Firebase para Kanayas.
// Reemplaza estos valores por los de tu proyecto Firebase.
const KANAYAS_FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROYECTO.firebasestorage.app",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

let kanayasDb = null;
try {
  if (window.firebase && KANAYAS_FIREBASE_CONFIG.projectId !== "TU_PROJECT_ID") {
    firebase.initializeApp(KANAYAS_FIREBASE_CONFIG);
    kanayasDb = firebase.firestore();
  }
} catch (error) {
  console.error("Firebase no pudo inicializarse:", error);
}
