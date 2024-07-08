// firebaseConfig.js

export const primaryFirebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const partnerFirebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY2,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN2,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID2,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET2,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID2,
    appId: process.env.REACT_APP_FIREBASE_APP_ID2,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID2,
};
