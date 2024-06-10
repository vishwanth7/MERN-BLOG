// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-fcde8.firebaseapp.com",
  projectId: "mern-blog-fcde8",
  storageBucket: "mern-blog-fcde8.appspot.com",
  messagingSenderId: "699658960752",
  appId: "1:699658960752:web:15c95ca3eccc2ba876d9b5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

