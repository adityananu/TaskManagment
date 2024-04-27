import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhVV4YGShFBvxqkgCuYqyDFHBDiPe19wA",
  authDomain: "taskmanagment-e3815.firebaseapp.com",
  projectId: "taskmanagment-e3815",
  storageBucket: "taskmanagment-e3815.appspot.com",
  messagingSenderId: "103021681164",
  appId: "1:103021681164:web:34eb7fe8261968ead9ec29",
  measurementId: "G-LJRJPV7C2L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
