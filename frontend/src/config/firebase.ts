import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2Mn4cn2KPCLee6l_fRBEpXZFZzIGh4PA",
  authDomain: "pop-poll.firebaseapp.com",
  projectId: "pop-poll",
  storageBucket: "pop-poll.firebasestorage.app",
  messagingSenderId: "1011593417699",
  appId: "1:1011593417699:web:a3f540e9c3d8d3952e06d6",
  measurementId: "G-7Y3ZB36TTH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);