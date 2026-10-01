const KANAYAS_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "kanayas-ee136.firebaseapp.com",
  projectId: "kanayas-ee136",
  storageBucket: "kanayas-ee136.firebasestorage.app",
  messagingSenderId: "194434624688",
  appId: "1:194434624688:web:25a4a2fdea816056df1f75",
  measurementId: "G-F50XQ42NP9"
};

window.kanayasDb = null;

try {
  if (!window.firebase) {
    throw new Error("Firebase SDK no fue cargado");
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(KANAYAS_FIREBASE_CONFIG);
  }

  window.kanayasDb = firebase.firestore();
} catch (error) {
  console.error(error);
}
