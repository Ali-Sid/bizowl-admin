// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { partnerFirebaseConfig, primaryFirebaseConfig } from "./firebaseConfig";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//From client received
// const firebaseConfig = {
//   apiKey: "AIzaSyBALfQrHAoJfVGqVFQ1XAu1HbIxTYnxC-g",
//   authDomain: "bizowl-auth.firebaseapp.com",
//   projectId: "bizowl-auth",
//   storageBucket: "bizowl-auth.appspot.com",
//   messagingSenderId: "457562061897",
//   appId: "1:457562061897:web:acda0e299c894fa8339398",
//   measurementId: "G-TEMF1XQDC4"
// };


// Initialize primary Firebase
const primaryApp = initializeApp(primaryFirebaseConfig, "primary");
// const analytics = getAnalytics(app);
const primaryAuth = getAuth(primaryApp);
const primaryDB = getFirestore(primaryApp);


// Initialize secondary Firebase
const partnerApp = initializeApp(partnerFirebaseConfig, "partner");
// const analytics = getAnalytics(app);
const partnerAuth = getAuth(partnerApp);
const partnerDB = getFirestore(partnerApp);



export { primaryAuth, partnerAuth, primaryDB, partnerDB }