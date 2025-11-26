import * as admin from 'firebase-admin';

// Import the service account key directly
// Note: In a production environment, it's safer to use environment variables
// but for this specific setup, we are importing the file as requested.

if (!admin.apps.length) {
    let serviceAccountKey = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
        // Fallback: Try to read from ServiceAccountKey.json in root for local development
        try {
            // Dynamic import to avoid build issues in environments without fs
            const fs = require('fs');
            const path = require('path');
            const keyPath = path.join(process.cwd(), 'ServiceAccountKey.json');
            if (fs.existsSync(keyPath)) {
                console.log('[Firebase Admin] Loading service account from local file');
                serviceAccountKey = fs.readFileSync(keyPath, 'utf8');
            }
        } catch (e) {
            console.warn('[Firebase Admin] Could not read local ServiceAccountKey.json');
        }
    }

    if (!serviceAccountKey) {
        throw new Error('NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
    }

    // Parse the service account key JSON
    const serviceAccount = JSON.parse(serviceAccountKey);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
