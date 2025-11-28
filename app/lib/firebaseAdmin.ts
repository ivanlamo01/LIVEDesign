import * as admin from 'firebase-admin';
import { getApps, getApp, App, cert } from 'firebase-admin/app';
import { getAuth as getAdminAuthInstance, Auth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestoreInstance, Firestore } from 'firebase-admin/firestore';

// Define Service Account interface
interface ServiceAccount {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
}

function getServiceAccount(): ServiceAccount | undefined {
    try {
        console.log('[Firebase Admin] Checking for SERVICE_ACCOUNT_KEY...');
        if (process.env.SERVICE_ACCOUNT_KEY) {
            console.log('[Firebase Admin] SERVICE_ACCOUNT_KEY found, parsing...');
            const parsed = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
            console.log('[Firebase Admin] SERVICE_ACCOUNT_KEY parsed successfully');
            return parsed;
        }
        console.log('[Firebase Admin] SERVICE_ACCOUNT_KEY not found');
        return undefined;
    } catch (error) {
        console.error('[Firebase Admin] Failed to parse SERVICE_ACCOUNT_KEY:', error);
        return undefined;
    }
}

let app: App | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

function initializeAdmin(): App {
    console.log('[Firebase Admin] initializeAdmin() called');

    // 1. Check if we already have a cached instance in this module
    if (app) {
        console.log('[Firebase Admin] App already initialized (cached), returning existing app');
        return app;
    }

    // 2. Check if Firebase has any apps initialized globally
    const existingApps = getApps();
    if (existingApps.length > 0) {
        console.log('[Firebase Admin] Found existing app(s), reusing the default one');
        app = existingApps[0]; // Use the first available app (usually [DEFAULT])
        return app;
    }

    console.log('[Firebase Admin] No existing app found, initializing new app...');

    const serviceAccount = getServiceAccount();
    const options: admin.AppOptions = {};

    if (serviceAccount) {
        console.log('[Firebase Admin] Using SERVICE_ACCOUNT_KEY from env');
        options.credential = cert(serviceAccount);
    } else {
        console.log('[Firebase Admin] Using Application Default Credentials');
        // Note: In some environments (like Cloud Functions), applicationDefault() might fail 
        // if not properly configured, but we'll try it as a fallback.
        try {
            options.credential = admin.credential.applicationDefault();
            console.log('[Firebase Admin] Application Default Credentials loaded');
        } catch (error) {
            console.error('[Firebase Admin] Failed to load Application Default Credentials:', error);
            // Don't throw here yet, let initializeApp try its own resolution or fail
        }
    }

    try {
        console.log('[Firebase Admin] Calling admin.initializeApp...');
        app = admin.initializeApp(options);
        console.log('[Firebase Admin] Successfully initialized Firebase Admin');
        return app;
    } catch (error: any) {
        // Handle race condition where app might have been initialized by another request 
        // while we were setting up options
        if (error.code === 'app/duplicate-app') {
            console.log('[Firebase Admin] App was initialized concurrently (duplicate-app), retrieving it...');
            app = getApp();
            return app;
        }

        console.error('[Firebase Admin] Initialization failed:', error);
        throw error;
    }
}

export function getAdminAuth(): Auth {
    console.log('[Firebase Admin] getAdminAuth() called');
    try {
        if (!auth) {
            console.log('[Firebase Admin] Auth not cached, initializing...');
            const app = initializeAdmin();
            auth = getAdminAuthInstance(app);
            console.log('[Firebase Admin] Auth instance created successfully');
        }
        return auth;
    } catch (error) {
        console.error('[Firebase Admin] getAdminAuth() failed:', error);
        throw error;
    }
}

export function getAdminDb(): Firestore {
    console.log('[Firebase Admin] getAdminDb() called');
    try {
        if (!db) {
            console.log('[Firebase Admin] DB not cached, initializing...');
            const app = initializeAdmin();
            db = getAdminFirestoreInstance(app);
            console.log('[Firebase Admin] Firestore instance created successfully');
        }
        return db;
    } catch (error) {
        console.error('[Firebase Admin] getAdminDb() failed:', error);
        throw error;
    }
}