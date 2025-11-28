"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { getClientAuth } from "../lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    isAdmin: boolean;
    updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
    updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const auth = getClientAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const token = await user.getIdTokenResult(true);
                setIsAdmin(!!token.claims.admin);
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const auth = getClientAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Obtener el token y crear la sesión cookie
        const idToken = await userCredential.user.getIdToken();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.details || data.error || 'Error al iniciar sesión en el servidor');
        }

        router.refresh();
    };

    const signUp = async (email: string, password: string) => {
        const auth = getClientAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Obtener el token y crear la sesión cookie
        const idToken = await userCredential.user.getIdToken();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.details || data.error || 'Error al crear sesión en el servidor');
        }

        router.refresh();
    };

    const logOut = async () => {
        try {
            // Revocar la sesión cookie primero
            await fetch('/api/auth/logout', {
                method: 'POST',
            });

            // Luego cerrar sesión en Firebase
            const auth = getClientAuth();
            await signOut(auth);

            router.refresh();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getClientAuth();
        const userCredential = await signInWithPopup(auth, provider);

        // Obtener el token y crear la sesión cookie
        const idToken = await userCredential.user.getIdToken();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.details || data.error || 'Error al iniciar sesión con Google en el servidor');
        }

        router.refresh();
    };

    const updateUserProfile = async (displayName: string, photoURL?: string) => {
        if (!user) throw new Error("No user logged in");
        await updateProfile(user, {
            displayName,
            ...(photoURL && { photoURL }),
        });
    };

    const updateUserPassword = async (currentPassword: string, newPassword: string) => {
        if (!user || !user.email) throw new Error("No user logged in");
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, logOut, signInWithGoogle, isAdmin, updateUserProfile, updateUserPassword }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
