import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import { GoogleAuthProvider } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyAbepwmY1CcyJKGIg4Qo7utTkI1WdcNezc",
  authDomain: "ecommerce-roddan.firebaseapp.com",
  projectId: "ecommerce-roddan",
  storageBucket: "ecommerce-roddan.appspot.com",
  messagingSenderId: "1067096339828",
  appId: "1:1067096339828:web:cb0c0b8d43ae450f32e821",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//export const provider = new GoogleAuthProvider();

export const database = getFirestore(app);
