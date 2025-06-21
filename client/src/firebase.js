// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTnbBc0NOwGfgPuW3_mTZGDEeJ7v0U_SI",
    authDomain: "sahyog-cd801.firebaseapp.com",
    projectId: "sahyog-cd801",
    storageBucket: "sahyog-cd801.firebasestorage.app",
    messagingSenderId: "137245959399",
    appId: "1:137245959399:web:0caa7959c386026022ee42",
    measurementId: "G-5VW3GTZQ49"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
