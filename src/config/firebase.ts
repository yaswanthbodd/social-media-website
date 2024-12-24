// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU73e-DABUEczcGK0BRUktYLuuIFCM1vY",
  authDomain: "social-media-react-8ad64.firebaseapp.com",
  projectId: "social-media-react-8ad64",
  storageBucket: "social-media-react-8ad64.firebasestorage.app",
  messagingSenderId: "413837802202",
  appId: "1:413837802202:web:99e354994cdd8f8a1043e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app)