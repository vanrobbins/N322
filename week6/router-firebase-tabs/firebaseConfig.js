// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDaO6acc_gBAXXNor0aIC6GswyDOPHuPc4",
	authDomain: "n322-mobile-class.firebaseapp.com",
	projectId: "n322-mobile-class",
	storageBucket: "n322-mobile-class.firebasestorage.app",
	messagingSenderId: "1880256453",
	appId: "1:1880256453:web:72b57a835031ac704aa5ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
