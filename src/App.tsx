import React, { useEffect, useState } from 'react';
import { auth } from './config/firebase';

function App() {
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Checking Firebase connection...');

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        await auth.signInAnonymously();
        setFirebaseStatus('Firebase connection successful! 🎉');
      } catch (error) {
        setFirebaseStatus(`Firebase connection failed: ${error.message}`);
      }
    };

    checkFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Firebase Connection Test</h1>
        <p className={`text-lg ${
          firebaseStatus.includes('successful') ? 'text-green-600' : 'text-gray-600'
        }`}>
          {firebaseStatus}
        </p>
      </div>
    </div>
  );
}

export default App;