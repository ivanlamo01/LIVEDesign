import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton instances
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let analytics: Analytics | undefined;

function getClientApp(): FirebaseApp {
    if (typeof window === "undefined") {
        throw new Error("Firebase Client SDK should only be used in the browser.");
    }
    if (!app) {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    }
    return app;
}

export function getClientAuth(): Auth {
    if (!auth) {
        const app = getClientApp();
        auth = getAuth(app);
    }
    return auth;
}

export function getClientDb(): Firestore {
    if (!db) {
        const app = getClientApp();
        db = getFirestore(app);
    }
    return db;
}

export function getClientStorage(): FirebaseStorage {
    if (!storage) {
        const app = getClientApp();
        storage = getStorage(app);
    }
    return storage;
}

export async function getClientAnalytics(): Promise<Analytics | undefined> {
    if (typeof window === "undefined") return undefined;

    if (!analytics) {
        const app = getClientApp();
        const supported = await isSupported();
        if (supported) {
            analytics = getAnalytics(app);
        }
    }
    return analytics;
}

// Keep these for backward compatibility if needed, but prefer getters
// Note: These will be undefined on server, which is safer than exporting uninitialized variables
export { app, auth, db, storage, analytics };
