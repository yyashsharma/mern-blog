// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-ce2fa.firebaseapp.com",
    projectId: "mern-blog-ce2fa",
    storageBucket: "mern-blog-ce2fa.appspot.com",
    messagingSenderId: "479211236234",
    appId: "1:479211236234:web:f31f7c446d396d6573f673"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);