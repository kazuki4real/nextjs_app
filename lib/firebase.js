import fb from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU2nkn57F0l9yPJRPZF_hrGVWX9rodNac",
  authDomain: "nextjs-firestore-626eb.firebaseapp.com",
  projectId: "nextjs-firestore-626eb",
  storageBucket: "nextjs-firestore-626eb.appspot.com",
  messagingSenderId: "475076771341",
  appId: "1:475076771341:web:f365c100ef6ffc39685f44",
};
// Initialize Firebase
export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app();

export const db = firebase.firestore();
