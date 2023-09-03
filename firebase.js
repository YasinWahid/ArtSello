import { initializeApp } from 'firebase/app';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvU4d5aNgKzfggk6LGT_ujodiLcal9OQI",
    authDomain: "artsello-a947e.firebaseapp.com",
    projectId: "artsello-a947e",
    storageBucket: "artsello-a947e.appspot.com",
    messagingSenderId: "787126933925",
    appId: "1:787126933925:web:fc3d4881fa10d48849f04c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
