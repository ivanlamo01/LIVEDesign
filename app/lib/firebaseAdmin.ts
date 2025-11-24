import * as admin from 'firebase-admin';

// Import the service account key directly
// Note: In a production environment, it's safer to use environment variables
// but for this specific setup, we are importing the file as requested.
import serviceAccount from '../../ServiceAccountKey.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
