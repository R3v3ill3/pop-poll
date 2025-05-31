import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env vars
dotenv.config();

// Initialize Firebase Admin with service account
const app = initializeApp({
  credential: cert(path.join(__dirname, 'pop-poll-firebase-adminsdk-fbsvc-39386d162a.json'))
});

export const db = getFirestore(app);
export const auth = getAuth(app);