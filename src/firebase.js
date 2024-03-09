import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCsvHOT2kBBimiW8oAdCIMh5Z5ArJPihQ8",
  authDomain: "pet-home-1c0a2.firebaseapp.com",
  databaseURL: "https://pet-home-1c0a2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pet-home-1c0a2",
  storageBucket: "pet-home-1c0a2.appspot.com",
  messagingSenderId: "673768431341",
  appId: "1:673768431341:web:3a171124cb204300e3f6e4",
  measurementId: "G-71ND2D38B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);