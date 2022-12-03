// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHfBkKqiH87vI8rFW6j9h4vxAc9MEihzU",
    authDomain: "captionator-5000.firebaseapp.com",
    projectId: "captionator-5000",
    storageBucket: "captionator-5000.appspot.com",
    messagingSenderId: "400769960521",
    appId: "1:400769960521:web:a98edbc2a63db5041ccd98"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Get handles for database and auth
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export {db, auth, storage};