// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC47G-DygklL_THaHo1d8uI35XjlJsGOfY",
  authDomain: "finance-trackerapp.firebaseapp.com",
  projectId: "finance-trackerapp",
  storageBucket: "finance-trackerapp.appspot.com",
  messagingSenderId: "674719402814",
  appId: "1:674719402814:web:b3c013bbd166a1b054fa6f",
  measurementId: "G-ZMV72DXPTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };