// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvIUXInJRKQIKZifpXtRqYBXKwpkz6wZU",
  authDomain: "orbital-2af75.firebaseapp.com",
  projectId: "orbital-2af75",
  storageBucket: "orbital-2af75.appspot.com",
  messagingSenderId: "558573239484",
  appId: "1:558573239484:web:da98c8bdb242c4f96d64b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {auth};