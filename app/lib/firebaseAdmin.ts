import * as admin from 'firebase-admin';

// Import the service account key directly
// Note: In a production environment, it's safer to use environment variables
// but for this specific setup, we are importing the file as requested.

if (!admin.apps.length) {
    const serviceAccountKey = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY;

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
