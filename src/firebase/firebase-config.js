// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Uu69MW41NUpQcwFYKxV3wyqWigkTbbo",
  authDomain: "third-firebase-project-e9823.firebaseapp.com",
  projectId: "third-firebase-project-e9823",
  storageBucket: "third-firebase-project-e9823.appspot.com",
  messagingSenderId: "5657409998",
  appId: "1:5657409998:web:b78c2beaac42d9cefdd39f",
  measurementId: "G-NKEZTS8GBB",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
