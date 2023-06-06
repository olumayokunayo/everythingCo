import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArElF4Y7XpDDU_mo1i-92ZkKgasrnNiLA",
  authDomain: "everythingco-f51a5.firebaseapp.com",
  projectId: "everythingco-f51a5",
  storageBucket: "everythingco-f51a5.appspot.com",
  messagingSenderId: "356639798358",
  appId: "1:356639798358:web:1ecfa92a54a36b6becb7f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
