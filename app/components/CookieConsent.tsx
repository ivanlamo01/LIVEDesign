"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "false");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="fixed bottom-4 left-4 right-4 md:right-auto md:left-4 md:max-w-md z-50"
                >
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl shadow-black/50">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-500/10 rounded-xl">
                                <Cookie className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Usamos Cookies 🍪
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    Utilizamos cookies para mejorar tu experiencia y mantener tu sesión segura.
                                    Al continuar navegando, aceptas nuestra política de privacidad.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium py-2.5 rounded-lg transition-colors border border-slate-700"
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleDecline}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
