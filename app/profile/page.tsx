"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { User, Save, Lock, Upload, Camera, X } from "lucide-react";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfilePage() {
    const { user, loading, updateUserProfile, updateUserPassword } = useAuth();
    const router = useRouter();

    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [uploading, setUploading] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        if (user) {
            setDisplayName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user, loading, router]);

    // Check if user has password provider (not Google-only)
    const hasPasswordProvider = user?.providerData.some(
        (provider) => provider.providerId === "password"
    );

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !user) return;

        const file = e.target.files[0];
        setUploading(true);
        setProfileError("");

        try {
            const storageRef = ref(storage, `profile_photos/${user.uid}_${Date.now()}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setPhotoURL(downloadURL);
        } catch (error) {
            console.error("Error uploading photo:", error);
            setProfileError("Error al subir la foto");
        } finally {
            setUploading(false);
        }
    };

    const handleProfileSave = async () => {
        setSavingProfile(true);
        setProfileError("");
        setProfileSuccess("");

        try {
            await updateUserProfile(displayName, photoURL);
            setProfileSuccess("Perfil actualizado correctamente");
            setTimeout(() => setProfileSuccess(""), 3000);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setProfileError(error.message || "Error al actualizar perfil");
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordChange = async () => {
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setSavingPassword(true);

        try {
            await updateUserPassword(currentPassword, newPassword);
            setPasswordSuccess("Contraseña actualizada correctamente");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(""), 3000);
        } catch (error: any) {
            console.error("Error changing password:", error);
            if (error.code === "auth/wrong-password") {
                setPasswordError("Contraseña actual incorrecta");
            } else {
                setPasswordError(error.message || "Error al cambiar contraseña");
            }
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Mi Perfil</h1>
                    <p className="text-slate-400">Administra tu información personal y configuración</p>
                </div>

                {/* Profile Photo & Info */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 mb-6">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Información Personal
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Photo */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-slate-700">
                                    {photoURL ? (
                                        <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-16 h-16 text-slate-600" />
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-500 p-2 rounded-full cursor-pointer transition-colors">
                                    {uploading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    ) : (
                                        <Camera className="w-5 h-5 text-white" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-slate-500 text-center">Click para cambiar foto</p>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user.email || ""}
                                    disabled
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-slate-500 mt-1">El email no se puede modificar</p>
                            </div>

                            {profileError && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 py-3 text-red-400 text-sm">
                                    {profileError}
                                </div>
                            )}

                            {profileSuccess && (
                                <div className="bg-green-500/10 border border-green-500/50 rounded-lg px-4 py-3 text-green-400 text-sm">
                                    {profileSuccess}
                                </div>
                            )}

                            <button
                                onClick={handleProfileSave}
                                disabled={savingProfile || uploading}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {savingProfile ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Guardar Cambios
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Change Password - Only for Email/Password users */}
                {hasPasswordProvider ? (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Lock className="w-6 h-6" />
                            Cambiar Contraseña
                        </h2>

                        <div className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Contraseña Actual
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Confirmar Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            {passwordError && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 py-3 text-red-400 text-sm">
                                    {passwordError}
                                </div>
                            )}

                            {passwordSuccess && (
                                <div className="bg-green-500/10 border border-green-500/50 rounded-lg px-4 py-3 text-green-400 text-sm">
                                    {passwordSuccess}
                                </div>
                            )}

                            <button
                                onClick={handlePasswordChange}
                                disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {savingPassword ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        Cambiar Contraseña
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Lock className="w-6 h-6" />
                            Autenticación
                        </h2>
                        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg px-4 py-3">
                            <p className="text-blue-400 text-sm">
                                Has iniciado sesión con Google. Tu contraseña es administrada por Google y no se puede cambiar aquí.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
