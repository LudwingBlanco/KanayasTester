// Configuración de Firebase para Kanayas.
// Reemplaza estos valores por los de tu proyecto Firebase.
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBl_hlgSGiGLXX42jlOdNf_GOehGodK9XA",
    authDomain: "kanayas-ee136.firebaseapp.com",
    projectId: "kanayas-ee136",
    storageBucket: "kanayas-ee136.firebasestorage.app",
    messagingSenderId: "194434624688",
    appId: "1:194434624688:web:25a4a2fdea816056df1f75",
    measurementId: "G-F50XQ42NP9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
