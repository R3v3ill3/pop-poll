import fs from 'fs/promises';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
  console.log('\n🔥 Firebase Configuration Setup\n');
  
  const config = {
    VITE_FIREBASE_API_KEY: await question('Firebase API Key: '),
    VITE_FIREBASE_AUTH_DOMAIN: await question('Firebase Auth Domain: '),
    VITE_FIREBASE_PROJECT_ID: await question('Firebase Project ID: '),
    VITE_FIREBASE_STORAGE_BUCKET: await question('Firebase Storage Bucket: '),
    VITE_FIREBASE_MESSAGING_SENDER_ID: await question('Firebase Messaging Sender ID: '),
    VITE_FIREBASE_APP_ID: await question('Firebase App ID: ')
  };

  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  try {
    await fs.writeFile(join(__dirname, '../frontend/.env'), envContent);
    console.log('\n✅ Firebase configuration has been saved to frontend/.env\n');
  } catch (error) {
    console.error('\n❌ Error saving configuration:', error);
  }

  rl.close();
}

setup();