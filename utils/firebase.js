// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

/// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIB_APIKEY,
    authDomain: process.env.FIB_AUTH_DOMAIN,
    databaseURL: process.env.FIB_DATABASE_URL,
    projectId: process.env.FIB_PROJECT_ID,
    storageBucket: process.env.FIB_STORAGE_BUCKET,
    messagingSenderId: process.env.FIB_MESSAGING_SENDER_ID,
    appId: process.env.FIB_APP_ID,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig, 'firebaseProject');

const auth = getAuth(firebase);

export { auth };


