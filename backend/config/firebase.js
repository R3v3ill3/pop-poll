import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './pop-poll-firebase-adminsdk-fbsvc-39386d162a.json' assert { type: "json" };

const app = initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore(app);
export const auth = getAuth(app);