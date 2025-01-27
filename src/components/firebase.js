
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmJjkhpz3X4oesCfvWIDtqq4JEF938W6E",
  authDomain: "admission-enquiry-4c618.firebaseapp.com",
  projectId: "admission-enquiry-4c618",
  storageBucket: "admission-enquiry-4c618.firebasestorage.app",
  messagingSenderId: "827403809721",
  appId: "1:827403809721:web:83486ef8628839ecd67c68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export default app;
